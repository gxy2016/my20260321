/**
 * 图书管理系统 - 前端应用 (完整版)
 * 功能：图书列表展示、录入、删除、高级查询
 * API: GET/POST/PUT/DELETE /api/books
 */

// ===== 配置 =====
const CONFIG = {
  API_BASE: '/api',
  PAGE_SIZE: 10,
  USE_MOCK: true,  // 开发阶段使用 Mock 数据，Bob 完成后改为 false
};

// ===== Mock 数据 =====
let MOCK_BOOKS = [
  { id: 1, title: 'JavaScript 高级程序设计', author: 'Matt Frisbie', isbn: '9787115545381', publisher: '人民邮电出版社', publish_date: '2020-09-01', price: 119.00, description: 'JavaScript 权威指南，深入讲解 JS 核心概念' },
  { id: 2, title: 'Vue.js 设计与实现', author: '霍春勇', isbn: '9787115571069', publisher: '人民邮电出版社', publish_date: '2021-08-01', price: 79.90, description: '深入理解 Vue.js 内部原理' },
  { id: 3, title: 'Python 编程：从入门到实践', author: 'Eric Matthes', isbn: '9787111428023', publisher: '机械工业出版社', publish_date: '2016-07-01', price: 89.00, description: 'Python 入门经典教程' },
  { id: 4, title: '深入理解计算机系统', author: 'Randal E. Bryant', isbn: '9787111544937', publisher: '机械工业出版社', publish_date: '2016-09-01', price: 139.00, description: 'CSAPP 经典教材' },
  { id: 5, title: '算法导论', author: 'Thomas H. Cormen', isbn: '9787111407010', publisher: '机械工业出版社', publish_date: '2013-01-01', price: 128.00, description: '算法领域经典教材' },
  { id: 6, title: '设计模式', author: 'Erich Gamma 等', isbn: '9787111075752', publisher: '机械工业出版社', publish_date: '2000-09-01', price: 39.00, description: 'GoF 设计模式' },
  { id: 7, title: '重构：改善既有代码的设计', author: 'Martin Fowler', isbn: '9787115336951', publisher: '人民邮电出版社', publish_date: '2014-02-01', price: 69.00, description: '代码重构经典' },
  { id: 8, title: '代码整洁之道', author: 'Robert C. Martin', isbn: '9787115226458', publisher: '人民邮电出版社', publish_date: '2010-01-01', price: 49.00, description: '编写整洁代码' },
  { id: 9, title: '人月神话', author: 'Frederick P. Brooks Jr.', isbn: '9787111429966', publisher: '机械工业出版社', publish_date: '2013-08-01', price: 59.00, description: '软件工程经典' },
  { id: 10, title: '深入理解 MySQL', author: '彭立勋', isbn: '9787111368288', publisher: '机械工业出版社', publish_date: '2012-01-01', price: 89.00, description: 'MySQL internals' },
  { id: 11, title: 'Redis 设计与实现', author: '黄健宏', isbn: '9787111480257', publisher: '机械工业出版社', publish_date: '2014-06-01', price: 69.00, description: 'Redis 源码分析' },
  { id: 12, title: 'Nginx 高性能 Web 服务器', author: '赵磊', isbn: '9787121188464', publisher: '电子工业出版社', publish_date: '2013-01-01', price: 59.00, description: 'Nginx 实战指南' },
  { id: 13, title: 'Docker 技术入门与实战', author: '杨保华', isbn: '9787121248483', publisher: '电子工业出版社', publish_date: '2015-01-01', price: 79.00, description: 'Docker 入门教程' },
  { id: 14, title: 'Git 版本控制管理', author: '蒋鑫', isbn: '9787302428076', publisher: '清华大学出版社', publish_date: '2016-01-01', price: 69.00, description: 'Git 权威指南' },
  { id: 15, title: 'Linux 命令行与 Shell 脚本', author: 'Richard Blum', isbn: '9787115442652', publisher: '人民邮电出版社', publish_date: '2017-01-01', price: 99.00, description: 'Linux 系统管理' },
  { id: 16, title: 'HTTP 权威指南', author: 'David Gourley', isbn: '9787115352081', publisher: '人民邮电出版社', publish_date: '2012-01-01', price: 99.00, description: 'HTTP 协议详解' },
  { id: 17, title: 'TCP/IP 详解 卷1', author: 'W. Richard Stevens', isbn: '9787111084824', publisher: '机械工业出版社', publish_date: '2000-01-01', price: 69.00, description: '网络协议经典' },
  { id: 18, title: '编译原理', author: 'Alfred V. Aho', isbn: '9787111128178', publisher: '机械工业出版社', publish_date: '2003-01-01', price: 99.00, description: '龙书' },
  { id: 19, title: '计算机程序的构造和解释', author: 'Harold Abelson', isbn: '9787111135701', publisher: '机械工业出版社', publish_date: '2004-01-01', price: 59.00, description: 'SICP 经典' },
  { id: 20, title: '你不知道的 JavaScript', author: 'Kyle Simpson', isbn: '9787115432011', publisher: '人民邮电出版社', publish_date: '2016-01-01', price: 59.00, description: 'JS 深入系列' },
  { id: 21, title: 'CSS 揭秘', author: 'Lea Verou', isbn: '9787115426772', publisher: '人民邮电出版社', publish_date: '2016-01-01', price: 59.00, description: 'CSS 高级技巧' },
  { id: 22, title: 'TypeScript 编程', author: '萨伊德', isbn: '9787121337826', publisher: '电子工业出版社', publish_date: '2018-01-01', price: 89.00, description: 'TypeScript 全面指南' },
  { id: 23, title: 'React 进阶之路', author: '王里博', isbn: '9787121345722', publisher: '电子工业出版社', publish_date: '2018-01-01', price: 69.00, description: 'React 深入理解' },
  { id: 24, title: 'Node.js 权威指南', author: 'Marc Harter', isbn: '9787115428134', publisher: '人民邮电出版社', publish_date: '2016-01-01', price: 79.00, description: 'Node.js 全面解析' },
  { id: 25, title: 'Webpack 技术详解', author: '张雅婷', isbn: '9787121334566', publisher: '电子工业出版社', publish_date: '2018-01-01', price: 59.00, description: 'Webpack 实战' },
];

