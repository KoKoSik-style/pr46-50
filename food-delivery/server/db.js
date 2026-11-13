const mysql = require('mysql2');

// Создаем пул подключений
const pool = mysql.createPool({
  host: 'localhost',       // Сервер OpenServer работает на localhost
  user: 'root',            // Логин по умолчанию в OpenServer
  password: '',            // Пароль по умолчанию пустой (если меняли - укажите свой)
  database: 'food_delivery', // Имя БД, которую вы создали в phpMyAdmin
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Используем промисы, чтобы можно было писать await
const promisePool = pool.promise();

// Проверка подключения (выведет ошибку в консоль, если что-то не так)
promisePool.query('SELECT 1')
  .then(() => console.log('✅ База данных успешно подключена!'))
  .catch((err) => console.error('❌ Ошибка подключения к БД:', err));

module.exports = promisePool;