// Подключаем библиотеку 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require("./database/database");

// Экземпляр приложения
const app = express();

// Порт
const PORT = process.env.PORT || 8000;

// Использованные доп методы
app.use(bodyParser.json());
app.use(cors());

// Функция хэширования пароля
async function hashPassword(plainPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainPassword, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

// Роут регистрации
app.post("/register", async (req, res) => {
    const { FirstName, LastName, MiddleName, Login, Password, SupervisorID } = req.body;
    const PasswordHash = await hashPassword(Password);

    // Берем из бд айди супервизора через его никнейм
    const SQLToGetSuperID = "SELECT UserId FROM Users WHERE Login = ?";
    let supervisor = await db.query(SQLToGetSuperID, [SupervisorID]);
    supervisor = supervisor[0].UserId;
    
    // Добавляем пользователя в таблицу
    const sql = 'INSERT INTO Users (FirstName, LastName, MiddleName, Login, PasswordHash, SupervisorID) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [FirstName, LastName, MiddleName, Login, PasswordHash, supervisor];
    db.query(sql, values)
        .then(() => {
            res.status(201).send('User registered');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Registration failed');
        });
});

// Роут авторизации
app.post("/login", async (req, res) => {
    const { Login, Password } = req.body;

    const sql = 'SELECT * FROM Users WHERE Login = ?';
    const [user] = await db.query(sql, [Login]);
    if (!user || user.length === 0) {
        res.status(401).send('User not found');
    } else {
        const passwordMatch = await bcrypt.compare(Password, user.PasswordHash);
        if (passwordMatch) {
            res.status(200).send('User authenticated');
        } else {
            res.status(401).send('Authentication failed');
        }
    }
});

// Функция, возвращающая сегодняшнюю дату в формате строки
const today = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return `${day}-${month}-${year}`;
}

// Роут создания задачи
app.post("/createTask", async (req, res) => {
    const { Title, Description, DueDate, Priority, Status, CreatorID, AssigneeID } = req.body;

    const CreationDate = today();
    const UpdateDate = CreationDate;

    const SQLToGetUserID = "SELECT UserId FROM Users WHERE Login = ?";
    let [creator_id] = await db.query(SQLToGetUserID, [AssigneeID]);
    creator_id = creator_id.UserId;

    try {
        const sql = 'INSERT INTO Tasks (Title, Description, DueDate, CreationDate, UpdateDate, Priority, Status, CreatorID, AssigneeID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [Title, Description, DueDate, CreationDate, UpdateDate, Priority, Status, CreatorID, creator_id];
        await db.query(sql, values);

        res.status(201).send('Task created');
    } catch (error) {
        console.error(error);

        res.status(500).send('Failed to create task');
    }
});

// Роут получения задач
app.get("/tasks", async (req, res) => {
    try {
        const sql = 'SELECT * FROM Tasks';
        const tasks = await db.query(sql);

        res.send(tasks);
    } catch (error) {
        console.error(error);

        res.status(500).send('Failed to fetch tasks');
    }
});

// Роут редактирования задач
app.put("/editTask/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const { Title, Description, DueDate, Priority, Status, AssigneeID } = req.body;

    const UpdateDate = today();

    const SQLToGetUserID = "SELECT UserId FROM Users WHERE Login = ?";
    let [creator_id] = await db.query(SQLToGetUserID, [AssigneeID]);
    creator_id = creator_id.UserId;

    try {
        const sql = 'UPDATE Tasks SET Title = ?, Description = ?, DueDate = ?, Priority = ?, Status = ?, AssigneeID = ?, UpdateDate = ? WHERE TaskID = ?';
        const values = [Title, Description, DueDate, Priority, Status, creator_id, UpdateDate, taskId];
        await db.query(sql, values);

        res.status(201).send('Task updated');
    } catch (error) {
        console.error(error);

        res.status(500).send('Failed to update task');
    }
});

// Слушаем порт)
app.listen(PORT, () => { console.log(`Server has been started.\nURL: http://localhost:${PORT}/`) })