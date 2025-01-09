CREATE TRIGGER set_default_name
BEFORE INSERT ON Counters
FOR EACH ROW
WHEN NEW.name IS NULL
BEGIN
    UPDATE Counters
    SET name = CASE
        WHEN NEW.parent_id IS NULL THEN 'New Counter'
        ELSE 'New Sub-Counter'
    END
    WHERE id = NEW.id;
END;