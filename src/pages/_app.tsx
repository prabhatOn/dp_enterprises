
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <div className='pt-24 w-screen bg-white'>
      <Component {...pageProps} />
      </div>
    </MainLayout>
  );
}

export default MyApp;
