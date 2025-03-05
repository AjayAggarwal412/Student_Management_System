import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  Button,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleShowModal = (id) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentToDelete(null);
  };

  const handleDelete = async () => {
    if (!studentToDelete) return;

    try {
      await axios.delete(`/api/students/${studentToDelete}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentToDelete)
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting student:", error);
    }

    handleCloseModal();
  };

  const allClasses = [
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
  ];
  const allSections = ["A", "B", "C", "D"];

  // Handle filtering based on user selection
  useEffect(() => {
    let filtered = students;

    if (selectedClass) {
      filtered = filtered.filter((student) => student.class === selectedClass);
    }

    if (selectedSection) {
      filtered = filtered.filter(
        (student) => student.section === selectedSection
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((student) =>
        `${student.firstName} ${student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, selectedClass, selectedSection, students]);

  return (
    <Container>
      {/* Title and Add Student Button */}
      <Row className="align-items-center my-3">
        <Col xs={12} md={6}>
          <h2>Student List</h2>
        </Col>
        <Col xs={12} md={6} className="text-md-end text-center mt-2 mt-md-0">
          <Link to="/add-student">
            <Button variant="primary">Add Student</Button>
          </Link>
        </Col>
      </Row>

      {/* Filters Section */}
      <Row className="mb-4">
        <Col xs={12} md={2} className="mb-2">
          <Form.Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-100"
          >
            <option value="">All Classes</option>
            {allClasses.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={2} className="mb-2">
          <Form.Select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-100"
          >
            <option value="">All Sections</option>
            {allSections.map((sectionItem) => (
              <option key={sectionItem} value={sectionItem}>
                {sectionItem}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={12} md={2} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
        </Col>
      </Row>

      {/* Student Table */}
      <Table hover bordered responsive="sm">
        <thead>
          <tr>
            <th>Admission Number</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.admissionNumber}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <Link
                    to={`/student/${student._id}`}
                    className="text-decoration-none text-primary"
                  >
                    {`${student.firstName} ${student.lastName}`}
                  </Link>
                </td>
                <td>{student.class}</td>
                <td>{student.section || "N/A"}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Link to={`/edit-student/${student._id}`}>
                    <Button variant="warning" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleShowModal(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
