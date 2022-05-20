import * as axios from "axios";
import React from "react"
import { Context } from "./context/context";
import './App.css';
import Header from "./components/Header/Header"
import Profile from "./components/Profile/Profile"
import Repos from "./components/Repos/Repos"
import Loader from "./components/Loader/Loader";
import StartPage from "./components/StartPage/StartPage";
import EmptyRepos from "./components/EmptyRepos/EmptyRepos";
import NotFound from "./components/NotFound/NotFound";

export default function App() {
  const [username, setUsername] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState([])
  const [repos, setRepos] = React.useState([])
  const [emptyUser, setEmptyUser] = React.useState(false)

  function handleSetUsername(e) {
    setUsername(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const {data: user} = await axios.get(
        `https://api.github.com/users/${username}`
      )
      setUser(user)
      const { data: repos } = await axios.get(
        `https://api.github.com/users/${username}/repos?page=1&per_page=4`
      )
      setRepos(repos)
      setEmptyUser(false)
    }
    catch (error) {
      setEmptyUser(true)
      setRepos([])
    }
    finally {
      setLoading(false)
    }
}

  return (
    <Context.Provider
      value={{ handleSubmit, handleSetUsername, username, user, setUser, repos, setRepos, loading, setLoading }}
    >
      <Header />
      { user.length === 0 ? <StartPage/>  :  
        ( loading ? <Loader/> :
          (emptyUser ? <NotFound /> : 
            <div className="main">
              <Profile />
              {repos.length !== 0 ? <Repos /> : <EmptyRepos />}
            </div> 
            )
        )
      }
   </Context.Provider>
  );
}