//CONTEXT//
import { AnimationContextProvider, AppContextProvider, UserContextProvider } from './Context'
//ANIMATIONS//
import '../config/animationRegistration.js';
//ROUTER//
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { PageRoutes } from './PageRoutes'
//BROWSER HISTORY//
const history = createBrowserHistory()


function App() {

  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <UserContextProvider>
          <div id="App">
            <Router history={history}>
              <PageRoutes />
            </Router>
          </div>
        </UserContextProvider>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}

export default App;
