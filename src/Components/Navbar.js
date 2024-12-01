/*Import Link to allow access to other pages*/
import { Link } from 'react-router-dom';

export function Navbar(){
    return(
        <div class="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/userCreate">Create User</Link>
                </li>

                <li>
                    <Link to="/userList">Users</Link>
                </li>
            </ul>
        </div>
    )
}