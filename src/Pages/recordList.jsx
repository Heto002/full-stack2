import { List } from '../Components/List';
import { useParams } from 'react-router-dom';

export function RecordList(){
    const {table} = useParams(); //Get Dynamic route parameter

    return(
        <>
            <div className="App">
                <List table={table}/>
            </div>
        </>
    )
}