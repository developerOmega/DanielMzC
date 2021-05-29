import OpenScript from "./open_script";
import LoginScript from './login_script';
import FileOpen from "./file_script";

const scripts = [
  new LoginScript('/admin_panel/login'),
  new FileOpen('blogs', 'main_img', '/admin_panel/blogs/show/:id'),
  new FileOpen('projects', 'main_img', '/admin_panel/projects/show/:id'),
]

const openScript = new OpenScript(scripts);
openScript.on();
