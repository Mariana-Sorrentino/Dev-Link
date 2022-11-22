import './header.css';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

export function Header() {

  async function handleLogout(){
    await signOut(auth);
    toast.info("Até mais! 👋")
  }

  return(
   <div className="boxContainer">
     <header className="headerContainer">
      <nav className="navContainer">
        <button onClick={handleLogout} className="btnLogOut">
          <BiLogOut />
        </button>

        <Link to="/admin">
          Links
        </Link>

        <Link to="/admin/social">
          Redes Sociais
        </Link>

      </nav>
    </header>
   </div>
  )
}