import { server } from '../app';

import HomeRoute from './HomeRoute';

const addRouter = () => {
  server.app.use(HomeRoute);
}

export default addRouter;