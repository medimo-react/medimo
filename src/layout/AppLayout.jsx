import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styles from './AppLayout.module.css'


const AppLayout = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;