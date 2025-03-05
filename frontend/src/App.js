import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import Home from "./pages/Home.js";
import StudentForm from "./components/StudentForm.js";
import EditStudent from "./components/EditStudent.js";
import StudentDetail from "./components/StudentDetail.js";

const App = () => {
  return (
    <Router>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand>Student Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/add-student">
                Add Student
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
          <Route path="/student/:id" element={<StudentDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
