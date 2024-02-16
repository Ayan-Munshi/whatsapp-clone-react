import { createContext, useReducer } from "react";

const Context = createContext()
export const set_user = "set_user"; // just a string value 
export const initialstate = {user :null}
export const actiontype = { set_user : 'set_user' } // had to declear it above to use it

const reducer = (state,action) =>{
    console.log(action)
    if(action.type == actiontype.set_user){
        return {
            ...state,user:action.user
        }
    }
}

const Contextprovider = ({children}) => {

    const[x,dispatch] = useReducer(reducer,initialstate)

    return(
        <Context.Provider value={{x,dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Contextprovider,Context}