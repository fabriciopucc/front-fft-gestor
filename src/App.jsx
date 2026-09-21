import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import MenuBar from './components/layout/MenuBar'
import MessageBox from './components/utils/MessageBox';
import CardLoader from './components/utils/CardLoader';

import useRoutes from './hooks/useRoutes';

import PrivatePage from './pages/custom/PrivatePage';
import PublicPage from './pages/custom/PublicPage';


function App() {

  const {verificarSeARotaEPublica, verificarSeARotaEPrivada} = useRoutes();

  return (
    <>
      <MessageBox/>
      <CardLoader/>
      
      <Header/>
      <MenuBar/>

      {
        verificarSeARotaEPublica() ? (
          <PublicPage>
            <Outlet/>
          </PublicPage>
        ) : verificarSeARotaEPrivada() && (
          <PrivatePage>
            <Outlet/>
          </PrivatePage>
        ) 
      }
    </>
  )
}

export default App;
