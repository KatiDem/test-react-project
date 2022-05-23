import * as axios from "axios";
import React, { useState, useRef, useEffect } from "react"
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
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [repos, setRepos] = useState([])
  const [emptyUser, setEmptyUser] = useState(false)
  const [page, setPage] = useState(1)
  const isMounted = useRef(false)

  function handleSetUsername(e) {
    setUsername(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      setPage(1)
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

  useEffect(() => {
    if (isMounted.current) {
      axios.get(`https://api.github.com/users/${username}/repos?page=${page}&per_page=4`)
        .then((response) => {
          setLoading(false);
          setRepos(response.data);
        })
    } else {
      isMounted.current = true;
    }

  }, [page]);

  return (
    <Context.Provider
      value={{ page, setPage, handleSubmit, handleSetUsername, username, user, setUser, repos, setRepos }}
    >
      <Header />
      { user.length === 0 && !emptyUser ? <StartPage/>  :  
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