import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IRoute } from './model';
import { Suspense } from 'react';

const RouteList = (list: IRoute[]) => list?.map?.((route) => RouteItem(route)).filter((item) => item);

const RouteItem = (route: IRoute) => (
  <Route key={route.name} path={route.path} element={RenderSuspense(route)}>
    {RouteList(route.children ?? [])}
  </Route>
);

const RenderSuspense = (route: IRoute) =>
  route.element && (
    <Suspense fallback={<></>}>
      <route.element />
    </Suspense>
  );

interface IRouter {
  routers: IRoute[];
}
const Router = ({ routers }: IRouter) => {
  return (
    <BrowserRouter>
      <Routes>{RouteList(routers)}</Routes>
    </BrowserRouter>
  );
};

export default Router;
