import '../config/animationRegistration.js';

import { BrowserRouter } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'
import { AppContextProvider } from './context/AppContext';
import { AnimationContextProvider } from './context/AnimationContext';
import { UserContextProvider } from './context/UserContext';
import { FC } from 'react';
import { Layout } from './Layout';




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
