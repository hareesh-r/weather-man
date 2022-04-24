import React from 'react'
import './App.css'
import logo from './img/logo.png'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Axios from 'axios'

function Register() {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Valid, setValid] = useState(false);
    const insertUser = () => {
        Axios.post("http://localhost:3001/add", {
            username: UserName,
            password: Password,
            email:Email,
        }).then((response) => {
            if(response.data)
                window.location.href = "http://localhost:3000/Login"
            else
                alert("An Error Occured")
        })
    }
  return (
    <div className='Login flex'>
            <div className="container flex col">
                <img src={logo} alt="" />
                <h1 >Get Started</h1>
                <div className="input-grp flex col">
                    <h3>Email ID</h3>
                    <input onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" placeholder='Username' />
                </div>
                <div className="input-grp flex col">
                    <h3>Username</h3>
                    <input onChange={(e) => {
                        setUserName(e.target.value)
                    }} type="text" placeholder='Username' />
                </div>
                <div className="input-grp flex col ">
                    <h3>Password</h3>
                    <input onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" placeholder='Password' />
                </div>

                <button onClick={() => {
                    insertUser()
                }}><Link className='link' to={Valid ? '/Main' : '/Register'}>Register</Link></button>
                <p className='mt10'>Already have an acount ? <Link className='link' to='/Login'>Login now</Link></p>
            </div>
        </div>
  )
}

export default Register