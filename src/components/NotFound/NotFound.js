import image from "../../images/user.png"
import "./NotFound.css"

export default function NotFound() {
   return ( 
       <div className="page">
        <img src={image} alt="" className="page--image"/>
        <p className="page--text"> User not found </p>
    </div>)
}