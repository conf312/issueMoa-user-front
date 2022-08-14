const { naver } = window;

export function initializeNaverLogin() {
  const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const naverLogin = new naver.LoginWithNaverId({
      clientId: CLIENT_ID,
      callbackUrl: "http://localhost:3000/sign-in", 
      isPopup: false,
      loginButton: { color: "green", type: 1, height: "60" }
    });
    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        console.log("getLoginStatus success")
				const userid = naverLogin.user.getEmail();
				const username = naverLogin.user.getName();
        console.log(userid)
        console.log(username)
			} else {
        console.log("getLoginStatus fail");
      }
		});   
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