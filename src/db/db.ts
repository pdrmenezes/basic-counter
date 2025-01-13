import Database from "better-sqlite3";
import { Counter } from "./types";

const db = new Database("counters.db", { verbose: console.log });

// function createTable() {
//   const sql = `
//   PRAGMA JOURNAL_MODE = WAL;  
//   CREATE TABLE Counters (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL DEFAULT "New Counter",
//         count INTEGER NOT NULL CHECK(count >= 0),
//         parent_id INTEGER,
//         FOREIGN KEY (parent_id) REFERENCES Counters (id) ON DELETE CASCADE
//     )`;
//   db.prepare(sql).run();
// }

export function getCounters() {
  const sql = `SELECT * FROM Counters`;
  const rows = db.prepare(sql).all() as Counter[];
  return rows;
}

export function updateCounterName(id: number, newName: string): void {
  const stmt = db.prepare("UPDATE Counters SET name = ? WHERE id = ?");
  stmt.run(newName, id);
  console.log(`Counter with ID ${id} updated to name "${newName}".`);
}

export function incrementCounterCount(id: number): void {
  const stmt = db.prepare("UPDATE Counters SET count = count + 1 WHERE id = ?");
  stmt.run(id);
  console.log(`Counter with ID ${id} incremented by 1.`);
}

export function decrementCounterCount(id: number): void {
  const stmt = db.prepare(`
    UPDATE Counters 
    SET count = CASE WHEN count > 0 THEN count - 1 ELSE count END 
    WHERE id = ?
  `);
  stmt.run(id);
  console.log(`Counter with ID ${id} decremented by 1.`);
}

export function deleteCounter(id: number): void {
  const stmt = db.prepare("DELETE FROM Counters WHERE id = ?");
  stmt.run(id);
  console.log(`Counter with ID ${id} deleted.`);
}

try {
  updateCounterName(1, "Updated Counter Name");
  incrementCounterCount(1);
  decrementCounterCount(1);
  deleteCounter(1);
} catch (error) {
  console.error("An error occurred:", error);
}

// Close the database connection when done
db.close();
