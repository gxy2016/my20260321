"""
数据库初始化脚本
创建 SQLite 数据库和 books 表
"""

import os
import sys

# 将 backend 目录添加到 Python 路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import engine, Base
from models import Book


def init_db():
    """初始化数据库，创建所有表"""
    print(f"数据库路径: {engine.url}")
    Base.metadata.create_all(bind=engine)
    print("数据库初始化成功！")
    print(f"books 表已创建，包含以下字段:")
    print(f"  - id (INTEGER, PRIMARY KEY, AUTOINCREMENT)")
    print(f"  - title (TEXT, NOT NULL) — 书名")
    print(f"  - author (TEXT, NOT NULL) — 作者")
    print(f"  - isbn (TEXT, UNIQUE) — ISBN 编号")
    print(f"  - publisher (TEXT) — 出版社")
    print(f"  - publish_date (TEXT) — 出版日期 (YYYY-MM-DD)")
    print(f"  - price (REAL) — 价格")
    print(f"  - description (TEXT) — 图书描述")
    print(f"  - created_at (TEXT, DEFAULT CURRENT_TIMESTAMP) — 创建时间")
    print(f"  - updated_at (TEXT, DEFAULT CURRENT_TIMESTAMP) — 更新时间")


if __name__ == "__main__":
    init_db()
