//COMPONENTS//
import { Menu } from '../Components/Menu'
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
              <Menu />

              <PageRoutes />

            </Router>
          </div>
        </UserContextProvider>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}

export default App;

/*
TO-DO
- setup cors policy
- prepare user login on server Auth0 

-log in preparation
-register form sucess message
-scrollbar styling
-form data processing

-update eventlistener logic > cleaner function
*/
