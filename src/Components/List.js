/*Import State, from React*/
import React, {useState} from 'react';

export function List(){
    const [returnedData, setReturnedData] = useState(["Hello"]);
    const [user,setUser] = useState({user_id:0,first_name:"",last_name:"",age:0,gender:""});
  
    const setInput = (e) =>{
      const {name,value} = e.target;
      console.log(value);
      if(name === "user_id" || name === "age"){
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
          name:user.first_name
        })
      })
      .then(res => res.json());
      console.log("newData: " + JSON.stringify(newData));
      setReturnedData(newData);
    }

    return(
      <div class="exisitingRecords">
        <h1>Search for a Record</h1>
        <button onClick={() => getData()}>Search</button>
        <br></br>
        <br></br>
        <table>
          <thead>
            <tr class="columnHeader">
              <th>
                <span>UserID</span>
              </th>

              <th>
                <span>Firstname</span>
              </th>

              <th>
                <span>Lastname</span>
              </th>

              <th>
                <span>Age</span>
              </th>

              <th>
                <span>Gender</span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr class="columnHeaderSearch">
                <td>
                  <input type="number" id="user_id" name="user_id" placeholder="Search" onChange={setInput}></input>
                </td>

                <td>
                  <input type="text" id="first_name" name="first_name" placeholder="Search" onChange={setInput}></input>
                </td>
                
                <td>
                  <input type="text" id="last_name" name="last_name" placeholder="Search" onChange={setInput}></input>
                </td>

                <td>
                  <input id="Age" type="number" name="age" placeholder="Search" onChange={setInput}></input>
                </td>

                <td>
                  <input type="text" id="gender" name="gender" placeholder="Search" onChange={setInput}></input>
                </td>
              </tr>
            {
              returnedData.map((user,index) =>{
                return(
                  (()=>{
                    if(index %2 === 0){
                        return(                    
                        <tr class="evenRows">
                          <td>{user.user_id}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.age}</td>
                          <td>{user.gender}</td>
                        </tr>
                        )
                    }

                    else{
                      return(                    
                        <tr class="oddRows">
                       <td>{user.user_id}</td>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.age}</td>
                          <td>{user.gender}</td>
                        </tr>
                      )
                    }
                  })()
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
}