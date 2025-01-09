-- Insert root Counters
INSERT INTO Counters (name, count, parent_id) VALUES ('Root Counter 1', 10, NULL);
INSERT INTO Counters (name, count, parent_id) VALUES ('Root Counter 2', 20, NULL);

-- Insert Subcounters for Root Counter 1
INSERT INTO Counters (name, count, parent_id) VALUES ('Subcounter 1.1', 5, 1);
INSERT INTO Counters (name, count, parent_id) VALUES ('Subcounter 1.2', 3, 1);

-- Insert Subcounters for Root Counter 2
INSERT INTO Counters (name, count, parent_id) VALUES ('Subcounter 2.1', 15, 2);
INSERT INTO Counters (name, count, parent_id) VALUES ('Subcounter 2.2', 7, 2);