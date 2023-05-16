import React from 'react'
import {Link} from 'react-router-dom'
import { useContext,useEffect, useState} from "react";
import {UserContext} from "./UserContext";

const Header = () => {
  // const [username,setUsername] = useState(null);//for showing username on navbar after login
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  
  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }
  
  const username = userInfo?.username;

  return (
    <div>
      
      <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
          {/* <span style={{marginRight:"2%"}}>Hello, {username}</span> */}
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
    </div>
  )
}

export default Header
