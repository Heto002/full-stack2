import './App.css';
import React, {useState} from 'react';

function App() {
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
    console.log(newData);
    setReturnedData(newData[0]);
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
    setReturnedData(newData[0]);
  }

  return (
    <div className="App">
      <input type="number" name="UserID" placeholder="UserID" onChange={setInput}></input>
      <input name="Firstname" placeholder="Firstname" onChange={setInput}></input>
      <input name="Lastname" placeholder="Lastname" onChange={setInput}></input>
      <input type="number" name="Age" placeholder="Age" onChange={setInput}></input>
      <input name="Gender" placeholder="Gender" onChange={setInput}></input>
      <button onClick={() => getData()}>Click</button>
      <button onClick={() => createUser()}>Create</button>
      <p>UserID: {returnedData.UserID}</p>
      <p>Firstname: {returnedData.Firstname}</p>
      <p>Lastname: {returnedData.Lastname}</p>
      <p>Age: {returnedData.Age}</p>
      <p>Gender: {returnedData.Gender}</p>
    </div>
  );
}

export default App;
