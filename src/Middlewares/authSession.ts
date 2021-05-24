import { Request, Response, NextFunction } from 'express';

// Middleware que valida la existencia de la sesion de usuario
const authSession = (req: Request, res: Response, next: NextFunction) => {
  
  // Si la sesion no existe, regresar a la pagina anterior
  if( !req.session.admin ) {
    return res.redirect('back');
  }

  next();
}

export { authSession };