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

/* Was going to be implemented, but since my database can't run, can't verify if it works.

CREATE TABLE workout_plans (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES users(id),
    dayOfWeek VARCHAR(20),
    workoutFocus VARCHAR(50),
    exercise VARCHAR(50),
    repetitions VARCHAR(20),
    numSets INT,
    tutorial VARCHAR(200)
);
GO */