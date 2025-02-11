PRAGMA JOURNAL_MODE = WAL;
CREATE TABLE Counters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT "New Counter",
    count INTEGER NOT NULL CHECK(count >= 0),
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES Counters (id) ON DELETE CASCADE
);