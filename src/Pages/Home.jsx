import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Userview from "../Components/Userview/Userview";
import Adminhome from "./Adminhome";
import Coachhome from './Coachhome'

const Returnthemainview = ({ user , updateUser}) => {
  if (user.isloggedin === "no") {
    return (
      <>
        <h1>123456</h1>
      </>
    );
  } else if (user.isloggedin === "yes") {
    if (user.userrole === "player") {
      return (
        <>
          <Userview user={user} updateUser={updateUser} />
        </>
      );
    }
    if (user.userrole === "admin") {
      return (
        <>
          <Adminhome user={user} />
        </>
      );
    }
    if (user.userrole === "coach") {
      return (
        <>
          <Coachhome user={user} />
        </>
      );
    }
    
  }
};

function Home(props) {
  const { cort, cortid } = useParams();
  let [user, setUser] = useState({
    pid:"52",
    isregisteredforclub: true,
    clubid:"1",
    isloggedin: "yes",
    email: "",
    userrole: "player",
    
  });
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const update = () => {
    if (user.isloggedin === "no") {
      setUser({
        isloggedin: "yes",
        userid: "",
        userrole: "",
      });
    } else {
      setUser({
        isloggedin: "no",
        userid: "",
        userrole: "",
      });
    }
  };

  useEffect(() => {}, [user]);
    return (
      <>
        <img src="footbal1.gif" />
        <Returnthemainview user={user} updateUser={updateUser} />
      </>
    );
}

export default Home;
