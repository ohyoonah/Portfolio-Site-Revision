import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";
import * as Util from "../../util";

function CertificateAddForm({
  portfolioOwnerId,
  setIsAdding,
  getCertificates,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    acquiredAt: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
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
      await Api.post("certificate/create", {
        userId,
        ...form,
      });

      const res = await Api.get("certificates", userId);
      getCertificates(res.data);
      setIsAdding(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내용"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={form.acquiredAt}
            onChange={(acquiredAt) => setForm({ ...form, acquiredAt })}
            value={form.acquiredAt}
            name="acquiredAt"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
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
export default CertificateAddForm;
