import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable }) {
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  function getAwards(data) {
    setAwards(data);
  }

  useEffect(() => {
    Api.get("awards", portfolioOwnerId).then((res) => getAwards(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>수상</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.awardId}
            Award={award}
            setAward={setAwards}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAward={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
