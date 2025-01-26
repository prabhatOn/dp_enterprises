
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import MainLayout from '@/components/layout/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <div className='pt-24 w-[100%] overflow-hidden bg-gradient-to-b from-[#152C47] to-[#031224]'>
      <Component {...pageProps} />
      </div>
    </MainLayout>
  );
}

export default MyApp;
