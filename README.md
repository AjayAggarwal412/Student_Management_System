# Student Management System

A **MERN (MongoDB, Express, React, Node.js)** based Student Management System that allows users to add, edit, delete, and view student details.

## 🚀 Features
- Add new students with details
- View a list of all students
- Edit student details
- Delete student records
- Auto-generate admission number
- Upload student photos using **Cloudinary**

## 🛠️ Technologies Used
### Frontend:
- **React.js** (with React-Bootstrap for UI)
- **Axios** for API requests
- **React Router** for navigation

### Backend:
- **Node.js & Express.js** (REST API)
- **MongoDB & Mongoose** (Database)
- **Cloudinary** (Image Uploads)

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/student-management.git
cd assignment
```

### 2️⃣ Backend Setup (Server)
```bash
cd backend
npm install
```

#### Create a **.env** file inside the `backend` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Run Backend Server:
```bash
npm start
```

---

### 3️⃣ Frontend Setup (React App)
```bash
cd ../frontend
npm install
```

### Run Frontend:
```bash
npm start
```

---

## 🔗 API Endpoints
| Method | Endpoint                  | Description               |
|--------|--------------------------|---------------------------|
| GET    | `/api/students`          | Fetch all students       |
| GET    | `/api/students/:id`      | Get student by ID        |
| POST   | `/api/students`          | Add a new student        |
| PUT    | `/api/students/:id`      | Update student details   |
| DELETE | `/api/students/:id`      | Delete a student         |
| POST   | `/api/students/upload`   | Upload student photo     |

---

## 🎯 Usage
- **Navigate to `http://localhost:3000/`**
- Click **"Add New Student"** to enter student details
- View student list on the home page
- Click **"Edit"** to update a student’s details
- Click **"Delete"** to remove a student from the list

---

## 🖼️ Screenshots
![image](https://github.com/user-attachments/assets/26b420da-64d6-4fab-8961-46ff8f14fe6c)

![image](https://github.com/user-attachments/assets/841c7da4-f46f-4e6f-9890-e370ca3adba7)

![image](https://github.com/user-attachments/assets/014a000b-b176-4cb6-af88-5096db4595fb)

![image](https://github.com/user-attachments/assets/09fd25d5-795c-412c-a02e-24f6f41fa81b)

![image](https://github.com/user-attachments/assets/a60710fb-7648-42b4-b38d-cdcaecd0041a)


---


### 📩 Contact
For any queries, reach out to **ajayaggarwal412@gmail.com**.

