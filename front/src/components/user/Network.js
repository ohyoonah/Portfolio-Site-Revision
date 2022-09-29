import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";
import Modal from "../popup/modal";
import Pagination from "./Pagination";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState({
    page: 1,
    perPage: 12,
    totalUser: 20,
  });

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    const getUserList = async () => {
      try {
        const { data } = await Api.get(
          `userlist?page=${count.page}&perPage=${count.perPage}`
        );
        setUsers(data.users);
        setCount({ ...data, totalUser: data.totalPage });
      } catch (err) {
        console.log(err);
      }
    };
    getUserList();
  }, [userState, navigate, count.page]);

  return (
    <>
      <Modal />
      <Container>
        <Row xs="auto" className="jusify-content-center ms-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} isNetwork />
          ))}
        </Row>
        <Pagination
          total={count.totalUser}
          perPage={count.perPage}
          page={count.page}
          setCount={setCount}
        />
      </Container>
    </>
  );
}

export default Network;
