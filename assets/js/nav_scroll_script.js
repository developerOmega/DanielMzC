import Open from "./open";

export default class NavScrollScript extends Open {
  
  header;

  constructor(pathname) {
    super(pathname);
    this.header = document.querySelector('#header')
  }


  main() {

    let oldScroll = 0;

    window.onscroll = (e) => {

      // No hay scroll
      if( oldScroll == 0 ) {
        this.scrollOut();
      }
      // Scroll up      
      else if(window.scrollY < oldScroll) {
        this.scrollUp()
      }
      // Scroll down
      else {
        this.scrollDown()
      }
      
      oldScroll = window.scrollY;
    }
  }

  scrollUp() {
    this.header.className = "header watch in-up"
  }

  scrollDown() {
    this.header.className = "header watch in-down"
  }

  scrollOut() {
    this.header.className = "header"
  }

}