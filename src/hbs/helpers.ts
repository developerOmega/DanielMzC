import hbs = require('hbs');

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
}


export default setHelpersHBS;