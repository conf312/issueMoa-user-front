import { Button } from 'react-bootstrap';
import { celebrate } from '../../images';

function getSignInPage() {
  window.location.href = "/SignIn";
}

function SignUpComplete() {
  return (
    <div className="container text-center" style={{width:"550px", height:"850px", marginTop:"8%"}}>
      <img src={celebrate} alt="person" height={"200px"}/>
      <h2 className="fw-bold text-light">Welcome to IssueMoa!</h2>
      <Button className="mt-3 fw-bold" type="submit" onClick={getSignInPage} style={{width:"326px", height:"50px"}}>Go to login</Button>
    </div>
  );
}

export default SignUpComplete;