import { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
