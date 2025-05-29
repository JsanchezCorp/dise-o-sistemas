package com.corhuila.app_movil_g2.Controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioCreateDTO {

    @NotBlank(message = "El nombre del servicio no puede estar vacío")
    @Size(max = 50, message = "El nombre del servicio no puede exceder los 50 caracteres")
    private String nombre;

    private String descripcion;

    @NotNull(message = "El precio no puede ser nulo")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que cero")
    @Digits(integer = 10, fraction = 2, message = "Formato de precio inválido")
    private BigDecimal precio;

    @NotNull(message = "El ID de la categoría del servicio es obligatorio")
    private Long idCategoriaServicio;
}
