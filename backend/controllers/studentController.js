const Student = require("../models/student");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateAdmissionNumber = async () => {
  const lastStudent = await Student.findOne().sort({ admissionNumber: -1 });
  const lastNumber = lastStudent
    ? parseInt(lastStudent.admissionNumber, 10)
    : 1000;
  return (lastNumber + 1).toString();
};

// API to fetch next available admission number
exports.getNextAdmissionNumber = async (req, res) => {
  try {
    const admissionNumber = await generateAdmissionNumber();
    res.json({ admissionNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const admissionNumber = await generateAdmissionNumber();
    const student = new Student({
      ...req.body,
      admissionNumber,
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload Student Photo to Cloudinary

exports.uploadStudentPhoto = async (req, res) => {
  try {
    const file = req.body.image; // Expect base64 string
    if (!file) return res.status(400).json({ error: "No image provided" });

    const result = await cloudinary.uploader.upload(file, {
      folder: "student_photos",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated student
      runValidators: true, // Ensure validation rules are applied
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted successfully" });
};
