import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import AadhaarInput from "./AadhaarInput";

const EditStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const [student, setStudent] = useState({
    rollNumber: "",
    firstName: "",
    lastName: "",
    class: "",
    section: "",
    session: "",
    dateOfBirth: "",
    gender: "",
    permanentAddress: "",
    addressForCorrespondence: "",
    contactNumber: "",
    alternateContactNumber: "",
    email: "",
    nationality: "",
    religion: "",
    category: "",
    bloodGroup: "",
    dateOfAdmission: new Date().toISOString().split("T")[0],
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
  });

  useEffect(() => {
    // Fetch student data by ID
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(`/api/students/${id}`);

        setStudent({
          ...data,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          dateOfAdmission: data.dateOfAdmission
            ? data.dateOfAdmission.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSameAsPermanentChange = (e) => {
    setSameAsPermanent(e.target.checked);
    if (e.target.checked) {
      setStudent((prev) => ({
        ...prev,
        addressForCorrespondence: prev.permanentAddress,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/students/${id}`, student);
      setShowToast(true);
      // alert("Student details updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <>
      <Container>
        <h2 className="my-3">Edit Student Detail</h2>
        <Form onSubmit={handleSubmit}>
          {/* First Row: Admission Number, Roll Number, First Name */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="rollNumber">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control
                  type="number"
                  name="rollNumber"
                  value={student.rollNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={student.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Second Row: Last Name, Class, Section */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={student.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="class">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  as="select"
                  name="class"
                  value={student.class}
                  onChange={handleChange}
                >
                  <option value="">Select Class</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={`${i + 1}th`}>
                      {i + 1}th
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="section">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  as="select"
                  name="section"
                  value={student.section}
                  onChange={handleChange}
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Third Row: Session, Date of Birth, Gender */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="session">
                <Form.Label>Session</Form.Label>
                <Form.Control
                  as="select"
                  name="session"
                  value={student.session}
                  onChange={handleChange}
                >
                  <option value="">Select Session</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = 2017 + i;
                    return (
                      <option key={year} value={`${year}-${year + 1}`}>
                        {year}-{year + 1}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={student.dateOfBirth}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Fourth Row: Address, Contact, Email */}
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="permanentAddress">
                <Form.Label>Permanent Address</Form.Label>
                <Form.Control
                  type="text"
                  name="permanentAddress"
                  value={student.permanentAddress}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={student.contactNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="addressForCorrespondence">
                <Form.Label>Address for Correspondence</Form.Label>
                <Form.Control
                  type="text"
                  name="addressForCorrespondence"
                  value={student.addressForCorrespondence}
                  onChange={handleChange}
                  disabled={sameAsPermanent}
                />
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Same as Permanent Address"
                checked={sameAsPermanent}
                onChange={handleSameAsPermanentChange}
              />
            </Col>
            <Col md={4}>
              <Form.Group controlId="AlternateContactNumber">
                <Form.Label>Alternate Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="alternateContactNumber"
                  value={student.alternateContactNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Fifth Row: Nationality, Category, Date of Admission */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="nationality">
                <Form.Label>Nationality</Form.Label>
                <Form.Control
                  as="select"
                  name="nationality"
                  value={student.nationality}
                  onChange={handleChange}
                >
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="American">American</option>
                  <option value="British">British</option>
                  <option value="Canadian">Canadian</option>
                  <option value="Australian">Australian</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="religion">
                <Form.Label>Religion</Form.Label>
                <Form.Control
                  as="select"
                  name="religion"
                  value={student.religion}
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* Sixth Row: Father's Name, Mother's Name, Student Photo */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="bloodGroup">
                <Form.Label>Blood Group</Form.Label>
                <Form.Control
                  as="select"
                  name="bloodGroup"
                  value={student.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={student.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="dateOfAdmission">
                <Form.Label>Date of Admission</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfAdmission"
                  value={student.dateOfAdmission}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="fatherName">
                <Form.Label>Father's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={student.fatherName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="fatherOccupation">
                <Form.Label>Father's Occupation</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherOccupation"
                  value={student.fatherOccupation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="motherName">
                <Form.Label>Mother's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="motherName"
                  value={student.motherName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="motherOccupation">
                <Form.Label>Mother's Occupation</Form.Label>
                <Form.Control
                  type="text"
                  name="motherOccupation"
                  value={student.motherOccupation}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <AadhaarInput
              value={student.aadharNumber}
              onChange={(value) =>
                setStudent({ ...student, aadharNumber: value })
              }
            />
          </Row>

          {/* Submit Button */}
          <Button type="submit" variant="success" className="mb-3">
            Update Student
          </Button>
        </Form>
        <ToastContainer position="top-center" className="p-5">
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            bg="success"
            delay={3000}
            autohide
          >
            <Toast.Body className="text-white">
              Student updated successfully!
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};

export default EditStudent;
