import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef ,Fragment} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import {backendPort} from "../config" 
// import socketIO from 'socket.io-client'
const Chat = () => {
  // const socket = useRef(null);
  // const navigate = useNavigate()
  // const newSocket = socketIO.connect();
  // console.log(newSocket,"new socket")
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const socket = useRef()

console.log(backendPort,"blnd port")

  useEffect(() => {
    socket.current = io('ws://localhost:4001')
  }, [])
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await JSON?.parse(localStorage?.getItem("chat-app-user"));
      setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", currentUser?._id);
    socket.current.on("getUsers",(users)=>{
      console.log(users,"See here")
    })
  }, [currentUser]);



  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (currentUser) {
          const data = await axios.get(`${allUsersRoute}/${currentUser?._id}`);
          setContacts(data);
        } else {
          return;
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchContacts();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts?.data?.users}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

export default Chat;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
