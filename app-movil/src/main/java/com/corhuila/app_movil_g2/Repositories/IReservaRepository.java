package com.corhuila.app_movil_g2.Repositories;

import com.corhuila.app_movil_g2.Models.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IReservaRepository extends JpaRepository<Reserva, Long> {
    // Consultas básicas por estado
    List<Reserva> findByEstado(String estado);
    List<Reserva> findByEstadoNot(String estado);
    List<Reserva> findByEstadoNotOrderByFechaAsc(String estado);
    Optional<Reserva> findByIdAndEstadoNot(Long id, String estado);
    
    // Consultas para usuario/cliente
    List<Reserva> findByUsuarioIdAndEstadoNotOrderByFechaAsc(Long usuarioId, String estado);
    List<Reserva> findByUsuarioIdAndEstadoInOrderByFechaAsc(Long usuarioId, List<String> estados);
    List<Reserva> findByUsuarioIdAndFechaBetweenAndEstadoNot(Long usuarioId, LocalDateTime start, LocalDateTime end, String estado);

    // Consultas para barbero
    List<Reserva> findByBarberoIdAndEstadoNotOrderByFechaAsc(Long barberoId, String estado);
    List<Reserva> findByBarberoIdAndEstadoInOrderByFechaAsc(Long barberoId, List<String> estados);
    List<Reserva> findByBarberoIdAndFechaBetweenAndEstadoNot(Long barberoId, LocalDateTime start, LocalDateTime end, String estado);

    // Consultas por servicio
    List<Reserva> findByServicioIdAndEstadoNotOrderByFechaAsc(Long servicioId, String estado);

    // Consultas por fecha
    List<Reserva> findByFechaBetweenAndEstadoNot(LocalDateTime start, LocalDateTime end, String estado);

    // Consultas de verificación de disponibilidad
    boolean existsByUsuarioIdAndFechaAndEstadoNot(Long usuarioId, LocalDateTime fecha, String estado);
    boolean existsByUsuarioIdAndFechaBetweenAndEstadoNot(Long usuarioId, LocalDateTime start, LocalDateTime end, String estado);
    boolean existsByUsuarioIdAndFecha(Long usuarioId, LocalDateTime fecha);
}
