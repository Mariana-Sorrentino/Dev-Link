import { useState, useEffect } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private ({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {

    async function checkLogin(){
      // O "onAuthStateChanged" fica monitorando se tem ou não usuário logado
      onAuthStateChanged(auth, (user) => {
        
      if(user) {
        const userDate = {
          uid: user.uid,
          email: user.email
        };

          localStorage.setItem("@detailUser", JSON.stringify(userDate))
          setLoading(false);
          setSigned(true);

      } else{
        setLoading(false);
        setSigned(false);
      }

      })
    }

    checkLogin();

  }, [])

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed) {
   return <Navigate to="/login" /> 
  }

  return children;
}