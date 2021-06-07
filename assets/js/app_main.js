import OpenScript from "./open_script";
import LoginScript from './login_script';
import NavScrollScript from "./nav_scroll_script";


const scripts = [
  new LoginScript('/admin_panel/login'),
  new NavScrollScript('/')
]

const openScript = new OpenScript( scripts );
openScript.on();