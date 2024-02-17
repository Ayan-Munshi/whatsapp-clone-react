import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth"; // needed to import signwithpopup
import { useContext } from "react";
import { Context, actiontype } from "../Context-reducer";

function Login() {
    const{dispatch} = useContext(Context)
  
    const signin = async () => {
        try {
          const result = await signInWithPopup(auth, provider) // here provider is the provider from my firebase file and correct syntax according to the 
            .then((result)=>{
              dispatch({                     // dispatching the type,user to the reducer function which is
                                            // in Context-reducer file so that we can send the reducer function anywhere by context api's provider feature 
                type: actiontype.set_user,   // actiontype is declared in Context-reducer file
                user:result.user             // result.user has user info and this will be neede in future

              })
              console.log('user user info with many google signin feature ',result)
              console.log('users information',result.user)       // form result just printing the user portion
            })                                                   // current version of firebase (this line will help to sign in with google)
          //console.log(result);

        } catch (error) {       //exception handling
          alert(error.message);
        }
      }
  

  return (
    <div
      id="background"
      className="h-full w-full bg-slate-300 flex items-center justify-center"
    >
      <div className="flex  h-[70vh] w-[80vw] shadow-xl shadow-gray-400 rounded-lg bg-orange-100 ml-10 items-top justify-center pt-10">
        <img
          src="https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e?h=464"
          alt=""
          className="h-[20vh] rounded-lg shadow-xl shadow-gray-400 "
        />
       <div id="signup " className="absolute top-[50%] left-[46%] ">
        <h1 className="font-bold text-2xl relative left-[-10%] ">Sign in to Whatsapp</h1>
        <br/>
       <button type="submit" onClick={signin} className="bg-green-500 px-2 rounded text-white shadow-xl shadow-gray-400">Sign in with Google</button>
       </div>
      </div>
    </div>
  );
}

export default Login;

// 2