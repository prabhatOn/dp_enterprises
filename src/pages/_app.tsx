
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <div className='bg-neutral-50 min-h-screen'>
        <Component {...pageProps} />
      </div>
    </MainLayout>
  );
}

export default MyApp;
