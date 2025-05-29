package com.corhuila.app_movil_g2.Repositories;

import com.corhuila.app_movil_g2.Models.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IHorarioRepository extends JpaRepository<Horario, Long> {
    List<Horario> findByEstado(String estado); // Listar por estado
    List<Horario> findByEstadoNot(String estado); // Listar por estado excluyendo uno
    Optional<Horario> findByIdAndEstadoNot(Long id, String estado); // Buscar activo por ID

    List<Horario> findByUsuarioIdAndEstadoNot(Long usuarioId, String estado); // Horarios activos de un barbero
    List<Horario> findByUsuarioIdAndDiasSemanaAndEstadoNot(Long usuarioId, String diasSemana, String estado); // Horarios activos de un barbero para un día

    @Query("SELECT h FROM Horario h WHERE h.usuario.id = :barberoId AND h.diasSemana = :diaSemana")
    List<Horario> findByBarberoIdAndDiaSemana(@Param("barberoId") Long barberoId, @Param("diaSemana") String diaSemana);
}
