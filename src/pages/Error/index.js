import './error.css';
import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';

export default function Error() {
  return(
    <div className="containerError">
      <Logo />
      <h1 className="titleError">Página não encontrada!!</h1>
      <p className="pError">Esta página que está procurando não existe!</p>

      <Link to="/">
        <button className="btnBack">Voltar para Home</button>
      </Link>
    </div>
  )
}