CREATE TABLE IF NOT EXISTS users ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(100), 
email VARCHAR(100) 
); 
INSERT INTO users (name, email) VALUES 
('Anas', 'anas@example.com'), 
('Bob', 'bob@example.com');