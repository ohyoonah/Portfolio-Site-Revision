import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import * as Util from "../../util";

function AwardAddForm({ portfolioOwnerId, setAward, setIsAdding }) {
  // 수상 내역
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!Util.handleCheck(form)) {
      return false;
    }

    const Id = portfolioOwnerId;

    // try ~ catch로 오류보내기
    try {
      // 수상내역 추가해서 보내기
      await Api.post("award/create", {
        Id,
        ...form,
      });

      // 추가한 후 수상내역 새로 받아오기
      const res = await Api.get("awards", Id);
      setAward(res.data);
      setIsAdding(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAward">
        <Form.Control
          type="text"
          placeholder="제목"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formAward" className="mt-3">
        <Form.Control
          type="text"
          placeholder="설명"
          name="description"
          value={form.description}
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

export default AwardAddForm;
