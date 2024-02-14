# Bookpanda E-Commerce Website

Bookpanda is an e-commerce website where customers can buy or borrow books and sellers can list and sell books. The platform also facilitates user authentication and provides a search functionality to help users find the books they need. The project is built using Node.js and Express with Prisma as the ORM for database operations and MySQL as the database.

## Installation

To install and run Bookpanda on your local machine, follow these steps:

### Prerequisites

Before you begin, ensure you have the following software installed on your system:

- Node.js and npm (Node Package Manager)
- MySQL database
- Git 

### Steps

1. **Clone the Repository**: 

If you have Git installed, you can clone the repository using the following command:

```
git clone https://github.com/yourusername/bookpanda.git
```

Alternatively, you can download the source code as a ZIP file from the GitHub repository.

2. **Navigate to the Project Directory**:

Use the terminal or command prompt to navigate to the directory where you have cloned or downloaded the Bookpanda repository.

```
cd bookpanda
```

3. **Install Dependencies**:

Run the following command to install the required dependencies:
```
npm install
```

This command will install all the dependencies listed in the `package.json` file.

4. **Database Configuration**:

You need to configure your MySQL database settings before running the application. Create a `.env` file in the root directory of the project and add the following environment variables or your own cloud SQL server link:

```
DATABASE_URL="mysql://username:password@localhost:3306/bookpanda"
```

Replace `username` and `password` with your MySQL username and password respectively. `bookpanda` is the name of the database.

5. **Create Tables in MySQL**:

Run the following SQL queries in your MySQL database to create the necessary tables:

```sql
CREATE TABLE seller (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(200) UNIQUE,
    address VARCHAR(200),
    password VARCHAR(200),
    joindate DATETIME DEFAULT CURRENT_TIMESTAMP,
    books_sold INT,
    books_lent INT
);

CREATE TABLE customer (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    address VARCHAR(200),
    books_purchased INT,
    books_borrowed INT
);

CREATE TABLE book_shelf (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    author VARCHAR(50),
    summary VARCHAR(200), 
    seller_id INT,
    category VARCHAR(200),
    pages INT,
    price INT
);
```

Run Prisma in your terminal (execute these lines step by step and hit enter):

```
npm install prisma
```

```
npx prisma init --datasource-provider mysql2
```

```
npx prisma db pull   
```

```
npm install @prisma/client
```

This command will create the required tables in your MySQL database based on the Prisma schema.

Start the Server:
Once the dependencies are installed, the database is configured, and the tables are created, you can start the server by running the following command:
```
npm start
```
Bookpanda will be accessible at http://localhost:3000 in your browser.

Access Bookpanda:
Open your web browser and navigate to http://localhost:3000/login to access the Bookpanda e-commerce website.

If you encounter any issues during the installation process or while using Bookpanda, please refer to the project's documentation or reach out to the project maintainers for assistance.

Thank you for using Bookpanda!
