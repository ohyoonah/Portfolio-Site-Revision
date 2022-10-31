import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styled from "styled-components";

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
  .like {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    .likeCount{
      margin-left: 18px;
      font-size: 12px;
    }
  }
`

const CardBottom = styled.div`
  position: absolute;
  bottom: 20px;
`

const UserCard = ({ user, setIsEditing, isEditable, isNetwork }) => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(user?.likeCount || 0);

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }

    if (isNetwork && user?.like.length > 0) {
      setLike(true);
    }
  }, []);

  const handleLike = async (e) => {
    e.preventDefault();

    let res;
    if (!like) {
      res = await Api.post("like", {
        userId: user.id,
      });
      setLike(true);
    } else {
      res = await Api.delete("unlike", user.id);
      setLike(false);
    }
    const updatedUser = await res.data;
    setLikeCount(updatedUser.likeCount);
  };


  const handleCount = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`users/${user.id}`, {
        viewCount: 1,
      });

      navigate(`/users/${user.id}`);
    } catch (e) {
      
      console.log(e);
    }
  };

  function view (count) {
    if (count > 1) {
      return `views ${count}`
    }
    else if (count ===1 ) {
      return `view ${count}`
    }
    else{
      return;
    }

  }

  return (
    <Card className="mb-5 ms-3 me-3 mr-5" style={{ width: "18rem", height: "24rem" }}>
      <Card.Body>
        <CardTop>
          <Card.Text className="view text-muted" style={{ fontSize: "12px"}}>
            {view(user?.viewCount)}
          </Card.Text>
          <Row className="like">
            {isNetwork && user?.id !== userState.user.id && (
                <Card.Link
                  href="#"
                  className="ms-2 me-4 mt-1"
                  style={{ textDecoration: "none", fontSize: "20px" }}
                  onClick={(e) => {
                    handleLike(e);
                  }}
                >
                  {like ? "🧡" : "🤍"}
                </Card.Link>
              )}
              <Card.Text className="me-3 text-muted likeCount">{likeCount ? likeCount : user?.likeCount}</Card.Text>
          </Row>
        </CardTop>
        <Row className="justify-content-md-center">
          {user?.imageUploaded ? (
            <Card.Img
              style={{ width: "12rem", height: "9rem" }}
              className="mb-3 mt-2"
              src={`${Api.serverUrl}image/${user.id}`}
              alt="나만의 프로필"
            />
          ) : (
            <Card.Img
              style={{ width: "12rem", height: "9rem" }}
              className="mb-3 mt-2"
              src="http://placekitten.com/200/200"
              alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
            />
          )}
        </Row>
        <Card.Title className="mb-2">
          {user?.name}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text className="mb-3">{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        <CardBottom>
          {isNetwork && (
            <Card.Link
              className="text-decoration-none"
              href="#"
              onClick={(e) => handleCount(e)}
            >
              포트폴리오
            </Card.Link>
          )}
        </CardBottom>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
