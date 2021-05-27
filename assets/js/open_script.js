export default class OpenScript{
  constructor(content){
    this.content = content;
  }

  on () {

    let pathname = '';
    const open = this.content.filter( data => {
      pathname = this.changePathname(window.location.pathname, data.pathname);
      return data.pathname == pathname;
    } );

    return open[0] ? open[0].main() : {};
  }

  changePathname ( pathname, pathnameData ) {
    let number = pathname.match(/[0-9]/g);
    let placeholder = !pathnameData.match(/:[a-z]+/g) ? null : pathnameData.match(/:[a-z]+/g)[0];
    
    if (!number || !placeholder) {
      return pathname;
    }

    number = number.join('');
    return pathname.replace(number, ':id');
  }
}