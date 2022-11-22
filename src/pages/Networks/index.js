import React, { useState, useEffect } from 'react';
import './networks.css';
import { Header } from '../../components/Header';
import { Logo } from '../../components/Logo';
import { Social } from '../../components/Social';
import { Input } from '../../components/Input';
import { MdAddLink } from 'react-icons/md'
import { toast } from 'react-toastify';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { db } from '../../services/firebaseConnection';
import { setDoc,
         doc,
         getDoc,  
 } from 'firebase/firestore';

export default function Networks() {

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");


  useEffect( () => {

   function loadLinks() {
      const docRef = doc(db, "Social", "link")
      getDoc(docRef)
      .then( (snapshot) => {

        if(snapshot.data() !== undefined) {
          setFacebook(snapshot.data().facebook)
          setInstagram(snapshot.data().instagram)
          setLinkedin(snapshot.data().linkedin)
          setGithub(snapshot.data().github)
        }
      })
    }

    loadLinks();

  }, [])

  async function handleSaveSocial(e) {
    e.preventDefault();

    setDoc(doc(db, "Social", "link"), {
      facebook: facebook,
      instagram: instagram,
      linkedin: linkedin,
      github: github
    })
    .then(() => {
      toast.success("Urls salva com sucesso! 😉")
    })
    .catch((error) => {
      console.log("Ops! Erro ao salvar Url!" + error)
      toast.error("Ops! Erro ao salvar Url!")
    })
  }

  return (
    <div  className="adminSocial">
      
      <Header />

      <Logo />

      <h1 className="titleSocial">Suas Redes Sociais</h1>

      <form className="formSocial" onSubmit={handleSaveSocial}>
      <label className="labelAdmin">facebook</label>
      <Input 
        placeholder="Digite a url do facebook..."
        value={facebook}
        onChange={ (e) => setFacebook(e.target.value) }
      />

      <label className="labelAdmin">instagram</label>
      <Input 
        placeholder="Digite a url do instagram..."
        value={instagram}
        onChange={ (e) => setInstagram(e.target.value) }
      />

      <label className="labelAdmin">LinkedIn</label>
      <Input 
        placeholder="Digite a url do LinkedIn..."
        value={linkedin}
        onChange={ (e) => setLinkedin(e.target.value) }
      />

      <label className="labelAdmin">GitHub</label>
      <Input 
        placeholder="Digite a url do GitHub..."
        value={github}
        onChange={ (e) => setGithub(e.target.value) }
      />

      <button type="submit" className="btnRegister">
        Salvar Link <MdAddLink size={24} color="#f8f8f8" />
      </button>

      </form>

        <footer className="boxFooter">
          <Social url={facebook}>
            <FaFacebook />   
          </Social>

          <Social url={instagram}>
            <FaInstagram />   
          </Social>

          <Social url={linkedin}>
            <FaLinkedin />   
          </Social>

          <Social url={github}>
            <FaGithub />   
          </Social>
        </footer>

    </div>
  )
}