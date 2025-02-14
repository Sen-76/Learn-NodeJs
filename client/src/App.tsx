import Router from './routers/Router';
import routers from './routers/RouterConfig';

const App = () => {
  return (
    <div>
      <Router routers={routers}></Router>
    </div>
  );
};

export default App;

