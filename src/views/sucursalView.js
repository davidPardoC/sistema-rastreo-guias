import React, {useEffect, useState}  from 'react'
import MainSucursal from '../screens/main-screen-sucursal'
import {auth} from '../assets/firebase'
import {useHistory } from "react-router-dom";
export default function SucursalView(){  
    const history = useHistory();
    const [router, setRouter] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
          if(user){
            console.log(user)
            user.getIdTokenResult().then(
              (tokenResult)=>{
                if(tokenResult.claims.role==='sucursal'){
                  setRouter(true)
                }else{
                  history.push('/')
                }
              }
            )
            
          }else{
            history.push('/')
          }
        })
        console.log(auth.currentUser)
      },[history]);
    return(
        <div>
            {router && <MainSucursal/>}
        </div>
    )
}