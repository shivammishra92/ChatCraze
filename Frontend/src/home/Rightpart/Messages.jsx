import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";
import chatBg from '../../images/chatBg.jpg'

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  //console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 10);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto bg-fixed"
      style={{ minHeight: "calc(92vh - 8vh)" ,backgroundImage: `url(${chatBg})` }}
    >
      {loading ? (<Loading />) : 
      ( messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%] text-white">
            Say, Hi! to start the conversation...
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
