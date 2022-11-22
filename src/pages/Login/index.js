import React, { useState } from 'react';
import './login.css';
import { Logo } from '../../components/Logo';
import { Social } from '../../components/Social';

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Input } from '../../components/Input';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const navigate = useNavigate();
  
    function handleLogin(e) {
      e.preventDefault();

      if(email === '' || password === ''){
        alert("Preencha todos os campos!")
        return;
      }
      
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Bem vindo de volta 😉")
        navigate("/admin", { replace: true } )
      })
      .catch(() => {
        toast.error("Usuário ou senha inválidos!")
        console.log("USUÁRIO OU SENHA INVÁLIDOS!")
      })
    }

  return (
    <div className="loginContainer">
      <div className="boxBaseLogin">

      <Logo />
        
        <form onSubmit={handleLogin} className="formLogin"  >

          <Input 
            type="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <Input 
            type="password"
            placeholder="********"
            autoComplete="on"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />

          <button type="submit" className="btnLogin">Acessar</button>
        </form>

        <Social />   
       
     </div>
    </div>
  )
}