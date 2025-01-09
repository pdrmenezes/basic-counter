-- Increment
UPDATE Counters
SET count = count + 1
WHERE id = ?;

-- Decrement
UPDATE Counters
SET count = CASE 
    WHEN count > 0 THEN count - 1
    ELSE count
END
WHERE id = ?;

-- Update name
UPDATE Counters
SET name = 'New Name'
WHERE id = ?;

-- Delete a counter
DELETE FROM Counters
WHERE id = ?;