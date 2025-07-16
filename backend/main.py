from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "診療報酬コード検索APIへようこそ"}