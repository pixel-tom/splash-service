import "@/styles/globals.css";
import "@/styles/fonts.css"; // Import your fonts
import Head from "next/head";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // To ensure consistent baseline styles
import theme from '@/theme'; // Adjust the path if needed
import { NotificationProvider } from "@/context/NotificationProvider"; // Adjust the path as needed

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures baseline styles like consistent margin, padding, etc. */}
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
          <div className="bg-gray-100 min-h-screen">
            <Component {...pageProps} />
          </div>
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
}
