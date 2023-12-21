import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';

const SentMessage = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const token = authState.token;
  const headers = { headers: { authorization: token } };
  const [mitem,setMitem]=useState('');

  useEffect(()=>{
    //make an api call for receive messages
    const fetch = async () => {
        const response = await axios.get(
          `http://localhost:5000/email/sent`,headers
        );
        console.log(response);
        setMitem(response.data.messages)
      };
      fetch();
      console.log(mitem);
  },[])
  const messageDetailHandler=(e)=>{
    e.preventDefault();
    dispatch(setMessageDetailReceive());
    navigate(`/message/${props.message.id}`);
  }
  return (
    <div>
      {mitem && mitem.length>0 && mitem.map(m=><Message onClick={messageDetailHandler} key={m.id} message={m}/>)}
    </div>
  )
}

export default SentMessage