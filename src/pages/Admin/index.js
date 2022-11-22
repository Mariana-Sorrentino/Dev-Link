import React, { useState, useEffect } from 'react';
import './admin.css';
import { Header } from '../../components/Header';
import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input'
import { MdAddLink } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { db } from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';


export default function Admin() {

  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#f8f8f8");
  const [textColorInput, setTextColorInput] = useState("#121212");
  
  const [links, setLinks] = useState([]);

  useEffect(() => {

    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc"))

    //O onSnapshot fica monitorando e verificando as atualizações do banco "links"
    onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
          lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
    })

  }, [])

  async function handleRegister(e){
    e.preventDefault();

    if(nameInput === '' || urlInput === '') {
      toast.warn("Preencha todos os campos!")
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
    .then(() => {
      toast.success("Link salvo com sucesso! 😉")
      setNameInput("")
      setUrlInput("")
      setBackgroundColorInput("#f8f8f8");
      setTextColorInput("#121212")
    })
    .catch((error) => {
      console.log("Ops! Erro ao salvar seu Link!" + error)
      toast.error("Ops! Erro ao salvar seu Link!")
    })
  
  }

  async function handleDeleteLink(id){
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
    toast.info("Link deletado com sucesso! ❌")
  }

  return (
    <div className="adminContainer">

      <Header />

      <Logo />

      <form onSubmit={handleRegister} className="formAdmin">

      <h2 className="titleAdmin">Add <GoPlus /> Link:</h2>

        <label className="labelAdmin">Nome do Link</label>
        <Input 
          placeholder="Nome do Link..."
          value={nameInput}
          onChange={ (e) => setNameInput(e.target.value)}
        />

        <label className="labelAdmin">URL do Link</label>
        <Input 
          type="url"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={ (e) => setUrlInput(e.target.value)}
        />

        <section className="boxColors">
          <div>
            <label className="labelAdmin right">Fundo do Link</label>
            <input 
              type="color"
              value={backgroundColorInput}
              onChange={ (e) => setBackgroundColorInput(e.target.value)}
            />
          </div>

          <div>
            <label className="labelAdmin right">Cor do Link</label>
            <input 
              type="color"
              value={textColorInput}
              onChange={ (e) => setTextColorInput(e.target.value)}
            />
          </div>

        </section>

      {/* Só vai aparecer a div "boxPreview" caso uver algo digitanos 
      em "nameInput", caso contrário, ela não aparece */}
      {nameInput !== '' && (
        <div className="boxPreview">
          <label className="labelAdmin">Seu Link ficara assim 👇</label>
          <article className="list"  style={{ backgroundColor: backgroundColorInput }} >
            <p style={{ color: textColorInput }}>{nameInput}</p>
          </article>
        </div>
      )}

        <button type="submit" className="btnRegister">
          Salvar Link <MdAddLink size={24} color="#f8f8f8" />
        </button>

      </form>

      <h2 className="titleMyLinks">
        Meus Links
      </h2>

      { links.map( (item, index) => (
        
          <article 
              key={index}
              className="list animatePop"
              style={{ backgroundColor: item.bg }}      
            >
              <a href={item.url} target="blank" >
                <div className="boxP">
                  <p style={{ color: item.color }}>
                    {item.name}
                  </p>
                </div>
              </a>
              <div>
                <button className="btnDelete" onClick={ () => handleDeleteLink(item.id) }>
                  <FiTrash2 size={20} color="#f8f8f8"/>
                </button>
              </div>
          </article>
      ))}
      
    </div>
  )
}