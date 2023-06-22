import React, { useState,useEffect } from "react";
import './App.css';
import { Button, Container, Heading, Input,Flex,Box } from "@chakra-ui/react";
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
	<>
	 <div className="headbar">
		<Heading color='green' textAlign={'center'} id="app-title">Chat Website</Heading>
	 </div>
    <Container  width={'90%'} margin={'auto'}>
	<Flex direction={'column'} justifyContent={'center'}>
		<Box className="chat" overflow={'scroll'}  height={'70vh'}>
		  {renderChat()}
	  </Box>
		 
			<form onSubmit={onMessageSubmit}>
				<Flex class="new-chat" minWidth='max-content' alignItems='center' gap='2' pt={'4vh'} width={'100%'} margin={'auto'} bottom={'4vh'}>
				<Input placeholder='Input Text' variant={'filled'} value={message} onChange={(e)=>setMessage(e.target.value)}type="text" id="message" />
            <Button variant='outline' background={'green'} id="send" type="submit">Send</Button>
			 </Flex>
			</form>
            
       
    
  


	  
		</Flex>
    </Container>
</>

  )
}

export default Chat;