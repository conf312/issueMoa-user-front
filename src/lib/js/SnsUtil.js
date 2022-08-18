import { gapi } from "gapi-script";
const { naver, Kakao } = window;

export function initializeSocialLogin() {
  // Naver
  const naverLogin = new naver.LoginWithNaverId({
    clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
    callbackUrl: "http://localhost:3000/sign-in", 
    isPopup: false,
    loginButton: { color: "green", type: 1, height: "70" }
  });
  naverLogin.init();

  naverLogin.getLoginStatus(async function (status) {
    if (status) {
      console.log("[NAVER] getLoginStatus success")
      const userid = naverLogin.user.getEmail();
      const username = naverLogin.user.getName();
      console.log(userid)
      console.log(username)
    } else {
      console.log("[NAVER] getLoginStatus fail");
    }
  });   

  // Google 
  function start() {
    gapi.client.init({
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      scope: 'email',
    });
  }

  gapi.load('client:auth2', start);

  if (!Kakao.isInitialized()) {
    Kakao.init(process.env.REACT_APP_KAKAO_SCRIPT_KEY);
  }

  // Kakao
  Kakao.Auth.createLoginButton({
    container: '#kakao-login-btn',
    success: function(authObj) {
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          console.log(res)
        },
        fail: function(error) {
          console.log(
            'KAKAO login success, but failed to request user information: ' +
            JSON.stringify(error)
          )
        }
      })
    },
    fail: function(err) {
      alert('failed to login: ' + JSON.stringify(err))
    }
  })
}

export function bridge(type, method) {
  
  let url = "";
  if ("naver" === type) {
    
  } else if ("kakao" === type) {
    url = "";
  } else if ("google" === type) {
    url = "";
  }

  if ("login" === method) {
    login(url);
  } else if ("join" === method) {
    join(url);
  } else if ("share" === method) {
    share(url);
  }
}

function login(url) {
}

function join(url) {
}

function share(url) {
}