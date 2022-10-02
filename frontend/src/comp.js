import React, { useState } from "react";
import './App.css';


function Comp(props) {
    const[name,setName]= useState("");
    const handleText=(e)=>
    {
        setName(e.target.value);
        console.log(name);
    }
    const submitHandler=(e)=>
    {
          e.preventDefault();
          if(!name){
            alert('please enter a username')
          }
          else{
            props.setRender(true);
            props.onSubmit(name);
          }
          
    }
  return (
    <div className="body-login">
      <div className="login-page">
   
        <div className="form">
          <form onSubmit={submitHandler} className="register-form" >
        <h2>Enter Username:</h2>
        <input type="text" value={name} onChange={handleText} placeholder="Username"/><br />
           <button type="submit" >Enter Chat Room</button>

      </form>
        </div>
        
   
      
    </div>
    </div>
    
  );
}

export default Comp;