// ===== 状态 =====
let state = {
  books: [],
  currentPage: 1,
  totalPages: 1,
  totalBooks: 0,
  searchQuery: '',
  loading: false,
  error: null,
  deleteBookId: null,
  nextId: 26,  // Mock 数据的下一个 ID
};

// ===== DOM 元素 =====
const elements = {
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  empty: document.getElementById('empty'),
  bookList: document.getElementById('bookList'),
  pagination: document.getElementById('pagination'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  pageInfo: document.getElementById('pageInfo'),
  searchInput: document.getElementById('searchInput'),
  deleteModal: document.getElementById('deleteModal'),
  deleteBookTitle: document.getElementById('deleteBookTitle'),
  confirmDelete: document.getElementById('confirmDelete'),
  addResult: document.getElementById('addResult'),
  searchResults: document.getElementById('searchResults'),
  searchBookList: document.getElementById('searchBookList'),
  searchEmpty: document.getElementById('searchEmpty'),
};

// ===== Tab 切换 =====
function switchTab(tabName) {
  // 隐藏所有 tab
  document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach((el) => el.classList.remove('active'));

  // 显示目标 tab
  document.getElementById(`tab-${tabName}`).classList.remove('hidden');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  // 切换到列表 tab 时重新加载
  if (tabName === 'list') {
    loadBooks();
  }
}

// ===== API 调用 =====

async function fetchBooksFromAPI(page = 1, pageSize = CONFIG.PAGE_SIZE, query = '') {
  const params = new URLSearchParams({ page: page.toString(), page_size: pageSize.toString() });
  if (query) params.set('q', query);
  const response = await fetch(`${CONFIG.API_BASE}/books?${params}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function fetchBooksFromMock(page = 1, pageSize = CONFIG.PAGE_SIZE, query = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_BOOKS];
      if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (book) => book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
        );
      }
      const totalBooks = filtered.length;
      const totalPages = Math.ceil(totalBooks / pageSize) || 1;
      const start = (page - 1) * pageSize;
      const books = filtered.slice(start, start + pageSize);
      resolve({ books, total: totalBooks, page, page_size: pageSize, total_pages: totalPages });
    }, 200);
  });
}

async function fetchBooks(page = 1, pageSize = CONFIG.PAGE_SIZE, query = '') {
  return CONFIG.USE_MOCK ? fetchBooksFromMock(page, pageSize, query) : fetchBooksFromAPI(page, pageSize, query);
}

// ===== 图书录入 =====
async function addBookFromAPI(bookData) {
  const response = await fetch(`${CONFIG.API_BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function addBookToMock(bookData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook = {
        id: state.nextId++,
        ...bookData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      MOCK_BOOKS.push(newBook);
      resolve(newBook);
    }, 200);
  });
}

async function addBook(bookData) {
  return CONFIG.USE_MOCK ? addBookToMock(bookData) : addBookFromAPI(bookData);
}

// ===== 图书删除 =====
async function deleteBookFromAPI(bookId) {
  const response = await fetch(`${CONFIG.API_BASE}/books/${bookId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function deleteBookFromMock(bookId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_BOOKS = MOCK_BOOKS.filter((book) => book.id !== bookId);
      resolve({ success: true });
    }, 200);
  });
}

async function deleteBook(bookId) {
  return CONFIG.USE_MOCK ? deleteBookFromMock(bookId) : deleteBookFromAPI(bookId);
}

// ===== 高级查询 =====
async function searchBooksFromAPI(filters) {
  const params = new URLSearchParams();
  if (filters.title) params.set('title', filters.title);
  if (filters.author) params.set('author', filters.author);
  if (filters.isbn) params.set('isbn', filters.isbn);
  if (filters.publisher) params.set('publisher', filters.publisher);
  if (filters.priceMin) params.set('price_min', filters.priceMin);
  if (filters.priceMax) params.set('price_max', filters.priceMax);
  const response = await fetch(`${CONFIG.API_BASE}/books/search?${params}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function searchBooksInMock(filters) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...MOCK_BOOKS];
      if (filters.title) {
        results = results.filter((b) => b.title.toLowerCase().includes(filters.title.toLowerCase()));
      }
      if (filters.author) {
        results = results.filter((b) => b.author.toLowerCase().includes(filters.author.toLowerCase()));
      }
      if (filters.isbn) {
        results = results.filter((b) => b.isbn && b.isbn.includes(filters.isbn));
      }
      if (filters.publisher) {
        results = results.filter((b) => b.publisher && b.publisher.includes(filters.publisher));
      }
      if (filters.priceMin) {
        results = results.filter((b) => b.price >= parseFloat(filters.priceMin));
      }
      if (filters.priceMax) {
        results = results.filter((b) => b.price <= parseFloat(filters.priceMax));
      }
      resolve(results);
    }, 200);
  });
}

