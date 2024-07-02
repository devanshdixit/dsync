import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user.context";
import { appConfig } from "../config/appConfig";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { polygon, polygonMumbai, mainnet } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  const { chains, provider, webSocketProvider } = configureChains(
    [polygon, polygonMumbai, mainnet],
    [publicProvider()]
  );
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  const { connectors } = getDefaultWallets({
    appName: "Dsync",
    chains,
  });
  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            chains={chains}
            modalSize="compact"
            theme={darkTheme()}
          >
            <UserProvider>
                <AnimatePresence mode="wait">
                  <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
            </UserProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </>
    );
  }
}
