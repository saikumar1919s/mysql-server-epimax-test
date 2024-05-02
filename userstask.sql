CREATE table  if NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    username varchar(255), 
    password_hash varchar(255));


CREATE TABLE Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY ,
    title varchar(255), 
    description char,
    status varchar(255), 
    assignee_id INT, 
    created_at DATETIME, 
    updated_at DATETIME, 
    FOREIGN KEY(assignee_id) REFERENCES Users(id));


SELECT * FROM users