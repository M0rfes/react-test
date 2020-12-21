import React, { useContext, useEffect, useState, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import FirebaseContext from "./firebase";
import Users from "./components/Users";
import { User as TUser } from "./types/User";
function App() {
  const [users, setUsers] = useState<{ [key: string]: TUser }>({});
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    try {
      firebase
        .database()
        .ref("users/")
        .on("value", (snap) => {
          console.log(Object.values(snap.val()));
          setUsers(snap.val());
        });
    } catch (error) {
      console.log(error);
    }
    return () => {};
  }, [firebase]);
  return (
    <div className="App">
      {Object.entries(users).map(([id, user]) => (
        <Users key={id} id={id} user={user}></Users>
      ))}
    </div>
  );
}

export default App;
