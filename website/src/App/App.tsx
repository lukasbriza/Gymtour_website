import '../config/animationRegistration.js';

import { BrowserRouter } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'
import { AppContextProvider } from './context/AppContext.js';
import { AnimationContextProvider } from './context/Animationcontext.js';
import { UserContextProvider } from './context/UserContext.js';
import { FC } from 'react';
import { Layout } from './Layout.js';




export const App: FC = () => {
  return (
    <AppContextProvider>
      <AnimationContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <Layout>
              <PageRoutes />
            </Layout>
          </BrowserRouter>
        </UserContextProvider>
      </AnimationContextProvider>
    </AppContextProvider>
  );
}
