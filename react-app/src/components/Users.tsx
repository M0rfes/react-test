import React, { FC, useContext, useEffect, useState } from "react";
import { User as TUser } from "../types/User";
import FirebaseContext from "../firebase";

type App = {
  [name: string]: {
    title: string;
    ratting: number;
  };
};
const Users: FC<{ id: string; user: TUser }> = ({ id, user }) => {
  const [apps, setApps] = useState<App>({});
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    firebase
      .database()
      .ref(`accounts/${user.account}`)
      .on("value", (snap) => {
        setApps(snap.val().apps);
      });
  }, [firebase, user.account]);
  const doSubmit = (name: string, app: { title: string; ratting: number }) => {
    firebase
      .database()
      .ref(`accounts/${user.account}/apps/${name}`)
      .update(app)
      .then((c) => {});
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
              onChange={(e) => {
                const ratting = (e.target as any)?.value;
                setApps((apps) => {
                  const app = apps[name];
                  console.log({
                    ...apps,
                    [name]: {
                      ...app,
                      ratting,
                    },
                  });
                  return {
                    ...apps,
                    [name]: {
                      ...app,
                      ratting,
                    },
                  };
                });
              }}
            ></input>
            <button type="submit">Rate</button>
          </form>
        ))}
      </div>
      <hr />
    </>
  );
};
export default Users;