async function searchBooks(filters) {
  return CONFIG.USE_MOCK ? searchBooksInMock(filters) : searchBooksFromAPI(filters);
}

// ===== 渲染 =====
function showState(stateName) {
  ['loading', 'error', 'empty', 'bookList'].forEach((s) => elements[s].classList.add('hidden'));
  elements[stateName].classList.remove('hidden');
  if (stateName === 'bookList') elements.pagination.classList.remove('hidden');
  else elements.pagination.classList.add('hidden');
}

function renderBookList(books) {
  elements.bookList.innerHTML = books
    .map(
      (book) => `
    <div class="book-card" data-id="${book.id}">
      <h3>${escapeHtml(book.title)}</h3>
      <p class="author">✍️ ${escapeHtml(book.author)}</p>
      <p class="isbn">📖 ISBN: ${escapeHtml(book.isbn || 'N/A')}</p>
      ${book.publisher ? `<p class="publisher">🏢 ${escapeHtml(book.publisher)}</p>` : ''}
      ${book.description ? `<p class="description">${escapeHtml(book.description)}</p>` : ''}
      <p class="price">¥${book.price?.toFixed(2) || 'N/A'}</p>
      <p class="date">📅 ${book.publish_date || 'N/A'}</p>
      <div class="card-actions">
        <button class="btn-delete" onclick="openDeleteModal(${book.id}, '${escapeHtml(book.title)}')">🗑️ 删除</button>
      </div>
    </div>
  `
    )
    .join('');
}

