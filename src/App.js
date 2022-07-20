import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Topic, News } from './components/support';
import { Tab, Tabs, Carousel, Button } from 'react-bootstrap';
import logo from './images/logo.png';

function App() {
  return (
    <div className="Issuemoa-div">
      <div>
        <header className="Issuemoa-header">
          <div className="p-3">
            <img src={logo} className="logo" alt="logo"/>
            <Button variant="link" className="btnLogin float-end fw-bold">Sign in</Button>
          </div>
        </header>
      </div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://1.bp.blogspot.com/-ACs0W9CKqgk/XP29557DNRI/AAAAAAAAB3s/oDuo8NPJVjAVyPWrLC5D0fF3FUPpTx82QCLcBGAs/s1600/44.gif"
              alt="First slide"
              height={"700px;"}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://1.bp.blogspot.com/-h_b7Xv7HAsk/XP298EENDEI/AAAAAAAAB4A/jYLTzHkmfyo4ztMzXrz-mwHOuvCCWFj_QCLcBGAs/s1600/99.gif"
              alt="Second slide"
              height={"700px;"}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="m-5">
        <Tabs
            defaultActiveKey="topic"
            id="uncontrolled-tab-example"
            className="h4 mt-5 fw-bold"
            >
          <Tab eventKey="topic" title="Topic">
            <Topic/>
          </Tab>
          <Tab eventKey="news" title="News">
            <News/>
          </Tab>
        </Tabs>
      </div>
      <div>
        <footer>
          <div class="card mt-5">
            <div class="card-body text-center">
              <p class="card-text"><small class="text-muted">Copyright © issueMoa Corp. All Rights Reserved.</small></p>
            </div>
          </div>
        </footer>
      </div>
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
