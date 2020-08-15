import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { User as TUser } from '../types/User';
import FirebaseContext from '../firebase';

type App = {
  [name: string]: {
    title: string;
    ratting: number;
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
  const doSubmit = (name: string, app: { title: string; ratting: number }) => {
    firebase
      .database()
      .ref(`accounts/${user.account}/apps/${name}`)
      .update(app)
      .then((c) => console.log(c));
  };
  return (
    <>
      <div>
        <p>name: {user.name}</p>
        <p>account: {user.account}</p>
        <strong>apps</strong>
        {Object.entries(apps).map(([name, app], i) => (
          <form
            key={i}
            onSubmit={(e) => {
              e.preventDefault();
              doSubmit(name, app);
            }}
          >
            <p>
              app {i + 1}: {app.title}
            </p>
            <input
              type="number"
              min="0"
              max="5"
              value={app.ratting}
              onChange={(e) =>
                setApps((apps) => {
                  const app = apps[name];
                  return {
                    ...apps,
                    [name]: {
                      ...app,
                      ratting: (e.target as any).value,
                    },
                  };
                })
              }
            ></input>
            <button type="submit">Rate</button>
          </form>
        ))}
      </div>
      <hr />
    </>
  );
};
export default User;
