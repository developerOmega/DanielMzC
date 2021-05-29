import OpenScript from "./open_script";
import LoginScript from './login_script';
import FileOpen from "./file_script";

const scripts = [
  new LoginScript('/admin_panel/login'),
  new FileOpen('/admin_panel/blogs/show/:id')
]

const openScript = new OpenScript(scripts);
openScript.on();
