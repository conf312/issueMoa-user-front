import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Main, Footer, SignIn, SignUp, SignUpComplete, MyPage, News } from './components';
import PrivateRoute from './components/route/PrivateRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path="/" element={ <Main/> }/>
          <Route exact path="/sign-in" element={ <SignIn/> }/>
          <Route exact path="/sign-up" element={ <SignUp/> }/>
          <Route exact path="/sign-up/complete" element={ <SignUpComplete/> }/>
          <Route exact path="/news" element={ <News type="more" /> }/>
          <Route exact path="/" element={ <PrivateRoute/> }>
            <Route exact path='/my-page' element={ <MyPage/> }/>
          </Route>
          {/* paramter props <Route exact path="/info" render={() => <Info userInfo={userInfo} />} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
export default App;
