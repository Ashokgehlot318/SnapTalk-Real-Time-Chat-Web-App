import axios from 'axios'
import React, { useEffect } from 'react'

const ChatPage = () => {



    useEffect(()=>{
        const chatsData = async () =>{
            const {data} = await axios.get('api/chat');
            console.log(data)
        }
        chatsData();
    },[]);

  return (
    <div>
      Chat Page
    </div>
  )
}

export default ChatPage
