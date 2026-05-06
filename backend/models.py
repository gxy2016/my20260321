"""
Books 数据模型
定义 books 表的结构
"""

from sqlalchemy import Column, Integer, Text, Float
from sqlalchemy.sql import func
from database import Base


class Book(Base):
    """图书模型"""
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(Text, nullable=False)
    author = Column(Text, nullable=False)
    isbn = Column(Text, unique=True, nullable=True)
    publisher = Column(Text, nullable=True)  # 出版社
    publish_date = Column(Text, nullable=True)  # YYYY-MM-DD 格式
    price = Column(Float, nullable=True)
    description = Column(Text, nullable=True)  # 图书描述
    created_at = Column(Text, server_default=func.current_timestamp())
    updated_at = Column(Text, server_default=func.current_timestamp())

    def to_dict(self):
        """转换为字典"""
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "isbn": self.isbn,
            "publisher": self.publisher,
            "publish_date": self.publish_date,
            "price": self.price,
            "description": self.description,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
