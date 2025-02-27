import Router from './routers/Router';
import routers from './routers/RouterConfig';
import './App.css';
import Layout from './Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { SocketProvider } from './hooks/useSocket';

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <Layout>
            <Router routers={routers}></Router>
          </Layout>
        </SocketProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;

