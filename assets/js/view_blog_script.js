import Open from './open';

export default class ViewBlogScript extends Open {
  content;
  
  constructor(selector, pathname)  {
    super(pathname);
    this.content = document.querySelector(selector);
  }

  main() {
    this.content.innerHTML = this.tagHTML(this.content.innerHTML);
  }

  // Convertir ASCII a HTML
  tagHTML( data ) {

    // Tag menor que
    let lessTag = data.split('&lt;');
    lessTag = lessTag.join('<');

    // Tag mayor que
    let moreTag = lessTag.split('&gt;');
    moreTag = moreTag.join('>')

    // Tag ampersand
    let ampersand = moreTag.split('&amp;');
    ampersand = ampersand.join('&');
    
    return ampersand;
  }
} 
