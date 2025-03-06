import { IRoute } from './model';
import { lazy } from 'react';
import { adminRouterPath, routerPaths } from './router-paths';

//layout
const HeaderLayout = lazy(() => import('@/layouts/portal-layout/HeaderLayout'));
const AdminLayout = lazy(() => import('@/layouts/admin-layout/AdminLayout'));

//portal-pages
const NotFound = lazy(() => import('@/pages/portal-pages/not-found/NotFound'));
const Test = lazy(() => import('@/pages/portal-pages/test/Test'));
const Zustand = lazy(() => import('@/pages/portal-pages/test/Zustand'));
const Tanstack = lazy(() => import('@/pages/portal-pages/test/Tanstack'));
const Socket = lazy(() => import('@/pages/portal-pages/test/Socket'));
const User = lazy(() => import('@/pages/portal-pages/user/User'));
const Comment = lazy(() => import('@/pages/portal-pages/comment/Comment'));
const Home = lazy(() => import('@/pages/portal-pages/home'));

//admin-pages
const Dashboard = lazy(() => import('@/pages/admin-pages/dashboard/Dashboard'));

const routers: IRoute[] = [
  {
    name: 'portal-layout',
    path: routerPaths.home,
    element: HeaderLayout,
    children: [
      {
        exact: true,
        name: 'home',
        path: routerPaths.home,
        element: Home,
        meta: { pageTitle: 'Home' },
      },
      {
        exact: true,
        name: 'comment',
        path: '/comment',
        element: Comment,
        meta: { pageTitle: 'Comment' },
      },
      {
        exact: true,
        name: 'user',
        path: '/user',
        element: User,
        meta: { pageTitle: 'User' },
      },
      {
        exact: true,
        name: 'test',
        path: '/test',
        element: Test,
        meta: { pageTitle: 'Test' },
      },
      {
        exact: true,
        name: 'zustand',
        path: '/zustand',
        element: Zustand,
        meta: { pageTitle: 'Zustand' },
      },
      {
        exact: true,
        name: 'tanstack',
        path: '/tanstack',
        element: Tanstack,
        meta: { pageTitle: 'Tanstack' },
      },
      {
        exact: true,
        name: 'socket',
        path: '/socket',
        element: Socket,
        meta: { pageTitle: 'Socket' },
      },
    ],
  },
  {
    name: 'admin-layout',
    path: routerPaths.home,
    element: AdminLayout,
    children: [
      {
        exact: true,
        name: 'Dashboard',
        path: adminRouterPath.test,
        element: Dashboard,
        meta: { pageTitle: 'Dashboard' },
      },
    ],
  },
  { path: '*', name: '404', element: NotFound, meta: { pageTitle: '404' } },
  { path: '/404', name: '404page', element: NotFound, meta: { pageTitle: '404' } },
];

export default routers;
