import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from './AppHeader';
import Footer from './AppFooter';
import { ThreeDotsVertical } from "react-bootstrap-icons";
import socket from "../utils/socket";
import { useSelector } from 'react-redux';
import Loader from "./Loader";
import logonew from '../assets/footlogo.png';
import { Image } from "react-bootstrap";
import ChatAudioPlayer from "./AudioPlayer";
import bgimg from '../assets/bg_chat.jpg'
const ChatScreen = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState();
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);
  
  useEffect(() => {
    if (!isAuthenticated || !user) return;    
    const socketInstance = socket;
    setLoading(true);
    socketInstance.emit("register", user.user_id);
    socketInstance.emit("getChatRooms", user.user_id);
  
    socketInstance.on("chatRooms", (rooms) => {
      setChatRooms(rooms);
    });
  
    setLoading(false);
  
    return () => {
      return () => {
        socketInstance.disconnect();
      };
    };
  }, [selectedChatRoom, user?.user_id, isAuthenticated, user]);
  
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!selectedChatRoom || !user?.user_id) return;
      setChatLoading(true)
      try {
        const response = await fetch(
          `http://localhost:3000/api/get_chat?authUserId=${user.user_id}&otherUserId=${selectedChatRoom.otherUser.user_id}`, 
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        const result = await response.json();
  
        if (response.ok) {
          setChatMessages(result.data.chatMessages);          
        } else {
          console.error(result.message || "Failed to fetch chat messages");
          setChatMessages([]);
        }
      } catch (err) {
        console.error("Error fetching chat messages:", err);
        setChatMessages([]);
      } finally{
        setChatLoading(false)
      }
    };
  
    fetchChatMessages();
  }, [selectedChatRoom, user?.user_id, token, isAuthenticated, user]);
  
  const [input, setInput] = useState("");
  useEffect(() => {
    if (!isAuthenticated || !user) return;
  
    const socketInstance = socket;
  
    const handleNewMessage = (newMsg) => {
      if (
        selectedChatRoom &&
        (newMsg.sender_id === selectedChatRoom.otherUser.user_id ||
          newMsg.reciever_id === selectedChatRoom.otherUser.user_id)
      ) {
        setChatMessages((prev) => [...prev, newMsg]);
      }
    };
  
    socketInstance.on("newMessage", handleNewMessage);
  
    return () => {
      socketInstance.off("newMessage", handleNewMessage);
    };
  }, [selectedChatRoom, isAuthenticated, user]);
  
  const sendMessage = () => {
    if (input.trim() && selectedChatRoom) {
      const socketInstance = socket;
  
      const messageData = {
        authUserId: user.user_id,
        userId: selectedChatRoom.otherUser.user_id,
        message: input.trim(),
        type: 'text',
        file: null,
        fileType: '',
        file_name: '',
        ad_id: null,
        ad_name: null,
        status: 'send',
      };
  
      try {
        socketInstance.emit("sendMessage", messageData);
        setInput("");
      } catch (e) {
        console.error("Socket emit failed:", e);
      }
    }
  };
  
  const handleChatRoomClick = (chat)=>{
    setSelectedChatRoom(chat);
  }
  if (!isAuthenticated || !user) {
    return <Loader />;
  }
  
  return (
    <>
      <AppHeader />
      {(loading?<Loader/>:
        <div className="container mt-3" style={{ maxWidth: "1000px" }}>
          <div className="row border rounded shadow-sm" style={{ height: "700px", backgroundColor:'#4FBBB4', borderRadius:"25px" }}>
            <div className="col-md-4 border-end p-3" style={{ overflowY: "auto" }}>
              <h5 className="border-bottom" style={{color:'white', fontWeight:'bold'}}>Chats</h5>
              <ul className="list-group list-unstyled">
                {chatRooms.map((chat, index) => (
                <li key={chat.id} className="d-flex align-items-center p-2 border-bottom" style={{cursor:'pointer'}} onClick={()=>handleChatRoomClick(chat)}>
                  <img src={chat.otherUser.profile??'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} alt={chat.otherUser.name} className="rounded-circle me-2" width="40" height="40" />
                  <div>
                  <strong style={{color:'white'}}>{chat.otherUser.name}</strong>
                  <p className="small text-muted mb-0" style={{color:'#FFFFFF'}}>{chat.otherUser.description}</p>
                  </div>
                </li>
                ))}
              </ul>
            </div>     
            <div 
              className={"col-md-8 d-flex flex-column"}
              style={{
                backgroundColor: selectedChatRoom ? '#4FBBB4' : 'grey',
                backgroundImage: `url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              // style={{backgroundColor: selectedChatRoom? '#4FBBB4': 'grey', background:''}}
            > 
              {(chatLoading?
                <>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-2 pt-3 mb-2">
                    <div className="d-flex align-items-center">
                    <img src={selectedChatRoom.otherUser.profile??'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} alt="User" className="rounded-circle me-2" width="40" height="40" />
                    <div>
                      <strong style={{color:'white', fontWeight:'bold'}}>{selectedChatRoom.otherUser.name}</strong>
                      <p className="small text-muted mb-0">{selectedChatRoom.otherUser.description}</p>
                    </div>
                    </div>
                    <ThreeDotsVertical size={20} className="cursor-pointer" />
                  </div>
                  <div className="flex-grow-1 overflow-auto mb-2" style={{ maxHeight: "530px" }}></div>
                  <div className="input-group" style={{ height: "50px"}}>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="btn" style={{backgroundColor:'#FFDA3F', color:"white"}} onClick={sendMessage}>Send</button>
                  </div>
                </>:
                !selectedChatRoom?
                <div className="d-flex align-items-center justify-content-center flex-grow-1" style={{ height: '100%' }}>
                  <Image src={logonew} thumbnail alt="Company Logo"  style={{width: '400px', height: '250px',backgroundColor: 'transparent'}} />
                </div>
                :
                <>                
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-2 pt-3 mb-2">
                    <div className="d-flex align-items-center">
                    <img src={selectedChatRoom.otherUser.profile??'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} alt="User" className="rounded-circle me-2" width="40" height="40" />
                    <div>
                      <strong style={{color:'white', fontWeight:'bold'}}>{selectedChatRoom.otherUser.name}</strong>
                      <p className="small text-muted mb-0">{selectedChatRoom.otherUser.description}</p>
                    </div>
                    </div>
                    <ThreeDotsVertical size={20} className="cursor-pointer" />
                  </div>
                  <div className="flex-grow-1 overflow-auto mb-2" style={{ maxHeight: "530px" }}>
                    {chatMessages.map((msg) => {
                      console.log(msg);
                      
                      const isSentByUser = msg.reciever_id === user.user_id;
                      return (
                        <div
                          key={msg.id}
                          className={`d-flex mb-2 p-2 rounded`}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <div
                            className="d-flex p-2 rounded"
                            style={{
                              backgroundColor: isSentByUser ? '#FFDA3F' : 'white',
                              maxWidth: '70%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignSelf: isSentByUser ? 'flex-end' : 'flex-start',
                            }}
                          >
                            {msg.ad_id && (
                              <div
                              className={`rounded mb-1`}
                                style={{ backgroundColor: isSentByUser?'#4FBBB4':'#FFDA3F', color: 'white', padding: '2px 6px' }}
                              >
                                {msg.ad_id}
                              </div>
                            )}
                            {
                              msg.type === 'audio' ?(<>
                                <div>
                                  <ChatAudioPlayer audioUrl={msg.file_url} />
                                </div>
                              </>):(<>
                                <div className={`rounded mb-1 ${isSentByUser ? "text-white" : "bg-light"}` } style={{display:'flex', alignItems:'flex-end'}}>{msg.message}</div>
                              </>)
                            }
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef}></div>
                  </div>
                  <div className="input-group" style={{ height: "50px"}}>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="btn" style={{backgroundColor:'#FFDA3F', color:"white"}} onClick={sendMessage}>Send</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ChatScreen;