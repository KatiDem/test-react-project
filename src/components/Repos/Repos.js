import { Context } from "../../context/context"
import React from "react"
import ReactPaginate from "react-paginate"
import "./Repos.css"

export default function Repos() {

    const { repos, user, page, setPage} = React.useContext(Context)

    const repoElement = repos.map(elem => {
        return (<div className="repo" key={elem.id}>
                    <a href={elem.html_url}  target="_blank"  rel="noreferrer"> <h2 className="repo--name">{elem.name}</h2></a>
                    <p className="repo--description">{elem.description}</p>
                </div>)
      })

      const handlePageClick = (event) => {
        setPage(event.selected + 1)
    }

    return (
        <div className="repos">
            <h1 className="repo--count"> Repositories ({user.public_repos})</h1>
            {repoElement}
            <div className="paginate">
            <p className="paginate--text">{page * 4 -3}-{page*4 > user.public_repos ? user.public_repos : page*4} of {user.public_repos} items</p>
            <ReactPaginate 
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={user.public_repos / 4} 
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            /></div>
        </div>
    )
}