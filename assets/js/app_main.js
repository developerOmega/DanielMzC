import OpenScript from "./open_script";
import LoginScript from './login_script';
import NavScrollScript from "./nav_scroll_script";
import NavRespScript from './nav_resp_script';
import Slider from './plugins/slider';

const scripts = [
  new LoginScript('/admin_panel/login'),
  new NavScrollScript('/'),
  new NavRespScript('/')
]



const slider =new Slider.on(document.querySelector("#slider"), [
  {
    img: "img",
    description: "Desc",
    url: "www.google.com"
  }
]);

slider.active(5000);



console.log(slider);

const openScript = new OpenScript( scripts );
openScript.on();