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

export default function App() {
  const [username, setUsername] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState([])
  const [repos, setRepos] = React.useState([])

  function handleSetUsername(e) {
    setUsername(e.target.value)
  }

  function handleSubmit(event) {
      event.preventDefault()
      searchUser()
      getRepositories()
  }

  function searchUser() {
      setLoading(true)
      axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) =>{ setUser(response.data);});
  }

  function getRepositories() {
      setLoading(true)
      axios
      .get(`https://api.github.com/users/${username}/repos`)
      .then((response) => {setLoading(false); setRepos(response.data);});
  }

  return (
    <div className="App">
    <Context.Provider
      value={{ handleSubmit, handleSetUsername, username, user, setUser, repos, setRepos, loading, setLoading }}
    >
    <Header />
    {user.length !== 0 ?     
      (loading ? <Loader/> : 
        <div className="main">
          <Profile />
          {repos.length !== 0 ? <Repos /> : <EmptyRepos />}
        </div> ) : <StartPage/>}
   </Context.Provider>
   </div>
  );
}