import Open from './open';

export default class LoginScript extends Open{
  constructor(pathname) {
    super(pathname)
  }

  main() {
    console.log("Estamos en el auth")
  }
}
