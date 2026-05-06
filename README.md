# 图书管理网站 - 后端 API

## 技术栈

- **框架**: FastAPI
- **ORM**: SQLAlchemy
- **数据库**: SQLite
- **数据验证**: Pydantic

## 项目结构

```
backend/
├── main.py          # FastAPI 应用入口
├── database.py      # 数据库连接模块
├── models.py        # 数据模型
├── schemas.py       # Pydantic 数据验证模型
├── init_db.py       # 数据库初始化脚本
├── routers/
│   ├── __init__.py
│   └── books.py     # 图书 API 路由（空文件，待实现）
└── requirements.txt # 依赖列表
```

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 初始化数据库

```bash
cd backend
python init_db.py
```

### 3. 启动服务

```bash
cd backend
uvicorn main:app --reload
```

服务将在 http://localhost:8000 启动

### 4. 访问 API 文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 数据库表结构

### books 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键，自增 |
| title | TEXT | 书名 |
| author | TEXT | 作者 |
| isbn | TEXT | ISBN 编号（唯一） |
| publisher | TEXT | 出版社 |
| publish_date | TEXT | 出版日期 (YYYY-MM-DD) |
| price | REAL | 价格 |
| description | TEXT | 图书描述 |
| created_at | TEXT | 创建时间 |
| updated_at | TEXT | 更新时间 |

## API 接口（待实现）

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/books/ | 获取图书列表 |
| GET | /api/books/{id} | 获取单本图书详情 |
| POST | /api/books/ | 新增图书 |
| PUT | /api/books/{id} | 更新图书信息 |
| DELETE | /api/books/{id} | 删除图书 |
