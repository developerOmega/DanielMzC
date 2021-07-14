import { server } from '../app';

import HomeRoute from './HomeRoute';
import BlogRoute from './BlogRoute';
import ProjectRoute from './ProjectRoute';
import AdminRoute from './AdminRoute';
import SliderRoute from './SliderRoute';
import SectionRoute from './SectionRoute';
import EmailRoute from './EmailRoute';

const addRouter = () => {
  server.app.use(HomeRoute);
  server.app.use(BlogRoute);
  server.app.use(ProjectRoute);
  server.app.use(AdminRoute);
  server.app.use(SliderRoute);
  server.app.use(SectionRoute);
  server.app.use(EmailRoute);
}

export default addRouter;
