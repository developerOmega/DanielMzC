import session from 'express-session'; 

declare module 'express-session' {
  export interface SessionData {
    admin: any;
    token: string
  }
}