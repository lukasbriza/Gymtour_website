//CONTEXT//
import {AnimationContextProvider, AppContextProvider} from './Context'

function App() {
  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <div className="App">
          TEST
        </div>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}

export default App;
