import React, { useState, useEffect, useContext, createContext } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import Router from 'next/router';
import * as Realm from "realm-web";

const authContext = createContext(null);

const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  // const [rawUser, setRawUser] = useState(null)
  const [loading, setLoading] = useState(false)

  let app;
  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      // await checkUser(user);
      setUser(user);
      return user
    } else {
      setLoading(false)
      setUser(false)
      return false
    }
  }


  const checkUser = async (userData) => {
    if (app) {
      return
    }
    app = Realm.getApp("async-new-qtwdo");
    console.log("srtarted ddf", app);
    if (app && !app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      await app.logIn(anonymousUser);
    }
    if (app?.currentUser) {
      console.log("checking user",userData);
      const mongo = app?.currentUser?.mongoClient("mongodb-atlas");
      const userIns = mongo.db("async-new-ui").collection("users");
      const data = await userIns.count();
      console.log(data);
      if (!data) {
        const res = await userIns.insertOne(userData);
        console.log(res);
      }
    } else {
      setUser(null)
      setLoading(false);
    }
  }

  const signinWithGitHub = () => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => handleUser(response.user))
  }
  const signinWithGoogle = async (redirect) => {
    setLoading(true);
    return await signInWithPopup(auth, provider)
      .then(async (response) => {
        await handleUser(response.user)
        if (redirect) {
          Router.push(redirect)
        }
      })
  }
  const signout = () => {
    return auth
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => {
      unsubscribe();
    }
  }, []);

  return {
    user,
    loading,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  }
}