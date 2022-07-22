import logo from '../../images/logo.png';
import { Button } from 'react-bootstrap';

function getMainPage() {
  window.location.href = "/";
}

function getSignInPage() {
  window.location.href = "/SignIn";
}

function getSignUpPage() {
  window.location.href = "/SignUp";
}

function Header() {
  return (
    <header className="Issuemoa-header">
      <div className="p-3">
        <img src={logo} className="logo" alt="logo" onClick={getMainPage}/>
        <Button variant="link" className="link-primary border border-primary btnLogin float-end fw-bold" onClick={getSignUpPage}>Sign Up</Button>
        <Button variant="link" className="link-dark btnLogin float-end fw-bold" onClick={getSignInPage}>Sign In</Button>
      </div>
    </header>
  );
}


export default Header;