-- First, add the columns as nullable
ALTER TABLE reserva ADD COLUMN IF NOT EXISTS id_usuario_cliente bigint;
ALTER TABLE reserva ADD COLUMN IF NOT EXISTS id_usuario_barbero bigint;

-- Update existing records to assign a default barbero and cliente
UPDATE reserva r SET 
    id_usuario_barbero = (
        SELECT id FROM usuario 
        WHERE rol_id = (SELECT id FROM rol WHERE nombre_rol = 'BARBERO') 
        LIMIT 1
    ),
    id_usuario_cliente = (
        SELECT id FROM usuario 
        WHERE rol_id = (SELECT id FROM rol WHERE nombre_rol = 'CLIENTE') 
        LIMIT 1
    )
WHERE id_usuario_barbero IS NULL OR id_usuario_cliente IS NULL;

-- Now make the columns not null after ensuring they have values
ALTER TABLE reserva ALTER COLUMN id_usuario_barbero SET NOT NULL;
ALTER TABLE reserva ALTER COLUMN id_usuario_cliente SET NOT NULL;

-- Add the foreign key constraints
ALTER TABLE reserva 
    ADD CONSTRAINT fk_reserva_barbero 
    FOREIGN KEY (id_usuario_barbero) 
    REFERENCES usuario(id);

ALTER TABLE reserva 
    ADD CONSTRAINT fk_reserva_cliente 
    FOREIGN KEY (id_usuario_cliente) 
    REFERENCES usuario(id); 