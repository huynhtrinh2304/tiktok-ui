import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';

import { HeaderOnly } from '~/components/Layout';
import routesConfig from '~/config/routes';

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.profile, component: Profile },
  { path: routesConfig.following, component: Following, layout: null },
  { path: routesConfig.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
