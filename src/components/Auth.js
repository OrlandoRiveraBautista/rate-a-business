import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase } from "../config/firebase";
import { Button } from "antd";
import User from "./User";

export default function Auth() {
  const [user] = useAuthState(auth);

  const signIn = () => {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };
    return (
      <Button type="primary" shape="round" onClick={signInWithGoogle}>
        Please Sign In
      </Button>
    );
  };

  const signOut = () => {
    if (user) {
      return (
        <div>
          <User user={user} />
          <Button type="primary" shape="round" onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        </div>
      );
    }
  };
  return <div>{!user ? signIn() : signOut()}</div>;
}
