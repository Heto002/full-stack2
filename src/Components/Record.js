import React, {useState} from 'react';

export function Record(){
    const [returnedData, setReturnedData] = useState(["Hello"]);
    const [user,setUser] = useState({UserID:0,Firstname:"",Lastname:"",Age:0,Gender:""});
  
    const setInput = (e) =>{
      const {name,value} = e.target;
      console.log(value);
      if(name === "UserID" || name === "Age"){
        setUser(prevState => ({
          ...prevState,
          [name]: parseInt(value)
        }));
  
        //Early return
        return;
      }
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  
    const getData = async() =>{
      console.log(user);
      const newData = await fetch('/api',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          name:user.Firstname
        })
      })
      .then(res => res.json());
      console.log("newData: " + JSON.stringify(newData));
      setReturnedData(newData);
  
      //One Record
      //setReturnedData(newData[0]);
    }
    
    const createUser = async() =>{
      const newData = await fetch('/hello',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          ...user
        })
      })
      .then(res => res.json());
      console.log(newData);
    }

    return(
        <div class="newRecord">
        <h1>Create a New Record</h1>
        <button onClick={() => createUser()}>Create</button>

      <form>
        <span class="column">
          <label htmlFor="UserID">UserID</label>
          <input type="number" id="UserID" name="UserID" placeholder="UserID" onChange={setInput}></input>
          <br></br>

          <label htmlFor="Firstname">Firstname</label>
          <input type="text" id="Firstname" name="Firstname" placeholder="Firstname" onChange={setInput}></input>
          <br></br>

          <label htmlFor="Lastname">Lastname</label>
          <input type="text" id="Lastname" name="Lastname" placeholder="Lastname" onChange={setInput}></input>
        </span>
    
        <span class="column">
          <label htmlFor="Age">Age</label>
          <input id="Age" type="number" name="Age" placeholder="Age" onChange={setInput}></input>
          <br></br>

          <label htmlFor="Gender">Gender</label>
          <input type="text" id="Gender" name="Gender" placeholder="Gender" onChange={setInput}></input>
        </span>
      </form>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </div>
    )
}