import Request from "./request";

export default class RequestFile extends Request {
  setConfig( method, body = {} ){
    return {
      method,
      body,
      headers: {
        'Authorization': this.token 
      }
    }
  }
}
