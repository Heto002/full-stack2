/*Import Link to allow access to other pages*/
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function Navbar(){
    console.log("useLocation: " + useLocation().pathname);

    return(
        <div class="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/recordCreate/User">Create User</Link>
                </li>

                <li>
                    <Link to="/recordList/User">Users</Link>
                </li>
            </ul>
        </div>
    )
}