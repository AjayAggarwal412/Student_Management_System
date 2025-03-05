const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  admissionNumber: { type: String, required: true },
  rollNumber: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  class: {
    type: String,
    enum: [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
    ],
    required: true,
  },
  section: { type: String },
  session: {
    type: String,
    enum: [
      "2017-2018",
      "2018-2019",
      "2019-2020",
      "2020-2021",
      "2021-2022",
      "2022-2023",
      "2023-2024",
      "2024-2025",
    ],
    required: true,
  },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  permanentAddress: { type: String, required: true },
  addressForCorrespondence: { type: String },
  contactNumber: { type: String, required: true },
  alternateContactNumber: { type: String },
  email: { type: String },
  nationality: {
    type: String,
    enum: ["Indian", "American", "British", "Canadian", "Australian"],
    required: true,
  },
  religion: {
    type: String,
    enum: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"],
  },
  category: {
    type: String,
    enum: ["General", "OBC", "SC", "ST", "EWS"],
    required: true,
  },
  dateOfAdmission: { type: Date, required: true, default: Date.now }, // Default set to current date
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  studentPhoto: { type: String }, // URL or base64 image
  aadharNumber: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
