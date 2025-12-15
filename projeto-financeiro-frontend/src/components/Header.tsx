import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/categorias">Categorias</Link> |{" "}
      <Link to="/pessoas">Pessoas</Link> |{" "}
      <Link to="/transacoes">Transações</Link>
    </nav>
  );
};

export default Header;
