import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { Link, NavLink, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../services/authapihelper";
import MenuIcon from "@material-ui/icons/Menu";

const Header = ({ history }) => {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <div className="header">
      <Link className="logo link" to="/">
        UNdoubt
      </Link>
      <Searchbar />
      <MenuIcon className="menu-btn" onClick={() => setshowMenu(!showMenu)} />
      <div className={"menu" + (showMenu ? " show" : "")}>
        <NavLink className="link" exact to="/">
          Home
        </NavLink>
        <NavLink className="link" to="/addquestion">
          Add Question
        </NavLink>
        {!isAuthenticated() && (
          <NavLink className="link" to="/signin">
            SignIn
          </NavLink>
        )}
        {!isAuthenticated() && (
          <NavLink className="link" to="/signup">
            SignUp
          </NavLink>
        )}
        {isAuthenticated() && (
          <NavLink
            className="link"
            to={`/profile/${isAuthenticated().userId}/questions`}
          >
            Profile
          </NavLink>
        )}
        {isAuthenticated() && (
          <a
            className="link"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            SignOut
          </a>
        )}
      </div>
    </div>
  );
};

export default withRouter(Header);
