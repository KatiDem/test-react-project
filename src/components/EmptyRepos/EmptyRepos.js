import image from "../../images/norepo.png"
import "./EmptyRepos.css"

export default function EmptyRepos() {
   return ( 
       <div className="emptyrep">
        <img src={image} alt="" className="emptyrep--image"/>
        <p className="emptyrep--text"> Repository list is empty </p>
    </div>)
}