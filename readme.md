# 👤 User Management App

A basic CRUD application to view and manage users, developed for project-based learning during my internship at [ST United](https://stunited.vn/)

### 💻 Project Features
---

**Backend & Data Engineering**

- **Robust CRUD Implementation**: Developed a modular RESTful API using NestJS to manage user lifecycles, featuring create, read, update and soft-delete functionality
- **Type-Safe Persistence:**: Integrated PrismaORM with PostgreSQL to enforce schema integrity, utilising UUIDs for primary keys and implementing soft-delete functionality for non-destructive record removal
- **Data Validation & Security**: Implemented validation using NestJS pipes (class-validator) to enforce struct business rules for email uniqueness and ISO date formats
- **Advanced Filtering & Pagination**: engineered server-side pagination and complex search queries, supporting partial name matches and temporal range filtering

**Frontend & User Interface**

- **Reactive State Management**: built a responsive dashboard using Reach and TypeScript, ensuring full type-safety from API responses to UI components
- **Client-Side Validation**: leverageed TailwindCSS and TypeScript to provide real-time form validation and feedback, enhancing UX by catching errors before network submission

**Infrastructure & Devops**

- **Containerised Orchestration**: standardised development and deployment environments using Docker and Docker Compose to manage the application and PostgreSQL database as isolated services
- **Database Design**: designed a relational schema with explicit constraints and indexes to ensure high-performance lookups on frequently searched fields like email and status

### 🔨 Setup
---

Make sure you have docker installed.

The first thing to do is configure `/server/.env.example` by setting a custom `DB_PASSWORD` 
and renaming the file to `.env`. After, we can then install the dependencies, deploy the 
postgresql database and run the server by typing the following in the terminal: 

```shell
cd server
npm install
docker-compose up
npm run start
```

We can then run the client by typing in the following into a **seperate** terminal:

```shell
cd client
npm install
npm run dev
```

