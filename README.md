# MERN ToDo List App

## Install Dependencies

```
cd client
npm install
```
```
cd server
npm install
```

## Start
*В корневой папке проекта*

```
npm install
npm run start
```

## MySQL Tables
Users:
```
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    MiddleName VARCHAR(255),
    Login VARCHAR(255) UNIQUE,
    PasswordHash VARCHAR(255),
    SupervisorID INT,
    FOREIGN KEY (SupervisorID) REFERENCES Users(UserID)
);
```

Tasks:
```
CREATE TABLE Tasks (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Description TEXT,
    DueDate VARCHAR(255),
    CreationDate VARCHAR(255),
    UpdateDate VARCHAR(255),
    Priority VARCHAR(255),
    Status VARCHAR(255),
    CreatorID INT,
    AssigneeID INT,
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID),
    FOREIGN KEY (AssigneeID) REFERENCES Users(UserID)
);
```
***Пользователи supervisor'ы были созданы вручную***

## P.S
Я первый раз писал приложение полностью (frontend и backend), из-за того, что до этого работал только с Node.js и express, а React.js недавно только сел изучать. Поэтому там очень много недоработок, но это был отличный опыт, и мне очень понравилось разбираться в этом всём и сидеть писать. По ходу этого мини проекта я многое изучил, и готов учесть в следующих задачах, которые буду реализовывать!