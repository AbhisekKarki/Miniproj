from database import get_connection

def create_table():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        email TEXT NOT NULL,
        password TEXT NOT NULL                      
                   )
    """)
    
    conn.commit()
    conn.close()

def add_user(email , password):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO users (email , password) VALUES (? , ?)" , (email,password))

    conn.commit()
    conn.close()

def get_user(email):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?" , (email,))
    user = cursor.fetchone()
    conn.close()

    return user
