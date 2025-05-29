package com.corhuila.app_movil_g2.Controller.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaCreateDTO {

    @NotNull(message = "El ID del usuario (cliente) es obligatorio")
    private Long idUsuarioCliente; // ID del cliente que hace la reserva

    @NotNull(message = "El ID del barbero es requerido")
    private Long idUsuarioBarbero;

    @NotNull(message = "El ID del servicio es requerido")
    private Long idServicio;

    @NotNull(message = "La fecha es requerida")
    @FutureOrPresent(message = "La fecha de la reserva debe ser en el presente o futuro")
    private LocalDateTime fecha;

    // El estado se manejará internamente en el servicio al crear (ej. "ACTIVA")
}
