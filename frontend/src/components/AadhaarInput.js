import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

const AadhaarInput = ({ value, onChange }) => {
  const [aadharParts, setAadharParts] = useState(["", "", ""]);

  const handleAadharChange = (index, e) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 4);
    const newAadharParts = [...aadharParts];
    newAadharParts[index] = newValue;
    setAadharParts(newAadharParts);

    // Concatenate the Aadhaar number
    onChange(newAadharParts.join(" "));

    // Move to next input box if 4 digits are entered
    if (newValue.length === 4 && index < 2) {
      document.getElementById(`aadhar-${index + 1}`).focus();
    }
  };

  return (
    <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Aadhaar Number</Form.Label>
          <div className="d-flex gap-2">
            {aadharParts.map((part, index) => (
              <Form.Control
                placeholder="0000"
                key={index}
                id={`aadhar-${index}`}
                type="text"
                value={part}
                onChange={(e) => handleAadharChange(index, e)}
                maxLength={4}
                className="text-center"
              />
            ))}
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default AadhaarInput;
