# Users and Connections

This is a toy project developed in Sequelize, Express, React and NodeJS.  The
application allows to create users and connections between them. Users are
defined by an id and a name. In addition, connections can be visualized
in a directed graph.

## Requirements

In order to run this application you will need a working installation of:

- NodeJS v.8.10.0 or higher
- NPM v.3.5.2 or higher

## Build

To build this application simply run:

`npm install`
`node_modules/.bin/gulp build-dev`

Before you continue to the next step, you should provide database connection
information. You will need to update the file `config/database-sample.json` in
the following way:

- Rename the file to: `config/database.json`
- Provide: username, password, database name, database host and dialect. A working
configuration may be:

````javascript
{
  "development": {
    "username": "root",
    "password": "123",
    "database": "users_connections",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "123",
    "database": "users_connections",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "123",
    "database": "users_connections",
    "host": "localhost",
    "dialect": "mysql"
  }
}
````

**Note:** Here we are using a MySQL database, in addition you can use PostgreSQL
and several others of your choice. Read Sequelize documentation for more information.

**Note:** You don't need to modify your database schema, the application is responsible
of creating everithing from scratch. You should provide an empty database.

## Run

To run the application you can use:

`npm start`

Application will be running in `http://localhost:3000`.

