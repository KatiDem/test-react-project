import search from "../../images/search.png"
import "./StartPage.css"

export default function StartPage() {
   return ( 
       <div className="start">
        <img src={search} alt="" className="start--image"/>
        <p className="start--text"> Start with searching a GitHub user </p>
    </div>)
}