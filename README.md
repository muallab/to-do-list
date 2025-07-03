# To-Do List Application

A full-stack To-Do List web app with secure authentication, request logging, and both user and admin interfaces.

## Features

* **User Authentication:** JWT-based signup and login, HTTP-only cookies for security.
* **CRUD Todos:** Create, read, update, and delete tasks via a RESTful API.
* **Request Logging:** Middleware logs every API call with timestamp and method.
* **Admin Dashboard:** Styled table view for auditing current user’s todos.
* **Responsive UI:** Modern design with vanilla HTML/CSS/JavaScript.

## Technologies

* **Backend:** Node.js, Express
* **Database:** MongoDB, Mongoose
* **Authentication:** bcryptjs, jsonwebtoken, cookie-parser
* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Development Tools:** nodemon, ESLint, Prettier, Git

## Prerequisites

* [Node.js](https://nodejs.org/) v14+ and npm
* [MongoDB Community Server](https://www.mongodb.com/) running locally on port 27017

## Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

## Configuration

* (Optional) Create a `.env` file to override defaults:

  ```ini
  JWT_SECRET=your_secret_key
  MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
  ```

## Running the App

* **Development mode** (auto-restarts):

  ```bash
  npm run dev
  ```
* **Production mode**:

  ```bash
  npm start
  ```

Open your browser at `http://localhost:5000` to access the application. Additional pages:

* **Register:** `/register.html`
* **Login:** `/login.html`
* **Admin Dashboard:** `/admin.html`

## API Endpoints

| Method | Endpoint             | Description                               |
| ------ | -------------------- | ----------------------------------------- |
| POST   | `/api/auth/register` | Register a new user                       |
| POST   | `/api/auth/login`    | Login and receive JWT cookie              |
| GET    | `/api/todos`         | Retrieve all todos for authenticated user |
| POST   | `/api/todos`         | Create a new todo                         |
| PATCH  | `/api/todos/:id`     | Update completion status of a todo        |
| DELETE | `/api/todos/:id`     | Delete a specific todo                    |

> All `/api/todos` routes require authentication and must include credentials (send cookies).

## Project Structure

```
├── src/
│   ├── app.js           # Server entry point and middleware
│   ├── models/
│   │   ├── User.js      # User schema
│   │   └── Todo.js      # Todo schema
│   ├── routes/
│   │   ├── auth.js      # Authentication routes
│   │   └── todos.js     # CRUD routes for todos
│   ├── services/
│   │   └── logger.js    # Request logging middleware
│   └── public/
│       ├── index.html   # Main UI
│       ├── register.html
│       ├── login.html
│       ├── admin.html
│       ├── style.css
│       ├── script.js
│       └── admin.js
├── logs/
│   └── requests.log     # Recorded HTTP requests
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Contributing

Contributions and feature requests are welcome. Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
