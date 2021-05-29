import { getCookie } from "../cookies";

export default class Request {
  url = "http://localhost:3000";
  token = getCookie('token');
  id = window.location.pathname.split('/') [window.location.pathname.split('/').length - 1];

  
  setConfig( method, body = {} ){
    return {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token 
      }
    }
  }

  async getReq(link) {
    
  }

  async setReq(link, data) {
    console.log("ENTRANDO EN SET")
    try {
      const config = this.setConfig('POST', data);
      const query = `${this.url}${link}`;
      
      const req = await fetch(query, config);
      const result = await req.json();

      return result;

    } catch (error) {
      throw error
    }
  }

  async updateReq(link, data) {
    try {
      
      const config = this.setConfig('PUT', data);
      const query = `${this.url}${link}`;

      const req = await fetch(query, config);
      const result = await req.json();

      return result;

    } catch (error) {
      throw error
    }
  }

  async deleteReq(link) {
    try {
      
      const config = this.setConfig('DELETE');
      const query = `${this.url}${link}`;

      const req = await fetch(query, config);
      const result = await req.json();

      return result;

    } catch (error) {
      throw error
    }
  }
}