import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { PageRoutes } from "./PageRoutes";
import { FC } from "react";
import { Layout } from "./Layout";
import { ModalProvider, PopUpProvider } from "@lukasbriza/lbui-lib";
import { AxiosHandler } from "./AxiosHandler";
import { AnimationContextProvider, AppContextProvider, ImageStoreProvider, UserContextProvider } from "@app";
import "../i18n/i18n"

export const App: FC = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <PopUpProvider portalPosition={["center", "up"]}>
          <AppContextProvider>
            <AnimationContextProvider>
              <ImageStoreProvider>
                <UserContextProvider>
                  <ModalProvider>
                    <AxiosHandler>
                      <Layout>
                        <PageRoutes />
                      </Layout>
                    </AxiosHandler>
                  </ModalProvider>
                </UserContextProvider>
              </ImageStoreProvider>
            </AnimationContextProvider>
          </AppContextProvider>
        </PopUpProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
};
