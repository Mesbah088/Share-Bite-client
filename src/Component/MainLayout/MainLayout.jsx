
import Container from '../../Shared/Container';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
      <Container>
          <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
      </Container>
    );
};

export default MainLayout;