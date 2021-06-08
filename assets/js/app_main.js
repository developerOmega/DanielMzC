import OpenScript from "./open_script";
import LoginScript from './login_script';
import NavScrollScript from "./nav_scroll_script";
import NavRespScript from './nav_resp_script';

const scripts = [
  new LoginScript('/admin_panel/login'),
  new NavScrollScript('/'),
  new NavRespScript('/')
]

const openScript = new OpenScript( scripts );
openScript.on();