import { List } from '../Components/List';

export function RecordList(){
    function getTableFromURL(url){
        return (url.substring(url.lastIndexOf("/")+1, url.length));
      }

    return(
        <>
            <div className="App">
                <List table={getTableFromURL(window.location.href)}/>
            </div>
        </>
    )
}