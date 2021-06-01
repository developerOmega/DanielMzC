import hbs = require('hbs');
import Blog from '../Models/Blog';

const setHelpersHBS = () => {
  hbs.registerHelper('checked', (data, value) => {
    return data == value ? "checked" : ''
  });

  hbs.registerHelper("super_admin", (value) => {
    return value == true ? "Si" : "No"
  });

  hbs.registerHelper("is_url", (url) => {
    return !url ? "No hay url" : url
  })

  hbs.registerHelper("admin_of_blog", async (blog_id) => {
    try {
      const blog = await Blog.byId(blog_id);
      const admin = await blog.admin();
      return admin.name;      
    } catch (error) {
      return "Truman Burbank"
    }
  })
}


export default setHelpersHBS;