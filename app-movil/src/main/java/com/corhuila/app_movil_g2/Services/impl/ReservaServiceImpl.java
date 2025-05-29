package com.corhuila.app_movil_g2.Services.impl;

import com.corhuila.app_movil_g2.Models.Reserva;
import com.corhuila.app_movil_g2.Models.Usuario;
import com.corhuila.app_movil_g2.Models.Horario;
import com.corhuila.app_movil_g2.Repositories.IReservaRepository;
import com.corhuila.app_movil_g2.Repositories.IUsuarioRepository; // Necesario para verificar barbero
import com.corhuila.app_movil_g2.Repositories.IHorarioRepository;
import com.corhuila.app_movil_g2.Services.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Optional;
import java.util.LinkedHashSet;
import java.util.Arrays;

@Service
public class ReservaServiceImpl implements IReservaService {

    @Autowired
    private IReservaRepository reservaRepository;

     @Autowired
    private IUsuarioRepository usuarioRepository; // Para verificar si el barbero existe y es barbero

    @Autowired
    private IHorarioRepository horarioRepository;

    private static final String ESTADO_ACTIVA = "ACTIVA";
    private static final String ESTADO_CANCELADA = "CANCELADA";
     private static final String ESTADO_COMPLETADA = "COMPLETADA";
    private static final String ESTADO_INACTIVA = "INACTIVA"; // Para borrado lógico

    // Estados que consideramos "activos" para la mayoría de listados
    private static final List<String> ESTADOS_ACTIVIDAD = List.of(ESTADO_ACTIVA, ESTADO_COMPLETADA);


