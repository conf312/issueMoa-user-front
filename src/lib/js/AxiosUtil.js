import axios from 'axios';
import { Cookies } from "react-cookie";

const cookies = new Cookies();
axios.defaults.withCredentials = true;

export function send(method, url, param, type, callback) {
    axios.defaults.headers.common['X-CLIENT-KEY'] = "SamQHPleQjbSKeyRvJWElcHJvamVjdCFA";
    axios.defaults.headers.common['Authorization'] = "Bearer " + cookies.get("accessToken");
    const contentType = type === "json" ? "application/json" : "multipart/form-data";
    
    if (method === "GET") {
        axios.get(url, param)
        .then(function (response) {
            console.log("==> axios GET then");
            callback (response.data);

            if (url.indexOf("logout") > -1) {
                axios.defaults.headers.common['Authorization'] = "";
                cookies.remove("accessToken");
            }
        })
        .catch(function (error) {
            console.log("==> axios GET error");
            console.log(error);
        });
    } else if (method === "POST") {
        alert("POST!");  
        console.log(param)
        axios.post(url, param, { 
          headers: { "Content-Type": contentType }
        })
        .then(function (response) {
            console.log("==> axios POST then");
            callback (response.data);
        })
        .catch(function (error) {
            console.log("==> axios POST error");
            console.log(error);
        });
    } else {
        console.log("==> AxiosUtil Type Error!");
    }
}