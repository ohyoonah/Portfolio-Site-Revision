import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Api from "../../api";
import * as Util from "../../util";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [form, setForm] = useState({
    school: '',
    major: '',
    position: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!Util.handleCheck(form)) {
      return false;
    }

    const userId = portfolioOwnerId;
    try {
      await Api.post("education/create", {
        userId,
        ...form,
      });
      const res = await Api.get("educations", userId);
      setEducations(res.data);
      setIsAdding(false);
    } catch (err) {
      console.log("추가가 정상적으로 이루어지지 않았습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool">
        <Form.Control
          type="text"
          placeholder="학교"
          name="school"
          value={form.school}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicSchool" className="mt-3">
        <Form.Control
          type="text"
          name="major"
          placeholder="전공"
          value={form.major}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicStatus" className="mb-3 mt-3 text-center">
        <Form.Check
          inline
          label="재학중"
          name="position"
          type="radio"
          id="radio1"
          value="재학중"
          checked={form.position === "재학중"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="학사졸업"
          name="position"
          type="radio"
          id="radio2"
          value="학사졸업"
          checked={form.position === "학사졸업"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="석사졸업"
          name="position"
          type="radio"
          id="radio3"
          value="석사졸업"
          checked={form.position === "석사졸업"}
          onChange={handleChange}
        />
        <Form.Check
          inline
          label="박사졸업"
          name="position"
          type="radio"
          id="radio4"
          value="박사졸업"
          checked={form.position === "박사졸업"}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 mb-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
