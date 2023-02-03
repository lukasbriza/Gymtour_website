import { BrowserRouter } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'
import { AppContextProvider } from './context/AppContext';
import { AnimationContextProvider } from './context/AnimationContext';
import { UserContextProvider } from './context/UserContext';
import { FC } from 'react';
import { Layout } from './Layout';




export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AnimationContextProvider>
          <UserContextProvider>
            <Layout>
              <PageRoutes />
            </Layout>
          </UserContextProvider>
        </AnimationContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}
