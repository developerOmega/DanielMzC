import Open from './open';
import Request from './requests/request';
import { setCookie } from './cookies';

export default class LoginScript extends Open{
  constructor(pathname) {
    super(pathname)
  }

  main() {
    const login = document.querySelector('#login');
    login.addEventListener('submit', async (e) => {
      e.preventDefault();

      const logReq = new Request();

      // Peticion a request de autenticacion
      const data = await logReq.setReq('/api/v1/auth', {
        email: e.target.email.value,
        password: e.target.password.value
      });
      
      // Agregar cookie de token
      setCookie('token', data.token);

      e.target.submit();
    })
  }
}
