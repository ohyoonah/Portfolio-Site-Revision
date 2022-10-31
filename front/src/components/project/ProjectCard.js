import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as dateFns from "date-fns";
import * as Api from "../../api";
import Swal from "sweetalert2";

const ProjectCard = ({ setIsEditing, isEditable, project, setProjects }) => {
  const handleDelete = async () => {
    try {
      Swal.fire({
        icon: "warning",
        title: "정말 삭제하시겠습니까?",
        text: "삭제하면 다시 복구할 수 없습니다.",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Api.delete("projects", project.projectId);
          const { data } = await Api.get("projects", project["userId"]);
          setProjects(data);
          Swal.fire({
            title: "삭제가 완료되었습니다!",
            icon: "success",
          });
        }
      });
    } catch (err) {
      console.error("삭제가 정상적으로 이루어지지 않았습니다.", err);
    }
  };

  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {dateFns.format(new Date(project.startDate), "yyyy-MM-dd")} ~{" "}
            {dateFns.format(new Date(project.endDate), "yyyy-MM-dd")}
          </span>
        </Col>
        {isEditable && (
          <Col xs lg="2">
            <Button
              className="me-2"
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
};

export default ProjectCard;
