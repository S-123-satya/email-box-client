import React, { useEffect } from 'react'
import InboxMessage from '../InboxMessage'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const Inbox = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = authState.token;
  const headers = { headers: { authorization: token } };

  useEffect(()=>{
    //make an api call for receive messages
    const fetch = async () => {
        const response = await axios.get(
          `http://localhost:5000/email`,headers
        );
        console.log(response);
      };
      fetch();
  },[])
  return (
    <div>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
      <InboxMessage/>
    </div>
  )
}

export default Inbox