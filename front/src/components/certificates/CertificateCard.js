import React from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import * as dateFns from "date-fns";
import Swal from "sweetalert2";

const CertificateCard = ({ certificate, setIsEditing, isEditable, getCertificates }) => {
  const handleDelete = async () => {
    try {
      Swal.fire ({
        icon: "warning",
        title: "정말 삭제하시겠습니까?",
        text: "삭제하면 다시 복구할 수 없습니다.",
        showCancelButton: true
      }).then(async (result) => {
        if(result.isConfirmed) {
          await Api.delete("certificates", certificate.certificateId);
          const res = await Api.get("certificates", certificate["userId"]);
          getCertificates(res.data);
          Swal.fire ({
            title: "삭제가 완료되었습니다!",
            icon: "success"
          })
        }
      })
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
              className="me-2"
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
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

export default CertificateCard;
