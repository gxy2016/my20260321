"""
Pydantic 数据验证模型
用于 API 请求和响应的数据验证
"""

from pydantic import BaseModel, Field
from typing import Optional


class BookCreate(BaseModel):
    """创建图书的请求模型"""
    title: str = Field(..., description="书名", min_length=1)
    author: str = Field(..., description="作者", min_length=1)
    isbn: Optional[str] = Field(None, description="ISBN 编号")
    publisher: Optional[str] = Field(None, description="出版社")
    publish_date: Optional[str] = Field(None, description="出版日期 (YYYY-MM-DD)")
    price: Optional[float] = Field(None, description="价格", ge=0)
    description: Optional[str] = Field(None, description="图书描述")


class BookUpdate(BaseModel):
    """更新图书的请求模型"""
    title: Optional[str] = Field(None, description="书名", min_length=1)
    author: Optional[str] = Field(None, description="作者", min_length=1)
    isbn: Optional[str] = Field(None, description="ISBN 编号")
    publisher: Optional[str] = Field(None, description="出版社")
    publish_date: Optional[str] = Field(None, description="出版日期 (YYYY-MM-DD)")
    price: Optional[float] = Field(None, description="价格", ge=0)
    description: Optional[str] = Field(None, description="图书描述")


class BookResponse(BaseModel):
    """图书响应模型"""
    id: int
    title: str
    author: str
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    publish_date: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config:
        from_attributes = True
