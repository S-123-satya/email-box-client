import React, { useEffect, useState } from 'react'
import InboxMessage from '../InboxMessage'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import htmlToDraft from 'html-to-draftjs';

const Inbox = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = authState.token;
  const headers = { headers: { authorization: token } };
const [mitem,setMitem]=useState('');
  useEffect(()=>{
    //make an api call for receive messages
    const fetch = async () => {
        const response = await axios.get(
          `http://localhost:5000/email`,headers
        );
        console.log(response);
        console.log(response.data.messages[0].message);
        // setMitem(htmlToDraft(response.data.messages[0].message));
        setMitem(response.data.messages)
      
      };
      fetch();
      console.log(mitem);
  },[])
  return (
    <div>
      {mitem && mitem.length>0 && mitem.map(m=><InboxMessage message={m}/>)}
    </div>
  )
}

export default Inbox