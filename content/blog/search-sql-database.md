---
title: Search all tables for value, search all tables for column name (PostgreSQL)
date: '2021-04-05T14:45:00.284Z'
description: How to search all tables of a Postgres database for a particular value, how to find all tables containing a particular column
---

<img src="https://images.unsplash.com/photo-1559506650-eb97ae860a01?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Clifton Suspension Bridge, Bristol" style="zoom:60%;" />
    

*Sometimes it's useful to search **all** tables in a SQL database for a particular value, or all tables for a particular column. Here's how I do it.*

## Search for value

1. Access your DB, in my case a Docker container: `docker exec -it POSTGRES_CONTAINER_ID sh`
2. [Extract DB into archive](https://www.postgresql.org/docs/9.1/app-pgdump.html) - `pg_dump --data-only --inserts -U postgres DB_NAME > db_dump.tmp`
3. [grep](https://www.geeksforgeeks.org/grep-command-in-unixlinux/) for value - `grep "some value" db_dump.tmp`

## Search for column name

```sql
SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
WHERE COLUMN_NAME LIKE '%some_column_name%' 
ORDER BY TABLE_NAME
```

Remember to include [the `%` matcher](https://www.postgresqltutorial.com/postgresql-like/).
