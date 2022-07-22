import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Main, Footer, SignIn, SignUp } from './components';

function App() {
  return (
    <div className="h-auto">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path="/" element={ <Main/> }/>
          <Route exact path="/SignIn" element={ <SignIn/> }/>
          <Route exact path="/SignUp" element={ <SignUp/> }/>
          {/* <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/join" element={ <Join /> } /> */}
          {/* <Route exact path='/mypage' element={ <Mypage/> } /> */}
          
          {/* <Route exact path="/" element={ <PrivateRoute /> }>
            <Route exact path='/mypage' element={ <Mypage/> } />
          </Route> */}

          {/* <Route exact path="/mypage" element={ <Mypage /> } /> */}
          {/* paramter props <Route exact path="/info" render={() => <Info userInfo={userInfo} />} /> */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

export default App;
