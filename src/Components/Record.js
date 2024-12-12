import React, {useState} from 'react';

export function Record({table}){

  const metaData = require('../Tables/' + table + '.json');

  //returnedData is the variable that will hold a value
  //setReturendData is the function that will set the value for the returnedData variable
  //["Hello"] is the initialized value or default value
  const [returnedData, setReturnedData] = useState(["Hello"]);
  const [record,setRecord] = useState({user_id:0,first_name:"",last_name:"",age:0,gender:""});

  const setInput = (e) =>{
    const {name,value} = e.target;
    console.log("Real-time field value changes: " + value);
      
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
    console.log("record: " + record);
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
    console.log("JSON.stringify(newData): " + JSON.stringify(newData));
    setReturnedData(newData);
  }
    
  const createRecord = async() =>{
    const newData = await fetch('/hello',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        ...record
      })
    })
    .then(res => res.json());
  }

  return(
    <div class="newRecord">

      <h1>Create a New Record</h1>
      <button onClick={() => createRecord()}>Create</button>

      <form>
        <span class="column">
          {
            metaData.fields.map((field,index) =>{
              return(
                (()=>{
                  if(metaData.fields[index].column_type === "A"){
                    return(
                      <>
                        <label htmlFor={metaData.fields[index].field_name}>{metaData.fields[index].field_label}</label>
                        <input type={metaData.fields[index].field_type} id={metaData.fields[index].field_name} name={metaData.fields[index].field_name} placeholder={metaData.fields[index].field_label} onChange={setInput}></input>
                        <br></br>
                      </>                   
                    )
                  }
                })()
              )
            })
          }
        </span>
    
        <span class="column">
          {
            metaData.fields.map((field,index) =>{
              return(
                (()=>{
                  if(metaData.fields[index].column_type === "B"){
                    return(
                      <>
                        <label htmlFor={metaData.fields[index].field_name}>{metaData.fields[index].field_label}</label>
                        <input type={metaData.fields[index].field_type} id={metaData.fields[index].field_name} name={metaData.fields[index].field_name} placeholder={metaData.fields[index].field_label} onChange={setInput}></input>
                        <br></br>
                      </>                   
                    )
                  }
                })()
              )
            })
          }
        </span>
      </form>
    </div>
  )
}