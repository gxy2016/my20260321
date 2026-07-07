"""
图书管理网站 - 后端 API
FastAPI 应用入口（含静态文件服务）
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
import os

app = FastAPI(
    title="图书管理 API",
    description="图书管理网站后端 API，提供图书的增删改查功能",
    version="1.0.0"
)

# 挂载静态文件目录
app.mount("/static", StaticFiles(directory="frontend"), name="static")


@app.get("/")
async def root():
    """返回前端首页 HTML"""
    index_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "index.html")
    return FileResponse(index_path)


@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "ok"}


@app.get("/favicon.ico", status_code=204)
async def favicon():
    """favicon 路由 - 返回 204 No Content"""
    return Response(status_code=204)


# 保留原有 API 路由
from routers import books
app.include_router(books.router, prefix="/api/books", tags=["books"])
