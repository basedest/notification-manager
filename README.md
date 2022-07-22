# Notification manager

*PERN app for managing notifications*

---

## Functionality

The server handles 3 types of notifications:
- individual
- for group of users
- for everyone

There are 2 types of users:
- basic user
- administrator

Basic users can access their own notifications and read it. That's it.

Administrators can access every API route to perform any kind of CRUD operations with users, groups and notifications.

Currently, client recieves **unread** notifications every 5 seconds through fetch API. **Full** notifications history list loads once within useEffect hook. 

The app handles authentication with JWT tokens.

## Getting app running on your machine

Firstly, create database in PostgreSQL.
Then, run `dump.sql` script (it's located in root folder of the project) within your freshly created database.

After that, define these environment variables:
- `PORT` - the server app port <sub><sup>(you better choose 5000 if you don't wanna edit every `fetch` occurrence in client code :D)</sup></sub>
- `DB_PORT` - database port
- `DB_HOST` - database host
- `DB_USERNAME` - database username
- `DB_PASSWORD` - database password
- `DB_NAME` - name of database you created in previous steps
- `JWT_SECRET` - string for JWT token encryption

At this point you just gotta get the server and client running.

Just run this script in server folder and then in client folder:
```bash
yarn start
```
Oh, almost forgot, you need to install the dependencies first. If you somehow don't know how to do it, run this script in server and client folder correspondingly:
```bash
yarn
```

> ⚠️ **Note:**
There's no way to make a new administrator user within the app for security reasons, so you have to register as user and then change user role to 'administrator' in database.
