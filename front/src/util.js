const handleCheck = (form) => {
  if (Object.keys(form).length === 0 ) {
    alert('입력값을 확인하여 주십시오');
    return false;
  }
  let checkCnt = 0;
  Object.keys(form).map((k)=>{
    if(form[k].length < 1) {
      checkCnt ++;
      alert(`${k}의 값이 입력되지 않았습니다.`);
      return false;
    }
  })
  if (checkCnt === 0) {
    return true;
  }  else {
    return false;
  }
}

export { handleCheck };