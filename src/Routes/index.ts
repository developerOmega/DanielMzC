import { server } from '../app';

import HomeRoute from './HomeRoute';
import BlogRoute from './BlogRoute';
import ProjectRoute from './ProjectRoute';

const addRouter = () => {
  server.app.use(HomeRoute);
  server.app.use(BlogRoute);
  server.app.use(ProjectRoute);
}

export default addRouter;