import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  // call the function exactly once using the useEffect hook from react and passing in [] as second param

  
  useEffect(() => {
    tryLocalSignin();
  }, []);
  

  return null;
};

export default ResolveAuthScreen;
