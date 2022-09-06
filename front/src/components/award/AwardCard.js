import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Swal from "sweetalert2";

const AwardCard = ({ award, setAward, setIsEditing, isEditable }) => {
  const handleDelete = async () => {
    try {
      Swal.fire ({
        icon: "warning",
        title: "정말 삭제하시겠습니까?",
        text: "삭제하면 다시 복구할 수 없습니다.",
        showCancelButton: true
      }).then(async (result) => {
        if(result.isConfirmed) {
          await Api.delete("awards", award.awardId);
          const res = await Api.get("awards", award.userId);
          setAward(res.data);
          Swal.fire ({
            title: "삭제가 완료되었습니다!",
            icon: "success"
          })
        }
      })
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Card.Text>
      <Row className="alert-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
          <br />
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

export default AwardCard;
