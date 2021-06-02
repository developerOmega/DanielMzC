import hbs = require('hbs');
import moment = require('moment');

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

  hbs.registerHelper("date_time", (date) => {
    return moment( date ).format('DD/MM/YYYY')
  })
}


export default setHelpersHBS;