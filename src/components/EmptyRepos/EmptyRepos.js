import image from "../../images/norepo.png"
import "./EmptyRepos.css"

export default function EmptyRepos() {
   return ( 
       <div className="page">
        <img src={image} alt="" className="page--image"/>
        <p className="page--text"> Repository list is empty </p>
    </div>)
}