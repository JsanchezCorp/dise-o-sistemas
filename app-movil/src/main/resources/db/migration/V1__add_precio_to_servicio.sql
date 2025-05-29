-- Add precio column as nullable first
ALTER TABLE servicio ADD COLUMN IF NOT EXISTS precio numeric(10,2);

-- Set a default value for existing records (e.g., 0)
UPDATE servicio SET precio = 0 WHERE precio IS NULL;

-- Make the column not null after setting defaults
ALTER TABLE servicio ALTER COLUMN precio SET NOT NULL; 