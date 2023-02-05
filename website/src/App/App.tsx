import { BrowserRouter } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'
import { AppContextProvider } from './context/AppContext';
import { AnimationContextProvider } from './context/AnimationContext';
import { UserContextProvider } from './context/UserContext';
import { FC } from 'react';
import { Layout } from './Layout';
import { ModalProvider } from '@lukasbriza/lbui-lib';




export const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <AnimationContextProvider>
          <UserContextProvider>
            <ModalProvider>
              <Layout>
                <PageRoutes />
              </Layout>
            </ModalProvider>
          </UserContextProvider>
        </AnimationContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}
