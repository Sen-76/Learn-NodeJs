import { IRoute } from './model';
import { lazy } from 'react';
import { routerPaths } from './router-paths';
//pages
const NotFound = lazy(() => import('@/pages/not-found/NotFound'));
const Test = lazy(() => import('@/pages/test/Test'));
const Zustand = lazy(() => import('@/pages/test/Zustand'));
const Tanstack = lazy(() => import('@/pages/test/Tanstack'));
const Socket = lazy(() => import('@/pages/test/Socket'));
const User = lazy(() => import('@/pages/user/User'));
const Comment = lazy(() => import('@/pages/comment/Comment'));
const Home = lazy(() => import('@/pages/home'));
const HeaderLayout = lazy(() => import('@/layouts/HeaderLayout'));

const routers: IRoute[] = [
  {
    name: 'layout',
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
  { path: '*', name: '404', element: NotFound, meta: { pageTitle: '404' } },
  { path: '/404', name: '404page', element: NotFound, meta: { pageTitle: '404' } },
];

export default routers;
