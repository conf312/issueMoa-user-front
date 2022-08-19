import { gapi } from "gapi-script";
import * as AxiosUtil from '../../lib/js/AxiosUtil';
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
      login(naverLogin.user);
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
          res.kakao_account.id = res.id;
          res.kakao_account.name = res.kakao_account.profile.nickname;
          login(res.kakao_account);
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
      console.log('failed to login: ' + JSON.stringify(err));
    }
  })
}

export function login(user) {
  console.log("==> [SNSUtil] login");
  const formData = new FormData();
  formData.append("socialId", user.id);
  AxiosUtil.send("POST", "/issuemoa/users/find-by/social-id", formData, "", (e) => {
    if (e.data) {
      window.location.href = "/";
    } else {
      window.location.href = `/sign-up/${user.email}/${user.name}`;
    }
  });
}