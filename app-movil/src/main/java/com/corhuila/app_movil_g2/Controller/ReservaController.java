package com.corhuila.app_movil_g2.Controller;

import com.corhuila.app_movil_g2.Controller.advice.GlobalExceptionHandler;
import com.corhuila.app_movil_g2.Controller.dto.*;
import com.corhuila.app_movil_g2.Models.Reserva;
import com.corhuila.app_movil_g2.Models.Servicio;
import com.corhuila.app_movil_g2.Models.Usuario;
import com.corhuila.app_movil_g2.Services.IReservaService;
import com.corhuila.app_movil_g2.Services.IServicioService;
import com.corhuila.app_movil_g2.Services.IUsuarioService;
import com.corhuila.app_movil_g2.util.AppConstants; // Asegúrate de tener esta clase de constantes
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private IReservaService reservaService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private IServicioService servicioService;

    // --- Mappers (Simplificados) ---
    private UsuarioDTO convertUsuarioToDTO(Usuario usuario) {
        if (usuario == null) return null;
        PersonaDTO personaDTO = (usuario.getPersona() != null) ?
                new PersonaDTO(usuario.getPersona().getId(), usuario.getPersona().getNombre(), usuario.getPersona().getApellido(), usuario.getPersona().getDocumento(), usuario.getPersona().getTelefono())
                : null;
        RolDTO rolDTO = (usuario.getRol() != null) ?
                new RolDTO(usuario.getRol().getId(), usuario.getRol().getNombreRol())
                : null;
        return new UsuarioDTO(usuario.getId(), usuario.getUsername(), personaDTO, rolDTO, usuario.isActivo());
    }

    private ServicioDTO convertServicioToDTO(Servicio servicio) {
        if (servicio == null) return null;
        CategoriaServicioDTO catDTO = (servicio.getCategoriaServicio() != null) ?
                new CategoriaServicioDTO(servicio.getCategoriaServicio().getId(), servicio.getCategoriaServicio().getNombre(), servicio.getCategoriaServicio().getDescripcion(), servicio.getCategoriaServicio().isActivo())
                : null;
        return new ServicioDTO(servicio.getId(), servicio.getNombre(), servicio.getDescripcion(), servicio.getPrecio(), catDTO, servicio.isActivo());
    }

    private ReservaDTO convertToDTO(Reserva reserva) {
        if (reserva == null) return null;
        return new ReservaDTO(
                reserva.getId(),
                convertUsuarioToDTO(reserva.getUsuario()), // Cliente
                convertUsuarioToDTO(reserva.getBarbero()), // Barbero
                convertServicioToDTO(reserva.getServicio()),
                reserva.getFecha(),
                reserva.getEstado()
        );
    }
    // --- Fin Mappers ---

    @PostMapping
    @PreAuthorize("hasAnyRole('CLIENTE', 'ADMIN', 'BARBERO')")
    public ResponseEntity<ReservaDTO> createReserva(@Valid @RequestBody ReservaCreateDTO createDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        
        System.out.println("\n=== INICIO CREAR RESERVA ===");
        System.out.println("Usuario autenticado: " + currentUsername);
        System.out.println("Roles: " + authentication.getAuthorities());
        
        final Usuario currentUser = usuarioService.findByUsername(currentUsername)
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Usuario autenticado no encontrado."));

        System.out.println("Usuario encontrado en BD:");
        System.out.println("  ID: " + currentUser.getId());
        System.out.println("  Username: " + currentUser.getUsername());
        System.out.println("  Rol: " + currentUser.getRol().getNombreRol());

        // Usa una nueva variable para que sea efectivamente final
        final Long resolvedClienteId;
        if (currentUser.getRol().getNombreRol().equals("CLIENTE")) {
            // Si es cliente, solo puede crear reservas para sí mismo
            resolvedClienteId = currentUser.getId();
            System.out.println("Cliente creando reserva para sí mismo. ID: " + resolvedClienteId);
            
            // Validar que el ID del cliente en el DTO coincida con el usuario autenticado
            if (createDTO.getIdUsuarioCliente() != null && !createDTO.getIdUsuarioCliente().equals(currentUser.getId())) {
                throw new GlobalExceptionHandler.BusinessLogicException("Como cliente, solo puedes crear reservas para ti mismo.");
            }
        } else if (createDTO.getIdUsuarioCliente() == null) {
            throw new GlobalExceptionHandler.BusinessLogicException("Se debe especificar el ID del cliente para la reserva.");
        } else {
            // ADMIN o BARBERO pueden crear reservas para otros clientes
            resolvedClienteId = createDTO.getIdUsuarioCliente();
            System.out.println("Admin/Barbero creando reserva para cliente. ID Cliente: " + resolvedClienteId);
        }

        Usuario cliente = usuarioService.findByIdActive(resolvedClienteId)
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Cliente activo no encontrado con ID: " + resolvedClienteId));
        
        // Verificar que el usuario sea un cliente
        if (!cliente.getRol().getNombreRol().equals("CLIENTE")) {
            throw new GlobalExceptionHandler.BusinessLogicException("El usuario seleccionado no es un cliente.");
        }
        
        System.out.println("Cliente para la reserva:");
        System.out.println("  ID: " + cliente.getId());
        System.out.println("  Username: " + cliente.getUsername());
        System.out.println("  Rol: " + cliente.getRol().getNombreRol());
        
        // Verificar disponibilidad del barbero
        if (!reservaService.isSlotAvailable(createDTO.getIdUsuarioBarbero(), createDTO.getFecha())) {
            throw new GlobalExceptionHandler.BusinessLogicException("El barbero no está disponible en el horario seleccionado.");
        }

        // Verificar si el cliente ya tiene una reserva
        if (reservaService.userHasConflictingReservation(cliente.getId(), createDTO.getFecha())) {
            throw new GlobalExceptionHandler.BusinessLogicException("El cliente ya tiene una reserva en conflicto para esa fecha y hora.");
        }

        Servicio servicio = servicioService.findByIdActive(createDTO.getIdServicio())
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Servicio activo no encontrado con ID: " + createDTO.getIdServicio()));

        Usuario barbero = usuarioService.findByIdActive(createDTO.getIdUsuarioBarbero())
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Barbero no encontrado"));

        // Verificar que el usuario sea un barbero
        if (!barbero.getRol().getNombreRol().equals("BARBERO")) {
            throw new GlobalExceptionHandler.BusinessLogicException("El usuario seleccionado no es un barbero.");
        }

        System.out.println("Barbero para la reserva:");
        System.out.println("  ID: " + barbero.getId());
        System.out.println("  Username: " + barbero.getUsername());
        System.out.println("  Rol: " + barbero.getRol().getNombreRol());

        Reserva nuevaReserva = new Reserva();
        nuevaReserva.setUsuario(cliente);
        nuevaReserva.setServicio(servicio);
        nuevaReserva.setFecha(createDTO.getFecha());
        nuevaReserva.setBarbero(barbero);
        nuevaReserva.setEstado("ACTIVA");

        System.out.println("Creando reserva con los siguientes datos:");
        System.out.println("  Cliente ID: " + cliente.getId() + " (" + cliente.getUsername() + ")");
        System.out.println("  Barbero ID: " + barbero.getId() + " (" + barbero.getUsername() + ")");
        System.out.println("  Servicio ID: " + servicio.getId() + " (" + servicio.getNombre() + ")");
        System.out.println("  Fecha: " + createDTO.getFecha());

        Reserva reservaGuardada = reservaService.createReserva(nuevaReserva);
        
        System.out.println("Reserva creada exitosamente:");
        System.out.println("  ID: " + reservaGuardada.getId());
        System.out.println("  Estado: " + reservaGuardada.getEstado());
        System.out.println("=== FIN CREAR RESERVA ===\n");
        
        return new ResponseEntity<>(convertToDTO(reservaGuardada), HttpStatus.CREATED);
    }

    @GetMapping("/usuario/{usuarioId}/activas")
    @PreAuthorize("hasRole('ADMIN') or (hasAnyRole('CLIENTE','BARBERO') and #usuarioId == principal.id)")
    public ResponseEntity<List<ReservaDTO>> getReservasActivasByUsuario(@PathVariable Long usuarioId) {
        // Validar que el usuario exista
        usuarioService.findByIdActive(usuarioId)
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Usuario activo no encontrado con ID: " + usuarioId));

        List<ReservaDTO> reservas = reservaService.findByUsuarioIdActive(usuarioId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservas);
    }
    
    @GetMapping("/mis-reservas/activas")
    @PreAuthorize("hasAnyRole('CLIENTE', 'BARBERO')")
    public ResponseEntity<List<ReservaDTO>> getMisReservasActivas() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        System.out.println("\n=== INICIO GET MIS RESERVAS ACTIVAS ===");
        System.out.println("Usuario autenticado: " + username);
        System.out.println("Roles: " + authentication.getAuthorities());
        
        Usuario currentUser = usuarioService.findByUsername(username)
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Usuario no encontrado: " + username));

        System.out.println("Usuario encontrado en BD:");
        System.out.println("  ID: " + currentUser.getId());
        System.out.println("  Username: " + currentUser.getUsername());
        System.out.println("  Rol: " + currentUser.getRol().getNombreRol());
        
        List<ReservaDTO> reservas = reservaService.findByUsuarioIdActive(currentUser.getId()).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        System.out.println("Número de reservas encontradas: " + reservas.size());
        reservas.forEach(r -> {
            System.out.println("  Reserva ID: " + r.getId());
            System.out.println("  Cliente: " + r.getUsuario().getUsername());
            System.out.println("  Barbero: " + r.getBarbero().getUsername());
            System.out.println("  Fecha: " + r.getFecha());
            System.out.println("  Estado: " + r.getEstado());
            System.out.println("  Servicio: " + r.getServicio().getNombre());
            System.out.println("  ---");
        });
        System.out.println("=== FIN GET MIS RESERVAS ACTIVAS ===\n");
        
        return ResponseEntity.ok(reservas);
    }

    // Este endpoint asume que el servicio puede encontrar reservas asignadas a un barbero.
    // La entidad Reserva actual (solo un campo Usuario) hace esto complejo si ese campo es siempre el cliente.
    // Se necesitaría un campo 'barberoAsignado' en Reserva o una tabla de enlace Reserva-Barbero.
    @GetMapping("/barbero/{barberoId}/rango")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('BARBERO') and #barberoId == principal.id)")
    public ResponseEntity<List<ReservaDTO>> getReservasByBarberoAndDateRange(
            @PathVariable Long barberoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        
        usuarioService.findByIdActive(barberoId) //Verifica que el barbero exista
            .filter(u -> u.getRol().getNombreRol().equals("BARBERO"))
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Barbero activo no encontrado con ID: " + barberoId));

        LocalDateTime inicio = fechaInicio.atStartOfDay();
        LocalDateTime fin = fechaFin.atTime(LocalTime.MAX);

        List<ReservaDTO> reservas = reservaService.findByBarberoIdAndDateRangeActive(barberoId, inicio, fin).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()") // Lógica más fina dentro del método
    public ResponseEntity<ReservaDTO> getReservaById(@PathVariable Long id) {
        Reserva reserva = reservaService.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Usuario currentUser = (Usuario) authentication.getPrincipal();

        // Permitir si es ADMIN, o si es el usuario de la reserva (cliente), o si es el barbero asignado (si se pudiera determinar)
        boolean isAdmin = currentUser.getRol().getNombreRol().equals("ADMIN");
        boolean isOwner = reserva.getUsuario().getId().equals(currentUser.getId());
        // boolean isAssignedBarber = ...; // Lógica para determinar si el currentUser es el barbero asignado a esta reserva

        if (!isAdmin && !isOwner /* && !isAssignedBarber */) {
            throw new GlobalExceptionHandler.BusinessLogicException("No tiene permiso para ver esta reserva.");
        }
        return ResponseEntity.ok(convertToDTO(reserva));
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ReservaDTO> updateEstadoReserva(@PathVariable Long id, @Valid @RequestBody ReservaUpdateEstadoDTO estadoDTO) {
        Reserva reserva = reservaService.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Usuario currentUser = (Usuario) authentication.getPrincipal();
        String userRole = currentUser.getRol().getNombreRol();

        // Lógica de permisos para cambiar estado
        boolean canUpdate = false;
        if (userRole.equals("ADMIN")) {
            canUpdate = true;
        } else if (userRole.equals("CLIENTE") && reserva.getUsuario().getId().equals(currentUser.getId())) {
            // Cliente solo puede cancelar sus propias reservas (y quizás solo si está "ACTIVA")
            if (estadoDTO.getNuevoEstado().equals(AppConstants.ESTADO_CANCELADA) && reserva.getEstado().equals(AppConstants.ESTADO_ACTIVA)) {
                // Podría haber lógica de tiempo de antelación para cancelar
                canUpdate = true;
            }
        } else if (userRole.equals("BARBERO")) {
            // Barbero puede completar o cancelar reservas (si están asignadas a él)
             // if (isAssignedBarber && (estadoDTO.getNuevoEstado().equals(AppConstants.ESTADO_COMPLETADA) || estadoDTO.getNuevoEstado().equals(AppConstants.ESTADO_CANCELADA))) {
            //    canUpdate = true;
            // }
            // Simplificación: Barbero puede cambiar a completada o cancelada (requiere lógica de asignación)
            if (estadoDTO.getNuevoEstado().equals(AppConstants.ESTADO_COMPLETADA) || estadoDTO.getNuevoEstado().equals(AppConstants.ESTADO_CANCELADA)){
                // Aquí faltaría la validación de que el barbero está asignado a esta reserva.
                // Por ahora, un barbero genérico puede hacerlo si la lógica de asignación no está en el modelo.
                // Esto es una simplificación y debe revisarse.
                canUpdate = true; // PELIGROSO SIN VERIFICAR ASIGNACIÓN
            }
        }

        if (!canUpdate) {
            throw new GlobalExceptionHandler.BusinessLogicException("No tiene permiso para cambiar el estado de esta reserva a '" + estadoDTO.getNuevoEstado() + "'.");
        }
        
        // Validar transición de estado si es necesario (ej. no se puede completar una reserva cancelada)
        // ...

        reserva.setEstado(estadoDTO.getNuevoEstado());
        Reserva reservaActualizada = reservaService.save(reserva);
        return ResponseEntity.ok(convertToDTO(reservaActualizada));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasAnyRole('CLIENTE', 'BARBERO') and @reservaService.isUserReservaOwner(#id, principal.id))")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        Reserva reserva = reservaService.findById(id)
                .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Reserva no encontrada con ID: " + id));

        // Verificar si la reserva está activa
        if (!reserva.getEstado().equals("ACTIVA")) {
            throw new GlobalExceptionHandler.BusinessLogicException("Solo se pueden cancelar reservas activas.");
        }

        // Cambiar el estado a CANCELADA
        reserva.setEstado("CANCELADA");
        reservaService.save(reserva);
        
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/inactivar") // Borrado lógico por Admin
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> softDeleteReserva(@PathVariable Long id) {
        reservaService.findById(id).orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Reserva no encontrada con ID: " + id));
        reservaService.softDeleteById(id); // Cambia estado a INACTIVA
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/barbero/{barberoId}/disponibilidad")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> checkBarberoDisponibilidad(
            @PathVariable Long barberoId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fecha) {
        
        Usuario barbero = usuarioService.findByIdActive(barberoId)
            .filter(u -> u.getRol().getNombreRol().equals("BARBERO"))
            .orElseThrow(() -> new GlobalExceptionHandler.ResourceNotFoundException("Barbero activo no encontrado con ID: " + barberoId));

        if (reservaService.isSlotAvailable(barberoId, fecha)) {
            return ResponseEntity.ok().body(Map.of(
                "disponible", true,
                "mensaje", "El horario está disponible"
            ));
        } else {
            // Buscar el siguiente horario disponible
            LocalDateTime nextSlot = reservaService.findNextAvailableSlot(barberoId, fecha);
            return ResponseEntity.ok().body(Map.of(
                "disponible", false,
                "mensaje", "El horario no está disponible",
                "siguienteDisponible", nextSlot
            ));
        }
    }

    @GetMapping("/todas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservaDTO>> getAllReservas() {
        System.out.println("\n=== INICIO GET TODAS LAS RESERVAS ===");
        
        List<ReservaDTO> reservas = reservaService.findAllActive().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        System.out.println("Número de reservas encontradas: " + reservas.size());
        reservas.forEach(r -> {
            System.out.println("  Reserva ID: " + r.getId());
            System.out.println("  Cliente: " + r.getUsuario().getUsername());
            System.out.println("  Barbero: " + r.getBarbero().getUsername());
            System.out.println("  Fecha: " + r.getFecha());
            System.out.println("  Estado: " + r.getEstado());
            System.out.println("  Servicio: " + r.getServicio().getNombre());
            System.out.println("  ---");
        });
        System.out.println("=== FIN GET TODAS LAS RESERVAS ===\n");
        
        return ResponseEntity.ok(reservas);
    }
}
