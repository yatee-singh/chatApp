import React, { useState,useEffect } from "react";
import './App.css';
//import TextField from "@material-ui/core/TextField";
import io from "socket.io-client"
const socket = io('https://websocketchatappbackend.onrender.com')
function Chat({username}) {

	useEffect(() => {
    socket.on('message', ({username,message,time}) => {
      setChat([...chat, {username,message,time}]);
	  console.log(chat)
    })
  })
  const time2 = new Date().toLocaleTimeString();
	
  const [ message, setMessage ] = useState("");
  const [ chat, setChat ] = useState([]);
  const [time, setTime]= useState(time2);
  const [mine, setMine]=useState(false);


	
	// const socketRef = useRef();
	// useEffect(
	// 	() => {
	// 		socketRef.current = io.connect("http://localhost:4000")
	// 		socketRef.current.on("message", ({ name, message }) => {
	// 			setChat([ ...chat, { name, message } ])
	// 		})
	// 		return () => socketRef.current.disconnect()
	// 	},
	// 	[ chat ]
	// )

	const renderChat = () => {
		return chat.map(({ username, message,time}, index) => (
			
				<div class="message-wrapper">
					<div className="message-content">
					<span className="username">{username}</span><br /> <span className="message">{message}</span>
					<div class="timestamp">{time}</div>
				</div>
				</div>
			
		))
	}

	const onTextChange= (e) =>{
		setMessage(e.target.value);
	}

	// const onMessageSubmit = (e) => {
		
	// 	socket.emit("message",  {name:username,message:message} )
	// 	setChat([...chat,{ name:username,message:message}])
	// 	e.preventDefault();
	// 	setMessage("");
	// }
	const onMessageSubmit = (e) => {
    e.preventDefault();
	const time1 = new Date().toLocaleTimeString();
    console.log(time1);
	setTime(time1);
	
    console.log(message);
    socket.emit('message',({username,message,time}))
    setMessage('');
// 	let date      = new Date();
// var timestamp = date.getTime();
// console.log(timestamp);
// console.log(Date.now());

  };
   
  return(
    <div className="chat-body">
		 <div class="new-chat">
			<form onSubmit={onMessageSubmit}>
				<input value={message} onChange={(e)=>setMessage(e.target.value)}type="text" id="message" />
            <button id="send">Send</button>
			</form>
            
        </div>
     <div className="headbar">
		<h1 id="app-title">Chat Website</h1>
	 </div>
  


	  <div className="chat">
		  {renderChat()}
	  </div>
		
    </div>


  )
}

export default Chat;