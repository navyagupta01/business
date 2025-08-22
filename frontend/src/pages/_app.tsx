import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/animations.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
// import PageTransition from '../components/PageTransition'; // Already commented out ✓

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* Remove this line: <PageTransition /> */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
