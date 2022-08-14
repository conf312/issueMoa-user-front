import logo from '../../images/logo.png';
import { Button } from 'react-bootstrap';
import { Cookies } from "react-cookie";
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function getMainPage() {
  window.location.href = "/";
}

function getSignInPage() {
  window.location.href = "/sign-in";
}

function getSignUpPage() {
  window.location.href = "/sign-up";
}

function getMyPage() {
  window.location.href = "/my-page";
}

function getLogout() {
  AxiosUtil.send("GET", "/issuemoa/users/logout", "", "", (e) => { window.location.href="/"; });
}


const IsEligible = () => {
  return (
  <>
    <Button variant="link" className="link-light btn float-end fw-bold" onClick={getLogout}>Logout</Button>
    <Button variant="link" className="link-light border border-primary btn float-end fw-bold" onClick={getMyPage}>MyPage</Button>
  </>
  );
}

const NotEligible = () => {  
  return (
    <>
      <Button variant="link" className="link-light border border-primary btn float-end fw-bold" onClick={getSignUpPage}>Sign Up</Button>
      <Button variant="link" className="link-light btn float-end fw-bold" onClick={getSignInPage}>Sign In</Button>
    </>
  );
}

function Header() {
  let auth = new Cookies().get("accessToken") ? true : false;
  return (
    <header className="Issuemoa-header">
      <div>
        <img className="logo" alt="logo" src={logo} onClick={getMainPage}/>
        { auth && <IsEligible />}
        { !auth && <NotEligible />}
      </div>
    </header>
  );
}


export default Header;