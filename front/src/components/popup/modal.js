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
  background-color: white;
  border: 1px solid black;
  & header {
    margin-top: 35px;
    font-weight: 600;
  }
  & main {
    line-height: 35px;
    margin-top: 35px;
    & span:first-child {
      font-weight: 600;
      color: blue;
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
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
`
const Modal = ({ open, close }) => {
  const [likeUser, setLikeUser] = useState([]);
  useEffect(() => {
    Api.get("users/maxlike").then((res) => setLikeUser(res.data));
  }, []);
  
  return (
    <div className={open ? 'openModal modals' : 'modals'}>
      {open ? (
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
            <button className="close" onClick={close}>닫기</button>
            <button className="closeToday" onClick={close}>오늘 하루 그만 보기</button>
          </div>
        </ModalBox>
      ) : null}
    </div>
  );
};

export default Modal;
