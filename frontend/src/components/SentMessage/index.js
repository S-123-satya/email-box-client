import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import { useNavigate } from 'react-router-dom';
import { sendMessage, unSetMessageDetailReceive } from '../../store';

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
    const fetch = async (id) => {
        const response = await axios.get(
          `http://localhost:5000/email/sent/${id}`,headers
        );
        console.log(response);
        response.data.messages.map(m=>dispatch(sendMessage({...m})))
        setMitem(response.data.messages)
      };
      let len = emailState.sentMessages.length;
      let id = len==0?0:emailState.sentMessages[len - 1].id;
      fetch(id);
      console.log(mitem);
  },[])
  const messageDetailHandler=(message)=>{
    dispatch(unSetMessageDetailReceive());
    navigate(`/message/${message.id}`);
  }
  return (
    <div>
      {emailState.sentMessages.length >0 && emailState.sentMessages.map(m=><Message onClick={messageDetailHandler.bind(null,m)} key={m.id} message={m}/>)}
    </div>
  )
}

export default SentMessage