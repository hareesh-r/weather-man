import React, { useContext,useState } from 'react'
import './App.css'
import logo from './img/logo.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserContext } from "./Wrapper";
import Axios from 'axios'


function Login() {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Valid, setValid] = useState(false);
    const { CurrentUser, setCurrentUser } = useContext(UserContext);
    const isUserExist = () => {
        Axios.get("http://localhost:3001/users", {
            params: {
                username: UserName,
                passwords: Password
            }
        }).then((response) => {
            if(response.data.length > 0){
                setValid(true);
                setCurrentUser(response.data[0].email_id)
            }else{
                alert("Invalid Username and Password")
            }
            console.log(response.data) 
        });
    }
    return (
        <div className='Login flex'>
            <div className="container flex col">
                <img src={logo} alt="" />
                <h1 >Login</h1>
                <div className="input-grp flex col">
                    <h3>Username</h3>
                    <input onChange={(e) => {
                        setUserName(e.target.value)
                    }} type="text" placeholder='Username' />
                </div>
                <div onChange={(e) => {
                    setPassword(e.target.value)
                }} className="input-grp flex col ">
                    <h3>Password</h3>
                    <input type="password" placeholder='Password' />
                </div>

                <button onClick={() => {
                    isUserExist()
                }}><Link className='link' to={Valid ? '/Main' : '/Login'}>Login</Link></button>
                <p className='mt10'>Don't have an account ? <Link className='link' to='/Register'>Register now</Link></p>
            </div>

        </div>
    )
}

export default Login