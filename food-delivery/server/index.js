const express = require('express');
const cors = require('cors');
const db = require('./db'); // Подключаем базу данных

const app = express();
const path = require('path');
// Разрешаем серверу отдавать файлы из папки public
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors());
app.use(express.json());

// --- API РОУТЫ ---

// 1. Авторизация
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    // Для теста пароль сравнивается напрямую (в реальном проекте нужен bcrypt)
    if (user && user.password_hash === password) {
      res.json({ token: 'token123', role: user.role, name: user.name });
    } else {
      res.status(401).json({ error: 'Неверный email или пароль' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Категории
app.get('/api/categories', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM categories ORDER BY sort_order');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Товары (с фильтрацией)
app.get('/api/products', async (req, res) => {
  const { category, search } = req.query;
  let sql = 'SELECT * FROM products WHERE is_available = TRUE';
  const params = [];

  if (category) {
    sql += ' AND category_id = ?';
    params.push(category);
  }
  if (search) {
    sql += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }

  try {
    const [products] = await db.query(sql, params);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Один товар (карточка блюда)
app.get('/api/products/:id', async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product.length === 0) return res.status(404).json({ error: 'Не найдено' });
    res.json(product[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Оформление заказа
app.post('/api/orders', async (req, res) => {
  const { items, address, payment_method, total_price } = req.body;
  
  // Для теста берем ID клиента = 2 (тот, что мы добавили в БД)
  const userId = 2; 

  try {
    // Создаем сам заказ
    const [orderResult] = await db.query(
      'INSERT INTO orders (user_id, address, payment_method, total_price) VALUES (?, ?, ?, ?)',
      [userId, address, payment_method, total_price]
    );
    const orderId = orderResult.insertId;

    // Добавляем позиции заказа (блюда)
    for (let item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.id, 1, item.price]
      );
    }

    res.json({ success: true, orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Список всех заказов (для админки)
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => console.log(` Backend запущен на http://localhost:${PORT}`));