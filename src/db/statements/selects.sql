SELECT 
    c1.id AS CounterID,
    c1.name AS CounterName,
    c1.count AS CounterCount,
    c2.name AS ParentCounterName
FROM 
    Counters c1
LEFT JOIN 
    Counters c2
ON 
    c1.parent_id = c2.id;