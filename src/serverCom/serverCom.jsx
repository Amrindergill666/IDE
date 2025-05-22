import React,{useEffect,useState} from 'react'
import axios from 'axios'

function ServerCom() {
  

    
  
    const handleSubmitBtn = async () => {
        try {
          const response = await axios.post('http://localhost:5000/api/data', {
            // Your data object to send to the server
            key: 'value',
            anotherKey: 'anotherValue'
          });
          console.log(response.data); // Log the response from the server
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };
  
    // console.log(myData);
    return(
      <>
      {isError !== "" && <h2>{isError}</h2>}
       {(typeof myData === 'undefined') ? (
        <p>...loading...</p>
      ):(myData.map((user,i)=>
      (<p key={i}>{user}</p>)))}
      
      <button onClick={sendDataToServer} > click</button>
      </>
    )
  }

export default ServerCom;