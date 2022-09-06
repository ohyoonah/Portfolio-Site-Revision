import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import * as Api from "../../api";
import Swal from "sweetalert2";

const EducationCard = ({education, isEditable, setEducations, setIsEditing}) => {
  const handleDelete = async () => {
    try {
      Swal.fire ({
        icon: "warning",
        title: "정말 삭제하시겠습니까?",
        text: "삭제하면 다시 복구할 수 없습니다.",
        showCancelButton: true
      }).then(async (result) => {
        if(result.isConfirmed) {
          await Api.delete("educations", education.eduId);
          const res = await Api.get("educations", education["userId"]);
          setEducations(res.data);
          Swal.fire ({
            title: "삭제가 완료되었습니다!",
            icon: "success"
          })
        }
      })
    } catch (err) {
      console.log("삭제가 정상적으로 이루어지지 않았습니다.", err);
    }
  };

  return (
    <Card.Text key={education.eduId}>
      <Row className="alert-items-center">
        <Col>
          <span>{education.school}</span>
          <br/>
          <span className="text-muted">
            {education.major} ( {education.position} )
          </span>
          <br/>
        </Col>
        {isEditable && (
          <Col xs lg="2">
            <Button
              className="me-2"
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >Edit</Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleDelete()}
            >Delete</Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;