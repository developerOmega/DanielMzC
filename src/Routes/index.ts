import { server } from '../app';

import HomeRoute from './HomeRoute';
import BlogRoute from './BlogRoute';
import ProjectRoute from './ProjectRoute';
import AdminRoute from './AdminRoute';
import SliderRoute from './SliderRoute';

const addRouter = () => {
  server.app.use(HomeRoute);
  server.app.use(BlogRoute);
  server.app.use(ProjectRoute);
  server.app.use(AdminRoute);
  server.app.use(SliderRoute);
}

export default addRouter;
