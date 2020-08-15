import React, { useContext, useEffect, useState, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import FirebaseContext from './firebase';
import User from './components/User';
import { User as TUser } from './types/User';
function App() {
  const [users, setUsers] = useState<{ [key: string]: TUser }>({});
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .database()
      .ref('users')
      .on('value', (snap) => {
        // console.log(Object.values(snap.val()));
        setUsers(snap.val());
      });
    return () => {};
  }, [firebase]);
  return (
    <div className="App">
      {Object.entries(users).map(([id, user]) => (
        <User key={id} id={id} user={user}></User>
      ))}
    </div>
  );
}

export default App;