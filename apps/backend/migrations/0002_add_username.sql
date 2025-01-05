ALTER TABLE "users" ADD COLUMN "username" text;

UPDATE users 
SET username = array_to_string(ARRAY(
    SELECT chr((65 + FLOOR(RANDOM() * 26)::integer))
    FROM generate_series(1, 8)
), '');

ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL;