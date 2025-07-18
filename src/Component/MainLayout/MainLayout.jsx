
import Container from '../../Shared/Container';
import Navbar from '../../Shared/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
      <Container>
          <div>
            <Navbar/>
            <Outlet/>
        </div>
      </Container>
    );
};

export default MainLayout;