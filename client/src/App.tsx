import Router from './routers/Router';
import routers from './routers/RouterConfig';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SocketProvider } from './hooks/useSocket';
import MainLayout from './layouts/MainLayout';

const queryClient = new QueryClient();

const App = () => {
  return (
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <MainLayout>
          <Router routers={routers}></Router>
        </MainLayout>
      </SocketProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    // </StrictMode>
  );
};

export default App;
