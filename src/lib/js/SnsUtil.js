export function bridge(type, method) {
  let url = "";
  if ("naver" === type) {
    url = "";
  } else if ("kakao" == type) {
    url = "";
  } else if ("google" == type) {
    url = "";
  }

  if ("login" === method) {
    login(url);
  } else if ("join" == method) {
    join(url);
  } else if ("share" == method) {
    share(url);
  }
}

function login(url) {
}

function join(url) {
}

function share(url) {
}