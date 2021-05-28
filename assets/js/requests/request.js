import { getCookie } from "../cookies";

export default class Request {
  url = "http://localhost:3000";
  token = getCookie('token');

  async getReq(link) {

  }

  async setReq(link, data) {
    try {
      
      const query = `${this.url}${link}`;
      const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token 
        }
      }

      const req = await fetch(query, config);
      const result = await req.json();

      return result;

    } catch (error) {
      throw error
    }
  }
}