import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';

import { HeaderOnly } from '~/components/Layout';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/@:nickname', component: Profile },
  { path: '/following', component: Following, layout: null },
  { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
