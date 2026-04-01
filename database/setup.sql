CREATE DATABASE botFit;
GO
USE botFit;
GO

CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,
    goalWeight INT,
    currentWeight INT,
    height INT,
    age INT,
    gender VARCHAR(10)
);
GO