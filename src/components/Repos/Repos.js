import { Context } from "../../context/context"
import React from "react"
import "./Repos.css"
// пагинация
// размер блоков репозитория
// дизайн

export default function Repos() {

    const { repos, user} = React.useContext(Context)

    const repoElement = repos.map(elem => {
        return (<div className="repo" key={elem.id}>
                    <a href={elem.html_url}  target="_blank"  rel="noreferrer"> <h2 className="repo--name">{elem.name}</h2></a>
                    <p className="repo--description">{elem.description}</p>
                </div>)
      })

    return (
        <div className="repos">
            <h1 className="repo--count"> Repositories ({user.public_repos})</h1>
            {repoElement}
        </div>
    )
}