function renderPagination() {
  const { currentPage, totalPages } = state;
  elements.pageInfo.textContent = `第 ${currentPage} / ${totalPages} 页（共 ${state.totalBooks} 本）`;
  elements.prevBtn.disabled = currentPage <= 1;
  elements.nextBtn.disabled = currentPage >= totalPages;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ===== 业务逻辑 =====

async function loadBooks() {
  state.loading = true;
  state.error = null;
  showState('loading');

  try {
    const data = await fetchBooks(state.currentPage, CONFIG.PAGE_SIZE, state.searchQuery);
    state.books = data.books || [];
    state.totalBooks = data.total || 0;
    state.totalPages = data.total_pages || 1;

    if (state.books.length === 0) {
      showState('empty');
    } else {
      renderBookList(state.books);
      renderPagination();
      showState('bookList');
    }
  } catch (err) {
    state.error = err.message;
    console.error('加载图书失败:', err);
    showState('error');
  } finally {
    state.loading = false;
  }
}

function handleSearch() {
  state.searchQuery = elements.searchInput.value.trim();
  state.currentPage = 1;
  loadBooks();
}

function goToPage(direction) {
  if (direction === 'prev' && state.currentPage > 1) state.currentPage--;
  else if (direction === 'next' && state.currentPage < state.totalPages) state.currentPage++;
  loadBooks();
}

// ===== 录入图书 =====
async function handleAddBook(event) {
  event.preventDefault();
  const form = document.getElementById('addBookForm');
  const bookData = {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    isbn: document.getElementById('isbn').value.trim(),
    publisher: document.getElementById('publisher').value.trim(),
    publish_date: document.getElementById('publish_date').value,
    price: parseFloat(document.getElementById('price').value) || 0,
    description: document.getElementById('description').value.trim(),
  };

  try {
    const result = await addBook(bookData);
    showResult('addResult', `✅ 录入成功！图书 ID: ${result.id}`, 'success');
    form.reset();
  } catch (err) {
    showResult('addResult', `❌ 录入失败: ${err.message}`, 'error');
  }
}

// ===== 删除图书 =====
function openDeleteModal(bookId, bookTitle) {
  state.deleteBookId = bookId;
  elements.deleteBookTitle.textContent = bookTitle;
  elements.deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  elements.deleteModal.classList.add('hidden');
  state.deleteBookId = null;
}

async function confirmDeleteBook() {
  if (!state.deleteBookId) return;
  try {
    await deleteBook(state.deleteBookId);
    closeDeleteModal();
    loadBooks();
  } catch (err) {
    alert(`删除失败: ${err.message}`);
    closeDeleteModal();
  }
}

// ===== 高级查询 =====
async function handleAdvancedSearch(event) {
  event.preventDefault();
  const filters = {
    title: document.getElementById('searchTitle').value.trim(),
    author: document.getElementById('searchAuthor').value.trim(),
    isbn: document.getElementById('searchISBN').value.trim(),
    publisher: document.getElementById('searchPublisher').value.trim(),
    priceMin: document.getElementById('priceMin').value,
    priceMax: document.getElementById('priceMax').value,
  };

  // 至少需要一个筛选条件
  if (!Object.values(filters).some(Boolean)) {
    alert('请至少输入一个查询条件');
    return;
  }

  try {
    const results = await searchBooks(filters);
    elements.searchResults.classList.remove('hidden');

    if (results.length === 0) {
      elements.searchBookList.innerHTML = '';
      elements.searchEmpty.classList.remove('hidden');
    } else {
      elements.searchEmpty.classList.add('hidden');
      elements.searchBookList.innerHTML = results
        .map(
          (book) => `
        <div class="book-card" data-id="${book.id}">
          <h3>${escapeHtml(book.title)}</h3>
          <p class="author">✍️ ${escapeHtml(book.author)}</p>
          <p class="isbn">📖 ISBN: ${escapeHtml(book.isbn || 'N/A')}</p>
          ${book.publisher ? `<p class="publisher">🏢 ${escapeHtml(book.publisher)}</p>` : ''}
          <p class="price">¥${book.price?.toFixed(2) || 'N/A'}</p>
          <p class="date">📅 ${book.publish_date || 'N/A'}</p>
          <div class="card-actions">
            <button class="btn-delete" onclick="openDeleteModal(${book.id}, '${escapeHtml(book.title)}')">🗑️ 删除</button>
          </div>
        </div>
      `
        )
        .join('');
    }
  } catch (err) {
    alert(`查询失败: ${err.message}`);
  }
}

function resetSearch() {
  elements.searchResults.classList.add('hidden');
}

// ===== 工具函数 =====
function showResult(elementId, message, type) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.className = `result ${type}`;
  el.classList.remove('hidden');

  // 3 秒后自动隐藏
  setTimeout(() => el.classList.add('hidden'), 3000);
}

// ===== 事件绑定 =====
elements.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleSearch();
});

elements.confirmDelete.addEventListener('click', confirmDeleteBook);

// 点击模态框背景关闭
elements.deleteModal.addEventListener('click', (e) => {
  if (e.target === elements.deleteModal) closeDeleteModal();
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
});
