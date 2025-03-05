const express = require("express");
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  uploadStudentPhoto,
  getNextAdmissionNumber,
  getStudentById,
} = require("../controllers/studentController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getStudents);
router.get("/next-admission-number", getNextAdmissionNumber); // Route to fetch next admission number
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

// Image Upload Route
router.post("/upload", uploadStudentPhoto);

module.exports = router;
