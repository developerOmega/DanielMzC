import { Request, Response, NextFunction } from 'express';

const authSuAdmin = (req: Request, res: Response, next: NextFunction) => {
  
  // Si el usuario no esta definido como super administrador, regresar a la pagina anterior
  if( req.session.admin.is_su_admin == false ) {
    return res.redirect(403, 'back');
  }

  next();

}

export { authSuAdmin }
