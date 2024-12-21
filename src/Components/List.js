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
      console.log("record: " + JSON.stringify(record));
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
                    return(
                      <>
                        <th>
                          <span>{metaData.fields[index].field_label}</span>
                        </th>
                      </>                   
                    )
                })()
              )
            })
          }
            </tr>
          </thead>

          <tbody>
            <tr class="columnHeaderSearch">
            {
            metaData.fields.map((field,index) =>{
              return(
                (()=>{
                    return(
                      <>
                        <td>
                          <input type={metaData.fields[index].field_type} id={metaData.fields[index].field_name} name={metaData.fields[index].field_name} placeholder="Search" onChange={setInput}></input>
                        </td>
                      </>                   
                    )
                })()
              )
            })
          }
          </tr>
            {
              returnedData.map((user,index) =>{
                return(
                  (()=>{
                    if(index %2 === 0){
                        return(                    
                          <tr class="evenRows">
                            {
                              metaData.fields.map((field,index2) =>{
                                return(
                                  (()=>{
                                      return(
                                        <>
                                          <td>{user[metaData.fields[index2].field_name]}</td>
                                        </>                   
                                      )
                                  })()
                                )
                              })
                            }
                          </tr>
                        )
                    }

                    else{
                      return(                    
                        <tr class="oddRows">
                          {
                            metaData.fields.map((field,index2) =>{
                              return(
                                (()=>{
                                    return(
                                      <>
                                        <td>{user[metaData.fields[index2].field_name]}</td>
                                      </>                   
                                    )
                                })()
                              )
                            })
                          }
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