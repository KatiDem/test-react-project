import logo from "../../images/logo.png"
import React from "react"
import "./Header.css"
import { Context } from "../../context/context"


export default function Header() {
    const {handleSubmit, handleSetUsername, username} = React.useContext(Context)
    return (
        <div className="header">
            <img className="header--image" src={logo} alt="" />
            <form onSubmit={handleSubmit}>
                <input 
                placeholder={'Enter GitHub username'} 
                className="header--search" 
                type="text"
                onChange={handleSetUsername}
                value={username}
                  />
            </form>
        </div>
    )
}