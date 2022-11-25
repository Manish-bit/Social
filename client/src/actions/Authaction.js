import * as AuthApi from '../api/AuthRequest'


//action to login a user
export const logIn = (formData)=> async(dispatch)=>{


    dispatch({type:"AUTH_START"})
    try {

        //api call to login a user
        const {data} = await AuthApi.logIn(formData)
        dispatch({type:"AUTH_SUCCESS", data:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
   
}


//action to register a user
export const signUp = (formData)=> async(dispatch)=>{

    dispatch({type:"AUTH_START"})
    try {

        //api call to register a user
        const {data} = await AuthApi.signUp(formData)
        dispatch({type:"AUTH_SUCCESS", data:data})
        
    } catch (error) {
        console.log(error)
        dispatch({type:"AUTH_FAIL"})
    }
   
}