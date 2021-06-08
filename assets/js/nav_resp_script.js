import Open from './open';

export default class NavRespScript extends Open {
  btnNav;
  btnNavDrop;
  nav;
  container;

  constructor(pathname) {
    super(pathname);
    this.btnNav = document.querySelector('#btn-nav');
    this.btnNavDrop = document.querySelector('#btn-nav-drop');
    this.nav = document.querySelector('#nav-resp');
    this.container = document.querySelector('.container');
  }

  main() {
    console.log(this.btnNav);
    
    this.btnNav.onclick = e => this.onNav();
    this.btnNavDrop.onclick = e => this.offNav();

  }

  onNav() {
    this.nav.className = "nav-screen view-nav in-right-nav";
  }

  offNav() {
    this.nav.className = "nav-screen view-nav in-left-nav";
    setTimeout(() => this.nav.className = "nav-screen none", 500 );
  }
  
}
