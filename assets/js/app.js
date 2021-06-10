import OpenScript from "./open_script";
import LoginScript from './login_script';
import FileOpen from "./file_script";
import SectionScript from "./section_script";
import SectionRequestScript from "./section_request_script";
import TextEditorScript from "./text_editor_script";
import ViewBlogScript from "./view_blog_script";

const scripts = [
  new LoginScript('/admin_panel/login'),
  new FileOpen('blogs', 'main_img', '/admin_panel/blogs/show/:id'),
  new FileOpen('sliders', 'img', '/admin_panel/sliders/show/:id'),
  new FileOpen('projects', 'main_img', '/admin_panel/projects/show/:id'),
  new SectionScript('/admin_panel/projects/show/:id'),
  new SectionRequestScript('/admin_panel/projects/show/:id'),
  new TextEditorScript('/admin_panel/blogs/edit/:id'),
  new TextEditorScript('/admin_panel/blogs/new'),
  new ViewBlogScript('#content-blog', '/admin_panel/blogs/show/:id')
]


const openScript = new OpenScript(scripts);
openScript.on();
