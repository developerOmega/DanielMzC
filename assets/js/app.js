import OpenScript from "./open_script";
import LoginScript from './login_script';

const scripts = [
  new LoginScript('/admin_panel/login')
]

const openScript = new OpenScript(scripts);
openScript.on();