    @Override
    @Transactional(readOnly = true)
    public List<Reserva> findAllActive() {
        // Excluimos INACTIVA y CANCELADA
        return reservaRepository.findByEstadoNotOrderByFechaAsc(ESTADO_INACTIVA); // O ajustar según qué estados son "activos"
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Reserva> findById(Long id) {
        return reservaRepository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Reserva> findByIdActive(Long id) {
        return reservaRepository.findByIdAndEstadoNot(id, ESTADO_INACTIVA);
    }

    @Override
    @Transactional
    public Reserva save(Reserva reserva) {
        // Este método puede usarse para actualizar reservas existentes
        return reservaRepository.save(reserva);
    }

     @Override
    @Transactional
    public Reserva createReserva(Reserva reserva) {
        // Lógica para la creación de una nueva reserva
        // 1. Validar que el usuario (cliente) no tenga otra reserva a esa hora
        if (userHasConflictingReservation(reserva.getUsuario().getId(), reserva.getFecha())) {
             throw new IllegalArgumentException("Ya tienes una reserva programada para esa fecha y hora.");
        }

        // 2. Validar que el barbero esté disponible a esa hora
        // NOTA: En este esquema, `idUsuario` en Reserva puede ser tanto el cliente como el barbero asignado.
        // Si el campo `idUsuario` en Reserva *siempre* es el cliente, necesitaríamos un campo adicional `idBarbero`
        // y validar la disponibilidad del barbero usando ese campo.
        // Asumiré por ahora que el `usuario` en la entidad Reserva es el *cliente* que crea la reserva,
        // y que la lógica de asignar un barbero y verificar su disponibilidad se haría *antes* de llamar a este método,
        // o se necesitaría un campo `barbero` en la entidad `Reserva` con una relación `@ManyToOne` a `Usuario`.
        // Dada la ambigüedad del esquema, no implementaré la validación de disponibilidad del barbero aquí,
        // pero el método `isSlotAvailable` está definido en la interfaz si se decide añadir el campo barbero.
        // Si `usuario` en Reserva es el BARBERO asignado, entonces la validación sería contra ese usuario.
        // Voy a asumir que 'usuario' es el CLIENTE por ahora.

        // 3. Establecer estado inicial (ej: ACTIVA)
        reserva.setEstado(ESTADO_ACTIVA);

        // 4. Guardar la reserva
        return reservaRepository.save(reserva);
    }


    @Override
    @Transactional
    public void softDeleteById(Long id) {
        Optional<Reserva> reservaOptional = reservaRepository.findById(id);
        if (reservaOptional.isPresent()) {
            Reserva reserva = reservaOptional.get();
            reserva.setEstado(ESTADO_INACTIVA); // Marcar como inactiva (borrado lógico)
            reservaRepository.save(reserva); // Guardar el cambio de estado
        }
        // Opcional: lanzar excepción si no se encuentra la reserva
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reserva> findByUsuarioIdActive(Long usuarioId) {
        // Obtener el usuario para verificar su rol
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado con ID: " + usuarioId));

        String rolNombre = usuario.getRol().getNombreRol();
        System.out.println("\n=== INICIO BÚSQUEDA DE RESERVAS ===");
        System.out.println("Usuario ID: " + usuarioId);
        System.out.println("Username: " + usuario.getUsername());
        System.out.println("Rol: " + rolNombre);
        
        List<Reserva> reservas = new ArrayList<>();
        List<String> estadosActivos = Arrays.asList(ESTADO_ACTIVA, ESTADO_COMPLETADA);
        
        // Si es barbero, buscar reservas donde es el barbero asignado
        if (rolNombre.equals("BARBERO")) {
            System.out.println("\nBuscando reservas como barbero...");
            List<Reserva> reservasBarbero = reservaRepository.findByBarberoIdAndEstadoInOrderByFechaAsc(usuarioId, estadosActivos);
            System.out.println("Reservas encontradas como barbero: " + reservasBarbero.size());
            for (Reserva r : reservasBarbero) {
                System.out.println("  Reserva ID: " + r.getId());
                System.out.println("  Estado: " + r.getEstado());
                System.out.println("  Cliente ID: " + r.getUsuario().getId());
                System.out.println("  Cliente: " + r.getUsuario().getUsername());
                System.out.println("  Barbero ID: " + r.getBarbero().getId());
                System.out.println("  Barbero: " + r.getBarbero().getUsername());
                System.out.println("  Fecha: " + r.getFecha());
                System.out.println("  Servicio: " + r.getServicio().getNombre());
                System.out.println("  ---");
            }
            reservas.addAll(reservasBarbero);
        }
        
        // Si es cliente o si es barbero (para ver sus propias reservas como cliente)
        if (rolNombre.equals("CLIENTE") || rolNombre.equals("BARBERO")) {
            System.out.println("\nBuscando reservas como cliente...");
            List<Reserva> reservasCliente = reservaRepository.findByUsuarioIdAndEstadoInOrderByFechaAsc(usuarioId, estadosActivos);
            System.out.println("Reservas encontradas como cliente: " + reservasCliente.size());
            for (Reserva r : reservasCliente) {
                System.out.println("  Reserva ID: " + r.getId());
                System.out.println("  Estado: " + r.getEstado());
                System.out.println("  Cliente ID: " + r.getUsuario().getId());
                System.out.println("  Cliente: " + r.getUsuario().getUsername());
                System.out.println("  Barbero ID: " + r.getBarbero().getId());
                System.out.println("  Barbero: " + r.getBarbero().getUsername());
                System.out.println("  Fecha: " + r.getFecha());
                System.out.println("  Servicio: " + r.getServicio().getNombre());
                System.out.println("  ---");
            }
            reservas.addAll(reservasCliente);
        }

        // Eliminar duplicados si los hay
        reservas = new ArrayList<>(new LinkedHashSet<>(reservas));

        System.out.println("\nTotal de reservas después de combinar: " + reservas.size());
        System.out.println("=== FIN BÚSQUEDA DE RESERVAS ===\n");

        return reservas;
    }

     @Override
    @Transactional(readOnly = true)
    public List<Reserva> findByBarberoIdAndDateRangeActive(Long barberoId, LocalDateTime start, LocalDateTime end) {
         // Busca reservas para un *barbero* (asumiendo que el usuario en Reserva es el barbero) en un rango de fecha/hora
         // excluyendo estados no deseados.
         // Si el campo `usuario` en Reserva es el cliente, este método NO sería válido como está.
         // Si necesitamos buscar reservas donde el usuario asignado es un barbero,
         // y la Reserva *también* tiene un campo para el cliente, la consulta cambiaría.
         // Dada la ambigüedad, este método asume que `usuario` en Reserva ES el barbero para verificar su agenda.
        return reservaRepository.findByUsuarioIdAndFechaBetweenAndEstadoNot(barberoId, start, end, ESTADO_INACTIVA); // O ajustar estados
    }


    // --- Métodos de Validación de Disponibilidad ---

     @Override
    @Transactional(readOnly = true)
    public boolean isSlotAvailable(Long barberoId, LocalDateTime fechaHoraInicio) {
        // Verificar que el usuario sea un barbero
        Optional<Usuario> barbero = usuarioRepository.findById(barberoId);
        if (barbero.isEmpty() || !barbero.get().getRol().getNombreRol().equals("BARBERO")) {
            System.out.println("Error: El ID " + barberoId + " no corresponde a un barbero");
            throw new IllegalArgumentException("El ID proporcionado no corresponde a un barbero.");
        }

        // 1. Verificar si hay reservas existentes para el barbero
        List<Reserva> reservasConflicto = reservaRepository.findByBarberoIdAndFechaBetweenAndEstadoNot(
            barberoId, 
            fechaHoraInicio.minusMinutes(30), 
            fechaHoraInicio.plusMinutes(30), 
            ESTADO_INACTIVA
        );
        if (!reservasConflicto.isEmpty()) {
            System.out.println("El barbero ya tiene una reserva en ese horario");
            return false;
        }

        // 2. Verificar el horario del barbero
        String diaSemanaIngles = fechaHoraInicio.getDayOfWeek().toString();
        String diaSemana = convertirDiaAEspanol(diaSemanaIngles);
        LocalTime horaReserva = fechaHoraInicio.toLocalTime();

        System.out.println("Verificando disponibilidad para: Día=" + diaSemana + ", Hora=" + horaReserva);

        // Consultar los horarios del barbero para ese día
        List<Horario> horariosBarbero = horarioRepository.findByBarberoIdAndDiaSemana(barberoId, diaSemana);
        
        // Si no hay horarios definidos para ese día, el barbero no está disponible
        if (horariosBarbero.isEmpty()) {
            System.out.println("No se encontraron horarios para el día " + diaSemana);
            return false;
        }

        System.out.println("Horarios encontrados para el día " + diaSemana + ": " + horariosBarbero.size());

        // Verificar si la hora está dentro del rango de algún horario del barbero
        boolean horarioDisponible = false;
        for (Horario horario : horariosBarbero) {
            LocalTime horaInicio = horario.getHoraInicio();
            LocalTime horaFin = horario.getHoraFin();

            System.out.println("Verificando horario: " + horaInicio + " - " + horaFin + " (Estado: " + horario.getEstado() + ")");

            // La hora de la reserva debe estar dentro del rango del horario
            // y el horario debe estar activo
            if ((!horaReserva.isBefore(horaInicio) && !horaReserva.isAfter(horaFin)) 
                && horario.getEstado().equals("ACTIVO")) {
                horarioDisponible = true;
                System.out.println("Horario disponible encontrado!");
                break;
            }
        }

        if (!horarioDisponible) {
            System.out.println("No se encontró un horario disponible para la hora solicitada");
        }

        return horarioDisponible;
    }

    private String convertirDiaAEspanol(String diaIngles) {
        return switch (diaIngles) {
            case "MONDAY" -> "LUNES";
            case "TUESDAY" -> "MARTES";
            case "WEDNESDAY" -> "MIERCOLES";
            case "THURSDAY" -> "JUEVES";
            case "FRIDAY" -> "VIERNES";
            case "SATURDAY" -> "SABADO";
            case "SUNDAY" -> "DOMINGO";
            default -> throw new IllegalArgumentException("Día no válido: " + diaIngles);
        };
    }

     @Override
     @Transactional(readOnly = true)
    public boolean userHasConflictingReservation(Long usuarioId, LocalDateTime fechaHoraInicio) {
        // Este método verifica si un *cliente* ya tiene una reserva activa a esa hora.
        // Asumiendo que `usuario` en Reserva representa al cliente que hizo la reserva:
         List<Reserva> reservasClienteConflicto = reservaRepository.findByUsuarioIdAndFechaBetweenAndEstadoNot(
             usuarioId, fechaHoraInicio.minusMinutes(1), fechaHoraInicio.plusMinutes(1), ESTADO_INACTIVA // Rango pequeño para la hora exacta
         );
        // Si hay alguna reserva activa en ese rango para el cliente, hay un conflicto.
         return !reservasClienteConflicto.isEmpty(); // true si hay conflicto, false si no
    }

    @Override
    @Transactional(readOnly = true)
    public LocalDateTime findNextAvailableSlot(Long barberoId, LocalDateTime desde) {
        // Verificar que el usuario sea un barbero
        Optional<Usuario> barbero = usuarioRepository.findById(barberoId);
        if (barbero.isEmpty() || !barbero.get().getRol().getNombreRol().equals("BARBERO")) {
            throw new IllegalArgumentException("El ID proporcionado no corresponde a un barbero.");
        }

        // Buscar la siguiente hora disponible
        LocalDateTime nextSlot = desde;
        boolean slotFound = false;
        int maxAttempts = 48; // Límite de 48 intervalos de 30 minutos (24 horas)
        int attempt = 0;

        while (!slotFound && attempt < maxAttempts) {
            if (isSlotAvailable(barberoId, nextSlot)) {
                slotFound = true;
            } else {
                nextSlot = nextSlot.plusMinutes(30); // Intentar con el siguiente intervalo de 30 minutos
                attempt++;
            }
        }

        if (!slotFound) {
            // Si no se encontró un slot en las próximas 24 horas, empezar al día siguiente a primera hora
            nextSlot = desde.plusDays(1).withHour(8).withMinute(0).withSecond(0).withNano(0);
        }

        return nextSlot;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isUserReservaOwner(Long reservaId, Long userId) {
        Optional<Reserva> reserva = reservaRepository.findById(reservaId);
        if (reserva.isEmpty()) {
            return false;
        }
        return reserva.get().getUsuario().getId().equals(userId) || 
               reserva.get().getBarbero().getId().equals(userId);
    }
}
