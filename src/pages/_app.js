import "@/styles/globals.css";
import "@/styles/fonts.css"; // Import your fonts
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { NotificationProvider } from "@/context/NotificationProvider"; // Adjust the path as needed

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <title>Splash Service Hub</title>
        <link
          rel="preload"
          href="/fonts/Gotham-Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Black.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </Head>
      <NotificationProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </NotificationProvider>
    </>
  );
}
