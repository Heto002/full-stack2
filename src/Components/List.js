/*Import State, from React*/
import React, {useState} from 'react';

export function List({table}){

  const metaData = require('../Tables/' + table + '.json');

    const [returnedData, setReturnedData] = useState(["Hello"]);
    const defaultValues = {};
    var displayField = "";
    var numberFields = [];

    metaData.fields.map((field,index) =>{
      defaultValues[metaData.fields[index].field_name] = metaData.fields[index].default_value;
      if(metaData.fields[index].display == true)
        displayField = metaData.fields[index].field_name;

      if(metaData.fields[index].field_type == "number")
        numberFields.push(metaData.fields[index].field_name);
    });
    const [record,setRecord] = useState(defaultValues);
  
    const setInput = (e) =>{
      const {name,value} = e.target;
      if(numberFields.some(value => value === name)){
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
      const newData = await fetch('/api',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          table:table,
          field_name:displayField,
          field_value:record[displayField]
        })
      })
      .then(res => res.json());
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
              returnedData.map((record,index) =>{
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
                                          <td>{record[metaData.fields[index2].field_name]}</td>
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
                                        <td>{record[metaData.fields[index2].field_name]}</td>
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