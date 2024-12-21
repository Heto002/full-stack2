/*Import State, from React*/
import React, {useState} from 'react';

export function List({table}){

  const metaData = require('../Tables/' + table + '.json');

    const [returnedData, setReturnedData] = useState(["Hello"]);
    const [record,setRecord] = useState({user_id:0,first_name:"",last_name:"",age:0,gender:""});
  
    const setInput = (e) =>{
      const {name,value} = e.target;
      console.log(value);
      if(name === "user_id" || name === "age"){
        setRecord(prevState => ({
          ...prevState,
          [name]: parseInt(value)
        }));
  
        //Early return
        return;
      }
      setRecord(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  
    const getData = async() =>{
      console.log(record);
      const newData = await fetch('/api',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          name:record.first_name
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
            {
            metaData.fields.map((field,index) =>{
              return(
                (()=>{
                  if(metaData.fields[index].column_type === "A"){
                    return(
                      <>
                        <th>
                          <span>{metaData.fields[index].field_label}</span>
                        </th>
                      </>                   
                    )
                  }
                })()
              )
            })
          }
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