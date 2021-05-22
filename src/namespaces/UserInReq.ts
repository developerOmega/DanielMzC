// import ses

import session from 'express-session'; 

declare namespace Express {
  export interface Request {
    admin: any
  }
}


declare module 'express-session' {
  export interface SessionData {
    admin: any;
    token: string;
  }
}