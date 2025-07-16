import csv
import sqlite3
from pathlib import Path

CSV_PATH = Path(__file__).parent / "data/kcodes.csv"
DB_PATH = Path(__file__).parent / "kcode.db"

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS procedures (
    code TEXT PRIMARY KEY,
    name TEXT,
    point_code INTEGER,
    note1 TEXT,
    note2 TEXT
)
""")

with open(CSV_PATH, newline='', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        cur.execute("""
        INSERT OR REPLACE INTO procedures (code, name, point_code, note1, note2)
        VALUES (?, ?, ?, ?, ?)
        """, (
            row['code'].strip(),
            row['name'].strip(),
            row['point_code'].strip(),
            row['note1'].strip() if row['note1'] else '',
            row['note2'].strip() if row['note2'] else ''
        ))

conn.commit()
conn.close()
print("✅ 取り込み完了")