import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as dateFns from "date-fns";
import * as Api from "../../api";

const ProjectCard = ({ setIsEditing, isEditable, project, setProjects }) => {
  const handleDelete = async () => {
    try {
      await Api.delete("projects", project.projectId);
      const res = await Api.get("projects", project["userId"]);
      setProjects(res.data);
    } catch (err) {
      console.log("삭제가 정상적으로 이루어지지 않았습니다.", err);
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
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              Edit
            </Button>{" "}
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
