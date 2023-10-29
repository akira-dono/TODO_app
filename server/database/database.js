// Подключаем библиотеку 
const mysql = require('mysql2');

// Создаем пул соединений с бд
const pool = mysql.createPool({
    host: "localhost",
    user: "user", //! Имя пользователя
    password: "password", //! Пароль
    database: 'todo_list'
});

// Функция для выполнения SQL-запросов
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        })
    });
}

module.exports = {query};