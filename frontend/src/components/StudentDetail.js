import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return (
      <Container className="mt-4 text-center">
        <h2>Loading student details...</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <Row className="align-items-center">
          {/* Left side - Student Image */}
          <Col md={4} className="text-center">
            <h3 className="mb-5">
              {student.firstName} {student.lastName}
            </h3>
            <Image
              src={student.studentPhoto}
              alt="Student_Photo"
              rounded
              fluid
              style={{ width: "100%", maxWidth: "250px", height: "auto" }}
            />
          </Col>

          {/* Right side - Student Details */}
          <Col md={4}>
            {/* <h2 className="mb-3">
              {student.firstName} {student.lastName}
            </h2> */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Admission Number:</strong> {student.admissionNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Roll Number:</strong> {student.rollNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Class:</strong> {student.class}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Section: </strong> {student.section || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Gender: </strong> {student.gender}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email: </strong> {student.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Father's Name:</strong> {student.fatherName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Father's Occupation:</strong> {student.fatherOccupation}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mother's Name:</strong> {student.motherName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Mother's Occupation:</strong> {student.motherOccupation}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Date of Birth:</strong>{" "}
                {new Date(student.dateOfBirth).toLocaleDateString()}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className="">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Date of Admission:</strong>
                {new Date(student.dateOfAdmission).toLocaleDateString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Blood Group:</strong> {student.bloodGroup}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Permanent Address:</strong> {student.permanentAddress}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Correspondence Address: </strong>
                {student.addressForCorrespondence}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Contact Number: </strong>
                {student.contactNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Alternate Contact Number: </strong>
                {student.alternateContactNumber}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Nationality: </strong>
                {student.nationality}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category: </strong>
                {student.category}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Religion: </strong>
                {student.religion}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Aadhar Number: </strong>
                {student.aadharNumber}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default StudentDetail;
