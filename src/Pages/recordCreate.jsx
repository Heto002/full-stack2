/*Import Components*/
import { Record } from '../Components/Record';
import { useParams } from 'react-router-dom';

export function RecordCreate(){
    const {table} = useParams(); //Get Dynamic route parameter

    return(
        <>
            <div className="App">
                <Record table={table}/>
            </div>
        </>
    )
}