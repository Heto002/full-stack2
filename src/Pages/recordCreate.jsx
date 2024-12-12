/*Import Components*/
import { Record } from '../Components/Record';

export function RecordCreate(){
    function getTableFromURL(url){
        return (url.substring(url.lastIndexOf("/")+1, url.length));
      }

    return(
        <>
            <div className="App">
                <Record table={getTableFromURL(window.location.href)}/>
            </div>
        </>
    )
}