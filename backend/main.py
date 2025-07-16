from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List

app = FastAPI()

# CORS設定（Reactからの接続を許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番では限定してください
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "kcode.db"

@app.get("/search")
def search_procedures(q: str = Query(..., description="検索キーワード")):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    like_q = f"%{q}%"
    cur.execute("""
        SELECT code, name, point_code, note1, note2
        FROM procedures
        WHERE name LIKE ? OR code LIKE ?
        LIMIT 50
    """, (like_q, like_q))
    
    results = cur.fetchall()
    conn.close()
    
    # レスポンスをJSON化
    return [
        {
            "code": row[0],
            "name": row[1],
            "point_code": row[2],
            "note1": row[3],
            "note2": row[4]
        }
        for row in results
    ]