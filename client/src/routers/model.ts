import { JSX } from 'react';

export interface IRoute {
  name: string;
  path?: string;
  exact?: boolean;
  element?: React.LazyExoticComponent<(props?: A) => JSX.Element> | React.ComponentType;
  children?: IRoute[];
  meta?: IMeta;
}

export interface IMeta {
  subModules?: string[];
  role?: string[];
  pageTitle?: string;
  leftKey?: string;
}
