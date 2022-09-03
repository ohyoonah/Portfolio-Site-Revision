import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [imageUploaded, setImageUploaded] = useState(user.imageUploaded);
  const [defaultImage, setDefaultImage] = useState(false);

  //useState로 password 상태를 생성함.
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const upload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await Api.upload("user/upload", `${user.id}`, formData);
    const imageUpload = await res;

    await setImageUploaded(imageUpload);
  };

  function handleChange(e) {
    const { name, value } = e.currentTarget;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = passwordForm.password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = passwordForm.password === passwordForm.confirmPassword;

  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      ...passwordForm,
      description,
      imageUploaded,
      defaultImage,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form.Group
          controlId="formFile"
          className="mb-1"
          encType="multipart/form-data"
        >
          <Form.Label>프로필 이미지</Form.Label>
          <Form.Control type="file" onChange={(e) => upload(e)} />
        </Form.Group>
        <Form.Group controlId="formCheckbox" className="mb-3">
          <Form.Check
            onChange={(e) => {
              setDefaultImage(!!e.target.value);
              setImageUploaded(false);
            }}
            type="checkbox"
            id={"default-checkbox"}
            label={"기본 프로필 이미지로 전환"}
          />
        </Form.Group>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <Form.Text className="text-success">
                이메일 형식이 올바르지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="userEditPassword" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="비밀번호"
              value={passwordForm.password}
              onChange={handleChange}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 4글자 이상으로 설정해 주세요.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="userEditConfirmPassword" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
            />
            {!isPasswordSame && (
              <Form.Text className="text-success">
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                disabled={!isFormValid}
              >
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
