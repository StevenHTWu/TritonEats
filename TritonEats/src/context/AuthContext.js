import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
const mongoose = require("mongoose");
export const User = mongoose.model("userAuth");
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

//This method does NOT work well!
const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  /*
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("HomeScreen");
  } else {
    
  }
  */
//remembering token doesn't seem to work...
 navigate("LandingScreen");
};


const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ name, email, password, is_deliverer }) => {
    // make api request to sign up with that email and password
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere
    try {
      is_deliverer = false;

      const response = await trackerApi.post("/signup", {
        name,
        email,
        password,
        is_deliverer,
      });
      
      if(!name){
        dispatch({
          type: "add_error",
          payload: "Name cannot be empty!",
        });
        return;
     }

     if(typeof name !== "undefined"){
        if(!name.match(/^[a-zA-Z]+$/)){
          dispatch({
            type: "add_error",
            payload: "Name must only have letters!",
          });
          return;
        }        
     }

     if(!email){
      dispatch({
        type: "add_error",
        payload: "Email cannot be empty!",
      });
      return;
   }
     if(typeof email !== "undefined"){
      if(!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
        dispatch({
          type: "add_error",
          payload: "Email is not valid!",
        });
        return;
      }        
   }
   if(!password){
    dispatch({
      type: "add_error",
      payload: "Password cannot be empty!",
    });
    return;
 }



      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });


      if (is_deliverer) {
        navigate("DelivererMainFlow");
      } else {
        navigate("HomeScreen");
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "User exists or server is down..",
      });
    }
  };
};

const signupDeliv = (dispatch) => {
  return async ({ name, email, password, is_deliverer }) => {
    // make api request to sign up with that email and password
    // if we sign up, modify our state, and say that we are authenticated
    // if signing up fails, we probably need to reflect an error message somewhere
    try {
      is_deliverer = true;

      const response = await trackerApi.post("/signup", {
        name,
        email,
        password,
        is_deliverer,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      if (is_deliverer) {
        navigate("DelivererMainFlow");
      } else {
        navigate("HomeScreen");
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    // Try to signin
    // Handle success by updating state
    // Handle failure by showing error message (somehow)
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });

      console.log("Hey hey hey");
      const isDeliverer = response.data.isDeliverer;
      console.log(isDeliverer);

      if (isDeliverer) {
        console.log("In true block: ", isDeliverer);
        navigate("DelivererMainFlow");
      } else {
        console.log("In false block: ", isDeliverer);
        navigate("HomeScreen");
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    // somehow sign out!!!!
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("LandingScreen");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, signupDeliv },
  { token: null, errorMessage: "" }
);
