import OpenScript from "./open_script";
import LoginScript from './login_script';
import NavScrollScript from "./nav_scroll_script";
import NavRespScript from './nav_resp_script';
import SliderScript from "./slider_script";

const scripts = [
  new LoginScript('/admin_panel/login'),
  new SliderScript('/')
]

// Activar acciones de nav scroll en todo el sitio
const navScroll = new NavScrollScript('/');
navScroll.main();

// Activar acciones de nav resp en todo el sitio
const navResp = new NavRespScript('/');
navResp.main();

const openScript = new OpenScript( scripts );
openScript.on();