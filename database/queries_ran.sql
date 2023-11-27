CREATE TABLE customer (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NOT NULL,
    email varchar(200) NOT NULL UNIQUE,
	password varchar(200) NOT NULL,
    books_purchased INT,
    books_borrowed INT
);

SHOW TABLE STATUS FROM bouduqkljsqzlrgmtj5h;	

SELECT table_schema, SUM(data_length) AS total_size
FROM information_schema.tables
WHERE table_schema = 'bouduqkljsqzlrgmtj5h';