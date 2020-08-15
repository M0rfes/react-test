import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { User as TUser } from '../types/User';
import FirebaseContext from '../firebase';

type App = {
  [name: string]: {
    title: string;
  };
};
const User: FC<{ id: string; user: TUser }> = ({ id, user }) => {
  const [apps, setApps] = useState<App>({});
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .database()
      .ref(`accounts/${user.account}`)
      .on('value', (snap) => {
        setApps(snap.val().apps);
      });
  }, [firebase]);
  return (
    <>
      <div>
        <p>name: {user.name}</p>
        <p>account: {user.account}</p>
        <strong>apps</strong>
        {Object.values(apps).map((app, i) => (
          <p key={i}>
            app {i + 1}: {app.title}
          </p>
        ))}
      </div>
      <hr />
    </>
  );
};
export default User;
