import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './home.css';
import { Logo } from '../../components/Logo';
import { Header } from '../../components/Header';
import { Social } from '../../components/Social';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { BiLogIn } from 'react-icons/bi';
import { db } from '../../services/firebaseConnection';
import { getDocs,
         collection,
         orderBy,
         query,
         doc,
         getDoc,
} from 'firebase/firestore';
import { auth } from "../../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";


export default function Home() {

  const [links, setLinks] = useState([]);
  const[socialLinks, setSocialLinks] = useState({})

  useEffect(() => {

    function loadLinks() {
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push ({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })

        setLinks(lista);

      })
    }

    loadLinks();

  }, [])

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

  useEffect(() => {

    function loadSocialLinks() {
      const docRef = doc(db, "Social", "link")

      getDoc(docRef)
      .then((snapshot) => {

        if(snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            linkedin: snapshot.data().linkedin,
            github: snapshot.data().github
          })
        }
      }) 
    }

    loadSocialLinks();
    
  }, [])

  function btnLogin() {
    if(loading !== true && signed !== false) {
      return (
        <Header />
      )
    }
  
    if(!signed) {
      return (
        <div className="boxBtnLogin">
          <Link  className="btnLoginHome"  to="/login">      
              Ir para Login <BiLogIn size={24} color="#f8f8f8" />          
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="homeContainer">
      <div className="boxBaseHome">

      {/* {loading !== true && signed !== false && (
        <Header />
      )}        */}

      {btnLogin()}
        
        <Logo />

        <h2 className="homeTitle">Lista de Links 👇</h2>

        <main className="links">

        { links.map((item) => (
          
          <section key={item.id} className="linkArea animatePop" style={{ backgroundColor: item.bg }}>
            <a href={item.url} target="blank">
              <p className="linkText" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>

        ))}

        {/* {!signed === true && signed === false && (

          <div className="boxBtnLogin">
            <Link  className="btnLoginHome"  to="/login">      
                Ir para Login <BiLogIn size={24} color="#f8f8f8" />          
            </Link>
          </div>
        )} */}

          {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
            <footer className="boxFooter">
              <Social url={(socialLinks?.facebook)}>
                <FaFacebook />   
              </Social>

              <Social url={(socialLinks?.instagram)}>
                <FaInstagram />   
              </Social>

              <Social url={(socialLinks?.linkedin)}>
                <FaLinkedin />   
              </Social>

              <Social url={(socialLinks?.github)}>
                <FaGithub />   
              </Social>
            </footer>
          )}

        </main>
       </div>
    </div>
  )
}