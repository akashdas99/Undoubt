import React, { useState } from 'react'
import Searchbar from './Searchbar'
import { Link, NavLink, withRouter } from 'react-router-dom'
import './Header.css';
import { isAuthenticated, signout } from '../services/authapihelper';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ history }) => {
    const [showMenu, setshowMenu] = useState(false);
    return (
        <div className="header">
            <Link className="link" style={{ backgroundColor: "#2196f3" }} to="/">UNdoubt</Link>
            <Searchbar />

            <MenuIcon className="menu-btn" onClick={() => setshowMenu(!showMenu)} />
            <div className={showMenu === true ? "menu show" : "menu"}>
                <NavLink className="link" activeStyle={{ backgroundColor: "#E0E5EC", color: "#1f1f1f" }} exact to="/">Home</NavLink>
                <NavLink className="link" activeStyle={{ backgroundColor: "#E0E5EC", color: "#1f1f1f" }} to="/addquestion">Add Question</NavLink>
                {!isAuthenticated() && (<NavLink className="link" activeStyle={{ backgroundColor: "#E0E5EC", color: "#1f1f1f" }} to="/signin">SignIn</NavLink>)
                }
                {!isAuthenticated() && (<NavLink className="link" activeStyle={{ backgroundColor: "#E0E5EC", color: "#1f1f1f" }} to="/signup">SignUp</NavLink>)}
                {isAuthenticated() && (<NavLink className="link" activeStyle={{ backgroundColor: "#E0E5EC", color: "#1f1f1f" }} to={`/profile/${isAuthenticated().userId}/questions`}>Profile</NavLink>)}
                {
                    isAuthenticated() && (<div className="link" onClick={() => {
                        signout(() => {
                            history.push("/")
                        })
                    }}>SignOut</div>)
                }
            </div>
        </div >
    )
}

export default withRouter(Header)
