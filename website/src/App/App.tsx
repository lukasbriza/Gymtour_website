//COMPONENTS//
import {Menu} from '../Components/Menu'
//CONTEXT//
import {AnimationContextProvider, AppContextProvider} from './Context'
//ROUTER//
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {PageRoutes} from './PageRoutes'
//BROWSER HISTORY//
export const history = createBrowserHistory()

function App() {

  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <div className="App">
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
