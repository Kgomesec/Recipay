CREATE DATABASE IF NOT EXISTS Recipay;
USE Recipay;

CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    birthDate DATE NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS Requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    materialType ENUM('plastico', 'vidro', 'metal', 'papel') NOT NULL,
    quantity ENUM('pequeno', 'medio', 'grande') NOT NULL,
    address VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Criar usuário teste (senha: teste123)
INSERT INTO users (name, cpf, email, password, birthDate, role)
VALUES (
    'Usuário Teste',
    '123.456.789-00',
    'teste@gmail.com',
    '$2b$10$wTNrJrG1k1jwqvM3YwfG./I0pS5fCwazF0tFAHIc1F6WS5k74bFH2', -- senha hash de "teste123"
    '2000-01-01',
    'user'
);