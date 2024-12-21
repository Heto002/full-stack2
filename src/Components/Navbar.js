/*Import Link to allow access to other pages*/
import { Link } from 'react-router-dom';
import React, {useEffect,useState} from 'react';

const tableFolder = "../Tables/"

export function Navbar(){
    const [fileContents, setFileContents] = useState([]);

    useEffect(() => {
      const fetchFiles = () => {
        const context = require.context('../Tables', false, /\.json$/); // Dynamically load JSON files
        const contents = context.keys().map((fileName) => {
          const content = context(fileName); // Import the file
          return { fileName: fileName.replace('./', ''), content };
        });
  
        setFileContents(contents); // Update state with file contents
      };
  
      fetchFiles();
    }, []);

    return(
        <div class="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
            fileContents.map((file,index) =>{
              return(
                (()=>{
                    return(
                      <>

                        <li>
                            <Link to={"/recordCreate/" + file.content.table_name}>{"Create " + file.content.table_label}</Link>
                        </li>

                        <li>
                            <Link to={"/recordList/" + file.content.table_name}>{file.content.table_label + "s"}</Link>
                        </li>
                      </>                   
                    )
                })()
              )
            })
        }
            </ul>
        </div>
    )
}