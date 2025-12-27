import sqlite3

db_name = "project1.db"

def get_connection():
    conn = sqlite3.connect(db_name)
    conn.row_factory = sqlite3.Row
    return conn
