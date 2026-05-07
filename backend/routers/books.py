"""
图书 API 路由
完整的图书 CRUD API
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import Book
from schemas import BookCreate, BookUpdate, BookResponse

router = APIRouter()


@router.get("/", response_model=List[BookResponse])
async def get_books(
    skip: int = Query(0, ge=0, description="跳过的记录数"),
    limit: int = Query(10, ge=1, le=100, description="返回的记录数"),
    search: Optional[str] = Query(None, description="搜索关键词（书名/作者）"),
    db: Session = Depends(get_db),
):
    """获取图书列表，支持分页和搜索"""
    query = db.query(Book)
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Book.title.like(search_pattern)) | (Book.author.like(search_pattern))
        )
    books = query.offset(skip).limit(limit).all()
    return books


@router.get("/{book_id}", response_model=BookResponse)
async def get_book(book_id: int, db: Session = Depends(get_db)):
    """获取单本图书详情"""
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="图书不存在")
    return book


@router.post("/", response_model=BookResponse, status_code=201)
async def create_book(book: BookCreate, db: Session = Depends(get_db)):
    """新增图书"""
    # 检查 ISBN 是否已存在
    if book.isbn:
        existing = db.query(Book).filter(Book.isbn == book.isbn).first()
        if existing:
            raise HTTPException(status_code=400, detail="ISBN 已存在")

    db_book = Book(**book.model_dump())
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


@router.put("/{book_id}", response_model=BookResponse)
async def update_book(
    book_id: int, book_update: BookUpdate, db: Session = Depends(get_db)
):
    """更新图书信息"""
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="图书不存在")

    # 检查新 ISBN 是否与其他图书冲突
    if book_update.isbn:
        existing = (
            db.query(Book)
            .filter(Book.isbn == book_update.isbn, Book.id != book_id)
            .first()
        )
        if existing:
            raise HTTPException(status_code=400, detail="ISBN 已存在")

    update_data = book_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_book, key, value)

    db.commit()
    db.refresh(db_book)
    return db_book


@router.delete("/{book_id}", status_code=204)
async def delete_book(book_id: int, db: Session = Depends(get_db)):
    """删除图书"""
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if not db_book:
        raise HTTPException(status_code=404, detail="图书不存在")

    db.delete(db_book)
    db.commit()
    return None
