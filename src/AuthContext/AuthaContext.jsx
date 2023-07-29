import React, { createContext, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from '../Components/Firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [monthImages, setMonthImages] = useState(Array(12).fill(null));
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const registerUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, loggedInUser => {
      setUser(loggedInUser);
      setLoading(false)

    });
    return () => {
      unSubscribe();
    };
  }, []);

  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth)
  }
  





  const authInfo = {
    selectedYear,
    setSelectedYear,
    monthImages,
    setMonthImages,
    tasks,
    setTasks,
    selectedDate,
    setSelectedDate,
    taskFormVisible,
    setTaskFormVisible,
    currentYear,
    uniqueId,
    setUniqueId,
    registerUser,
    loginUser,
    googleSignIn,
    loading,
    user,
    LogOut


  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
