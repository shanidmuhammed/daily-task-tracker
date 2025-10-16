import sqlite3

DB_NAME = 'tasks.db'

def connect():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = connect()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            completed BOOLEAN NOT NULL DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()

def get_all_tasks():
    conn = connect()
    c = conn.cursor()
    c.execute('SELECT * FROM tasks ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def add_task(task_text):
    conn = connect()
    c = conn.cursor()
    c.execute('INSERT INTO tasks (task, completed) VALUES (?, ?)', (task_text, False))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    return {'id': task_id, 'task': task_text, 'completed': False}

def update_task(task_id, task_text=None, completed=None):
    conn = connect()
    c = conn.cursor()
    if task_text is not None and completed is not None:
        c.execute('UPDATE tasks SET task=?, completed=? WHERE id=?', (task_text, completed, task_id))
    elif task_text is not None:
        c.execute('UPDATE tasks SET task=? WHERE id=?', (task_text, task_id))
    elif completed is not None:
        c.execute('UPDATE tasks SET completed=? WHERE id=?', (completed, task_id))
    conn.commit()
    conn.close()

def delete_task(task_id):
    conn = connect()
    c = conn.cursor()
    c.execute('DELETE FROM tasks WHERE id=?', (task_id,))
    conn.commit()
    conn.close()
