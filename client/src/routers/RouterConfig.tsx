import { IRoute } from './model';
import { lazy } from 'react';
//pages
const NotFound = lazy(() => import('@/pages/not-found/NotFound'));
const Test = lazy(() => import('@/pages/test/Test'));
const Zustand = lazy(() => import('@/pages/test/Zustand'));
const Tanstack = lazy(() => import('@/pages/test/Tanstack'));
const Login = lazy(() => import('@/pages/auth/Auth'));

const routers: IRoute[] = [
  { name: 'test', path: '/test', element: Test, meta: { pageTitle: 'Test' } },
  { name: 'zustand', path: '/zustand', element: Zustand, meta: { pageTitle: 'Zustand' } },
  { name: 'tanstack', path: '/tanstack', element: Tanstack, meta: { pageTitle: 'Tanstack' } },
  { name: 'login', path: '/login', element: Login, meta: { pageTitle: 'Login' } },
  { path: '*', name: '404', element: NotFound, meta: { pageTitle: '404' } },
];

export default routers;
