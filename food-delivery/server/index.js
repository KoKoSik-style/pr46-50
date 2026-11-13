const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// База данных (эмуляция)
const products = [
  { id: 1, category_id: 1, name: 'Пепперони', price: 550, is_available: true, is_popular: true, image_url: 'https://placehold.co/400x300/FF6B35/white?text=Pizza' },
  { id: 2, category_id: 1, name: 'Маргарита', price: 450, is_available: true, is_popular: false, image_url: 'https://placehold.co/400x300/FF6B35/white?text=Pizza' },
  { id: 3, category_id: 2, name: 'Филадельфия', price: 650, is_available: true, is_popular: true, image_url: 'https://placehold.co/400x300/FF6B35/white?text=Sushi' }
];

const categories = [
  { id: 1, name: 'Пицца' },
  { id: 2, name: 'Суши' }
];

// API Роуты
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@mail.ru' && password === '123456') {
    res.json({ token: 'token123', role: 'admin', name: 'Администратор' });
  } else if (email === 'client@mail.ru' && password === '123456') {
    res.json({ token: 'token123', role: 'client', name: 'Иван' });
  } else {
    res.status(401).json({ error: 'Неверный email или пароль' });
  }
});

app.get('/api/categories', (req, res) => res.json(categories));

app.get('/api/products', (req, res) => {
  let result = products.filter(p => p.is_available);
  if (req.query.category) result = result.filter(p => p.category_id == req.query.category);
  if (req.query.search) result = result.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  res.json(products.find(p => p.id == req.params.id) || { error: 'Не найдено' });
});

app.post('/api/orders', (req, res) => {
  console.log('Заказ:', req.body);
  res.json({ success: true });
});

app.get('/api/orders', (req, res) => {
  res.json([{ id: 1, status: 'new', total_price: 1000, created_at: '2023-10-25' }]);
});

app.listen(3000, () => console.log('Бэкенд запущен на http://localhost:3000'));