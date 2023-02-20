import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./PageRoutes";
import { AppContextProvider } from "./context/AppContext";
import { AnimationContextProvider } from "./context/AnimationContext";
import { UserContextProvider } from "./context/UserContext";
import { FC } from "react";
import { Layout } from "./Layout";
import { ModalProvider, PopUpProvider } from "@lukasbriza/lbui-lib";
import { AxiosHandler } from "./AxiosHandler";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <PopUpProvider>
        <AppContextProvider>
          <AnimationContextProvider>
            <UserContextProvider>
              <ModalProvider>
                <AxiosHandler>
                  <Layout>
                    <PageRoutes />
                  </Layout>
                </AxiosHandler>
              </ModalProvider>
            </UserContextProvider>
          </AnimationContextProvider>
        </AppContextProvider>
      </PopUpProvider>
    </BrowserRouter>
  );
};
