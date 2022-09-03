import React from "react";
import * as Api from "../../api";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as dateFns from "date-fns";

function CertificateCard({
  certificate,
  setIsEditing,
  isEditable,
  getCertificates,
}) {
  // const t = new Date(certificate.acquiredAt);
  // const time_text = t.toISOString().split("T")[0];
  const handleDelete = async () => {
    try {
      await Api.delete("certificates", certificate.certificateId);
      const res = await Api.get("certificates", certificate["userId"]);
      getCertificates(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted"> {dateFns.format(new Date(certificate.acquiredAt), "yyyy-MM-dd")}</span>
        </Col>

        {isEditable && (
          <Col xs lg="2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
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
}

export default CertificateCard;
