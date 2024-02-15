import { createContext, useReducer } from "react";

const context = createContext()
export const initialstate = {user :null}
export const actiontype = {set_user :set_user}

const reducer = (state,action) =>{
    console.log(action)
    if(action.type == actiontype.set_user){
        return {
            ...state,user:action.user
        }
    }
}

const provider = ({children}) => {

    const[x,dispatch] = useReducer(reducer,initialstate)

    return(
        <context.Provider value={{x,dispatch}}>
            {children}
        </context.Provider>
    )
}