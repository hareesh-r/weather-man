
import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Favorites from "./Favorites";
import { useState, createContext } from "react";
export const UserContext = createContext();
function Wrapper() {
    const [CurrentUser, setCurrentUser] = useState([]);
    return (
        <UserContext.Provider
            value={{
                CurrentUser,
                setCurrentUser,
            }}
        >
            <Router>
                <Switch>
                    <Route path="/Register">
                        <Register />
                    </Route>
                    <Route path="/Login">
                        <Login />
                    </Route>
                    <Route path="/Favorites">
                        <Favorites />
                    </Route>
                    <Route path="/Main">
                        <App />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    )
}

export default Wrapper