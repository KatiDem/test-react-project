//проверить маржины паддинги и весь дизайн
import following from "../../images/fing.png"
import followers from "../../images/fers.png"
import "./Profile.css"
import { Context } from "../../context/context"
import React from "react"
export default function Profile() {
    
    const {user} = React.useContext(Context)

    function rounding(num) {
        if (num > 1000) {
            return (num / 1000).toFixed(1)+ 'k'
        }
        return num
    }

    return (
        <div className="profile">
            <img className="profile--image" src={user.avatar_url} alt="" />
            <h2 className="profile--name">{user.name}</h2>
            <a href={user.html_url} target="_blank"  rel="noreferrer"> <p className="profile--username">{user.login}</p> </a>
            <div className="profile--info">
                <img className="profile--icon" src={followers} alt=""/>
                <p> {rounding(user.followers)} followers</p>
                <img  className="profile--icon"  src={following} alt=""/>
                <p> {rounding(user.following)} following</p>
            </div>
        </div>
    )
}