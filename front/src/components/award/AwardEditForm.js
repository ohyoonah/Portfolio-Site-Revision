import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import * as Util from "../../util";

function AwardEditForm({ currentAward, setAward, setIsEditing }) {
  // 수상 & 내용
  const [form, setForm] = useState(currentAward);

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!Util.handleCheck(form)) {
      return false;
    }


    //try~catch
    try {
      // 수정해서 보내기
      
      await Api.put(`awards/${currentAward.awardId}`, {
        ...form,
      });

      const award = {
        awardId: currentAward.awardId,
        ...form,
      };

      await setAward((prev) =>
        prev.map((el) => (el.awardId === award.awardId ? award : el))
      );

      setIsEditing(false);
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
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
