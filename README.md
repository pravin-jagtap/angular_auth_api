# Simple Auth App

A simple full-stack login and signup application built with:

- Spring Boot API
- Angular UI
- PostgreSQL database

## Project structure

- `backend/` - Spring Boot REST API
- `frontend/` - Angular application
- `docker-compose.yml` - PostgreSQL for local development

## Prerequisites

- Java 17 or newer
- Maven 3.9+
- Node.js 20+
- Docker Desktop (recommended for PostgreSQL)

## Run PostgreSQL

```bash
docker compose up -d
```

This starts PostgreSQL with:

- Database: `auth_app`
- Username: `postgres`
- Password: `postgres`

## Run the backend

```bash
cd backend
mvn spring-boot:run
```

The API will run on `http://localhost:8080`.

## Run the frontend

```bash
cd frontend
npm install
npm start
```

The Angular app will run on `http://localhost:4200`.

## Features

- Landing page with sign-in and sign-up actions
- User registration stored in PostgreSQL
- Login using saved credentials
- Logout support
- Protected welcome page for authenticated users

