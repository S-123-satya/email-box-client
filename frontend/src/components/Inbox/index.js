import React, { useEffect, useState } from 'react'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { receiveMessage, setMessageDetailReceive } from '../../store';

const Inbox = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = authState.token;
  const headers = { headers: { authorization: token } };
  const navigate=useNavigate();
const [mitem,setMitem]=useState('');
  useEffect(()=>{
    //make an api call for receive messages
    const fetch = async () => {
        const response = await axios.get(
          `http://localhost:5000/email`,headers
        );
        console.log(response);
        console.log(response.data.messages[0].message);
        response.data.messages.map(m=>dispatch(receiveMessage({...m})))
        setMitem(response.data.messages)
      
      };
      fetch();
      console.log(mitem);
  },[])
  const messageDetailHandler=async(message)=>{
    dispatch(setMessageDetailReceive());
    const response = await axios.put(
      `http://localhost:5000/email`,{...message,readStatus:true},headers
    );
    dispatch(messageRead({id:message.id}));
    navigate(`/message/${message.id}`);
  }
  return (
    <div>
      {mitem && mitem.length>0 && mitem.map(m=><Message onClick={messageDetailHandler.bind(null,m)} key={m.id} message={m}/>)}
    </div>
  )
}

export default Inbox