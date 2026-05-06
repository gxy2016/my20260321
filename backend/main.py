"""
图书管理网站 - 后端 API
FastAPI 应用入口
"""

from fastapi import FastAPI
from database import engine, Base
from models import Book
from routers import books

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 创建 FastAPI 应用
app = FastAPI(
    title="图书管理 API",
    description="图书管理网站后端 API，提供图书的增删改查功能",
    version="1.0.0"
)

# 注册路由
app.include_router(books.router, prefix="/api/books", tags=["books"])


@app.get("/")
async def root():
    """根路径"""
    return {"message": "图书管理 API", "docs": "/docs"}


@app.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "ok"}
