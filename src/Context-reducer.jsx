import { createContext, useReducer } from "react";

const Context = createContext()
export const set_user = "set_user"; // just a string value 
export const initialstate = {user :null} // user is null at the beginning
export const actiontype = { set_user : 'set_user' } // had to declear it above to use it

const reducer = (state,action) =>{
    console.log(action)
    if(action.type == actiontype.set_user){
        return {
            ...state,
            user: action.user
        }
    }
}



const Contextprovider = ({children}) => {

    const[count,dispatch] = useReducer(reducer,initialstate) // the result of the reducer will be stored in (count)

    return(
        <Context.Provider value={{count,dispatch}}>   {/* the count will be needed in near future to take out the user : action.user in the App.jsx  */}
            {children}
        </Context.Provider>
    )
}

export {Contextprovider,Context}


// from Login component above reducer function is receiving actiontype , user : users information 

// 1 login steps