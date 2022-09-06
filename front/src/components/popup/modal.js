import React,{useState,useEffect} from 'react';
import * as Api from "../../api";
import styled from "styled-components";

const ModalBox = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  // position absolute 사용 시 화면 중앙 정렬
  transform:translate(-50%, -50%);
  width: 500px;
  height: 300px;
  text-align: center;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: ${({ theme }) => theme.borderColor};
  & header {
    margin-top: 35px;
    font-weight: 600;
  }
  & main {
    line-height: 35px;
    margin-top: 35px;
    & span:first-child {
      font-weight: 600;
      color: ${({ theme }) => theme.pointColor};
      font-size: 25px;
    }
  }
  & div {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    & button.close {
      margin: 0 auto;
      width: 80%;
      height: 50px;
      margin-top: 30px;
      background: #7575fd;
      color: white;
      border: none;
      &:hover {
        background: #6262f9;
      }
    }
    & button.closeToday {
      margin-top: 10px;
      background: none;
      border: none;
      color: ${({ theme }) => theme.textColor};
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
`
const Modal = () => {
  const [likeUser, setLikeUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(true);

  const VISITED_BEFORE_DATE = window.localStorage.getItem("VisitedBeforeDate");
  const VISITED_TODAY = new Date().getDate();

  console.log(VISITED_BEFORE_DATE);
  console.log(VISITED_TODAY);

  useEffect(() => {
    Api.get("users/maxlike").then((res) => setLikeUser(res.data));

    if (VISITED_BEFORE_DATE !== null) {
      if (VISITED_BEFORE_DATE === VISITED_TODAY) {
          window.localStorage.removeItem("VisitedBeforeDate")
          setModalOpen(true)
      }
      if (VISITED_BEFORE_DATE !== VISITED_TODAY) {
        setModalOpen(false)
      }
    }
  }, [VISITED_BEFORE_DATE]);

  const dayClose = () => {
    setModalOpen(false);
    window.localStorage.setItem("VisitedBeforeDate", new Date().getDate() + 1);
  }
  
  return (
    <>
      {modalOpen ? (
        <ModalBox>
          <header style={{fontSize:'25px'}}>
            🎉 오늘의 베스트 포트폴리오🎉
          </header>
          <main>
            <span>
              {likeUser[0]?.name}
            </span>
            <span>
              님 축하드립니다!! <br/>
              좋아요를 가장 많이 받으셨습니다 ❤
            </span>
          </main>
          <div>
            <button className="close" onClick={() => setModalOpen(false)}>닫기</button>
            <button className="closeToday" onClick={dayClose}>오늘 하루 그만 보기</button>
          </div>
        </ModalBox>
      ) : null}
    </>
  );
};

export default Modal;
