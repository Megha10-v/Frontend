import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from './AppHeader';
import { ThreeDotsVertical, ArrowLeft } from "react-bootstrap-icons";
import socket from "../utils/socket";
import { useSelector } from 'react-redux';
import Loader from "./Loader";
import logonew from '../assets/footlogo.png';
import { Image } from "react-bootstrap";
import ChatAudioPlayer from "./AudioPlayer";
import bgimg from '../assets/bg_chat.jpg';
import { useLocation } from 'react-router-dom';

const ChatScreen = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const otherUserName = location.state?.userName;
  const adId = location.state?.adId;
  const adName = location.state?.adName;
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  const [chatRooms, setChatRooms] = useState([]);
  const [selectedOtherUser, setSelectedOtherUser] = useState(userId);
  const [selectedOtherUserName, setSelectedOtherUserName] = useState(otherUserName);

  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
      socketInstance.disconnect();
    };
  }, [selectedOtherUser, user?.user_id, isAuthenticated, user]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!user?.user_id || !selectedOtherUser) return;
      try {
        const response = await fetch(
          `http://localhost:3000/api/get_chat?authUserId=${user.user_id}&otherUserId=${selectedOtherUser}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await response.json();
        setChatMessages(response.ok ? result.data.chatMessages : []);
      } catch (err) {
        setChatMessages([]);
      } finally {
      }
    };
    fetchChatMessages();
  }, [selectedOtherUser, user?.user_id, token, isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const socketInstance = socket;

    const handleNewMessage = (newMsg) => {
      if (
        selectedOtherUser &&
        (newMsg.sender_id === selectedOtherUser ||
          newMsg.reciever_id === selectedOtherUser)
      ) {
        setChatMessages((prev) => [...prev, newMsg]);
      }
    };
    socketInstance.on("newMessage", handleNewMessage);
    return () => {
      socketInstance.off("newMessage", handleNewMessage);
    };
  }, [selectedOtherUser, isAuthenticated, user]);

  const sendMessage = () => {
    if (input.trim() && selectedOtherUser) {
      const socketInstance = socket;

      const messageData = {
        authUserId: user.user_id,
        userId: selectedOtherUser,
        message: input.trim(),
        type: 'text',
        file: null,
        fileType: '',
        file_name: '',
        ad_id: adId,
        ad_name: adName,
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

  const handleChatRoomClick = (chat) => {
    setSelectedOtherUser(chat.otherUser.user_id);
    setSelectedOtherUserName(chat.otherUser.name)
  };

  const handleBack = () => {
    setSelectedOtherUser(null);
    setSelectedOtherUserName(null);
  };

  if (!isAuthenticated || !user) {
    return <Loader />;
  }

  return (
    <>
      <AppHeader />
      {loading ? <Loader /> :
        <div className={`container`} style={{ maxWidth: "1000px" }}>
          <div className={`row ${isMobile?'':'border rounded'} shadow-sm`} style={{ height: "700px", backgroundColor: '#4FBBB4' }}>
            {(isMobile ? !selectedOtherUser : true) && (
                <div className={`${isMobile ? 'col-12' : 'col-md-4 border-end'} p-3`} style={{ overflowY: "auto" }}>
                  <h5 className="border-bottom" style={{ color: 'white', fontWeight: 'bold' }}>Chats</h5>
                  <ul className="list-group list-unstyled">
                    {chatRooms.map((chat) => (
                      <li key={chat.id} className="d-flex align-items-center p-2 border-bottom" style={{ cursor: 'pointer' }} onClick={() => handleChatRoomClick(chat)}>
                        <img src={chat.otherUser.profile ?? 'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} alt={chat.otherUser.name} className="rounded-circle me-2" width="40" height="40" />
                        <div>
                          <strong style={{ color: 'white' }}>{chat.otherUser.name}</strong>
                          <p className="small text-muted mb-0" style={{ color: '#FFFFFF' }}>{chat.otherUser.description}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            <div className={`col-md-8 d-flex flex-column ${!selectedOtherUser ? 'd-none d-md-flex' : 'd-flex'}`}
              style={{
                backgroundColor: selectedOtherUser ? '#4FBBB4' : 'grey',
                backgroundImage: `url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              {!selectedOtherUser ? (
                <div className="d-flex align-items-center justify-content-center flex-grow-1" style={{ height: '100%' }}>
                  <Image src={logonew} thumbnail alt="Company Logo" style={{ width: '400px', height: '250px', backgroundColor: 'transparent' }} />
                </div>
              ) : (
                <>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-2 pt-3 mb-2">
                    <div className="d-flex align-items-center">
                      <button className="btn btn-link d-md-none text-white me-2" onClick={handleBack}>
                        <ArrowLeft size={24} />
                      </button>
                      <img src={'https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'} alt="User" className="rounded-circle me-2" width="40" height="40" />
                      <div>
                        <strong style={{ color: 'white', fontWeight: 'bold' }}>{selectedOtherUserName}</strong>
                      </div>
                    </div>
                    <ThreeDotsVertical size={20} className="cursor-pointer" />
                  </div>

                  <div className="flex-grow-1 overflow-auto mb-2" style={{ maxHeight: "530px" }}>
                    {chatMessages.map((msg) => {
                      const isSentByUser = msg.sender_id === user.user_id;
                      return (
                        <div key={msg.id} className={`d-flex mb-2 p-2 rounded`} style={{ flexDirection: 'column' }}>
                          <div
                            className="d-flex p-2 rounded"
                            style={{
                              backgroundColor: isSentByUser ? '#FFDA3F' : 'white',
                              maxWidth: '70%',
                              flexDirection: 'column',
                              alignSelf: isSentByUser ? 'flex-end' : 'flex-start',
                            }}
                          >
                            {msg.ad_id && (
                              <div className="rounded mb-1" style={{ backgroundColor: isSentByUser ? '#4FBBB4' : '#FFDA3F', color: 'white', padding: '2px 6px' }}>
                                {msg.ad_id}
                              </div>
                            )}
                            {msg.type === 'audio' ? (
                              <ChatAudioPlayer audioUrl={msg.file_url} />
                            ) : (
                              <div className={`rounded mb-1 ${isSentByUser ? "text-white" : "bg-light"}`} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                {msg.message}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef}></div>
                  </div>

                  <div className="input-group" style={{ height: "50px" }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button className="btn" style={{ backgroundColor: '#FFDA3F', color: "white" }} onClick={sendMessage}>Send</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      }
      <div className={isMobile?'':"p-2"}></div>
    </>
  );
};

export default ChatScreen;