
# Password Manager

## Overview

This project is a secure and responsive Password Manager application that allows users to store, manage, and retrieve passwords for different websites. The application is built using React for the frontend and Node.js with Express and MongoDB for the backend.

## Features

### Frontend (React)
1. **Responsive Design:** The application is designed to work seamlessly across various devices.
2. **Password Management:** Users can add, edit, delete, and view passwords.
3. **Show/Hide Password:** Users can toggle the visibility of their passwords.
4. **Copy to Clipboard:** Users can copy passwords and other information to the clipboard.
5. **Real-time Notifications:** Toast notifications for user actions like saving, deleting, or copying passwords.

### Backend (Node.js and Express)
1. **RESTful API:** Provides endpoints for getting, saving, and deleting passwords.
2. **Database:** Uses MongoDB to store password data securely.
3. **CORS Support:** Allows cross-origin requests from the frontend application.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/password-manager.git
    cd password-manager
    ```

2. **Install dependencies for the backend:**
    ```sh
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**
    ```sh
    cd frontend
    npm install
    ```

### Setup Environment Variables

1. Create a `.env` file in the `backend` directory and add the following:
    ```sh
    MONGO_URI=mongodb://localhost:27017/passop
    PORT=3000
    ```

### Running the Application

1. **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2. **Start the frontend development server:**
    ```sh
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

```sh
password-manager/
├── backend/
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── .env
│   └── package.json
└── README.md
```

## API Endpoints

### Get All Passwords

- **URL:** `/`
- **Method:** `GET`
- **Response:** Returns an array of all stored passwords.

### Save a Password

- **URL:** `/`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "site": "example.com",
        "username": "user123",
        "password": "pass123"
    }
    ```
- **Response:** Confirms the password has been saved.

### Delete a Password

- **URL:** `/`
- **Method:** `DELETE`
- **Body:**
    ```json
    {
        "id": "password_id"
    }
    ```
- **Response:** Confirms the password has been deleted.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.


## Acknowledgements

Thanks to all the open-source contributors who helped build the tools used in this project.

---

### Note: 

Customize the sections as needed and replace `yourusername` with your actual GitHub username in the clone URL.
