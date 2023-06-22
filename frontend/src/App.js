import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Comp from './comp.js';
import Chat from './chatroom';


function App() {

 
  const [username,setUserName]=useState("");
  const[render, setRender] = useState(false);
  const getData=(data)=>{
    setUserName(data);
    // setRender(true);
    console.log('render ka val',render)
  }
  
 
  return (
    <ChakraProvider>
    <div className="APP">
  
    {render ? <Chat username={username} /> : <Comp onSubmit={getData} render={render} setRender={setRender}/>}
    </div>
    </ChakraProvider>
    
  );
}

export default App;
