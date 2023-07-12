import Header from "@/components/Header";
import "@/styles/globals.css";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const BaseComponent = Component as any;
  return (
    <>
      <Header />
      <BaseComponent {...pageProps} />
    </>
  );
};

export default App;
