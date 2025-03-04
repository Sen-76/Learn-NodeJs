import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute } from './model';
import { Suspense } from 'react';

const RouteList = (list: IRoute[]) => list?.map?.((route) => RouteItem(route)).filter((item) => item);

const RouteItem = (route: IRoute) => {
  const routerProps: A = {};
  if (route.exact) routerProps.exact = true;
  return (
    <Route {...routerProps} key={route.name} path={route.path} element={RenderSuspense(route)}>
      {RouteList(route.children ?? [])}
    </Route>
  );
};

const RenderSuspense = (route: IRoute) => {
  if (!route.element) return null;
  return (
    <Suspense fallback={<></>}>
      <route.element />
    </Suspense>
  );
};

interface IRouter {
  routers: IRoute[];
  children?: React.ReactNode;
}
const Router = ({ routers, children }: IRouter) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>{RouteList(routers)}</Routes>
    </BrowserRouter>
  );
};

export default Router;
