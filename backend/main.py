"""
图书管理网站 - 后端 API
FastAPI 应用入口（含静态文件服务）
"""

import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from database import engine, Base
from models import Book
from routers import books

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 获取前端目录路径（与 backend 同级）
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

# 创建 FastAPI 应用
app = FastAPI(
    title="图书管理 API",
    description="图书管理网站后端 API，提供图书的增删改查功能",
    version="1.0.0"
)

# 注册 API 路由（在 mount 之前注册，确保 API 优先匹配）
app.include_router(books.router, prefix="/api/books", tags=["books"])

# 挂载前端静态文件目录（CSS、JS、HTML 等）
app.mount("/", StaticFiles(directory=FRONTEND_DIR), name="frontend")
