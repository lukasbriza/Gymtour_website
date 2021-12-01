//COMPONENTS//
import {Menu} from '../Components/Menu'
//CONTEXT//
import {AnimationContextProvider, AppContextProvider} from './Context'
//ANIMATIONS//
import '../config/animationRegistration.js';
//ROUTER//
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {PageRoutes} from './PageRoutes'
//BROWSER HISTORY//
const history = createBrowserHistory()


function App() {

  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <div id="App">
          <Router history={history}>
            <Menu/>
            
                <PageRoutes/>
  
          </Router>
        </div>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}

export default App;
