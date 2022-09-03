import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom';
import * as Api from "../../api";

const Modal = (props) => {
  const { open, close, header,portfolioOwnerId } = props;
  const [likeUser, setLikeUser] = useState([]);
  useEffect(() => {
    Api.get("users/maxlike").then((res) => setLikeUser(res.data));
  }, []);
  
  return (
    <div className={open ? 'openModal modals' : 'modals'}>
      {open ? (
        <section style={customStyles}>
          <header style={{fontSize:'25px'}}>
            {header }
            <button className="close" onClick={close} style={buttonStyles}>&times;</button>
          </header>
          <main style={{fontSize:'20px',marginTop: '15px',color:'#0d6efd'}}>{likeUser[0]?.name}님 축하드립니다!!</main>
        </section>
      ) : null}
    </div>
  );
};
const customStyles = {
 
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  width: "300px",
  height: "200px",
  position: "fixed",
  zIndex: "99",
  top: "0",
  textAlign: "center",
  paddingTop: "3%",
  transform: "translateX(-50%)",
  border: "3px solid",

};
const buttonStyles = {
  right: "0",
  top: "-1px",
  position: "absolute",
  width: "30px",
  fontSize: "15px",
  border: "none",
};

export default Modal;
