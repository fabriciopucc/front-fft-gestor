import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

//Public pages
import Cadastro from './pages/public/Cadastro/index.jsx'
import Login from './pages/public/Login/index.jsx';
import RecuperarSenha from './pages/public/RecuperarSenha';
import ErrorPage from './pages/custom/ErrorPage';

//Private pages
import Menu from './pages/private/Menu/index.jsx';
import Configuracao from './pages/private/Configuracao/index.jsx';
import Estatisticas from './pages/private/Estatisticas';
import Gestao from './pages/private/Gestao/index.jsx';
import AdiconarAcao from './pages/private/AdicionarAcao/index.jsx';
import Categorias from './pages/private/Categorias/index.jsx';
import Despesas from './pages/private/Despesas/index.jsx';
import MeuPerfil from './pages/private/MeuPerfil/index.jsx';
import Cartoes from './pages/private/Cartoes';
import Fatura from './pages/private/Fatura';
import AlterarSenha from './pages/private/AlterarSenha';

//Providers
import AppProviders from './components/elements/AppProviders';


const router =  createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Cadastro/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/recuperarSenha",
        element: <RecuperarSenha/>
      },
      {
        path: "/adicionarAcao/:codigo",
        element: <AdiconarAcao/>
      },
      {
        path: "/menu",
        element: <Menu/>
      },
      {
        path: "/estatisticas",
        element: <Estatisticas/>
      },
      {
        path: "/configuracao",
        element: <Configuracao/>
      },
      
      {
        path: "/gestao",
        element: <Gestao/>
      },
      {
        path: "/categorias",
        element: <Categorias/>
      },
      {
        path: "/despesas",
        element: <Despesas/>
      },
      {
        path: "/cartoes",
        element: <Cartoes/>
      },
      {
        path: "/fatura/:codigoCartao",
        element: <Fatura/>
      },
      {
        path: "/meuPerfil",
        element: <MeuPerfil/>
      },
      {
        path: "/alterarSenha",
        element: <AlterarSenha/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <AppProviders>
    <RouterProvider router={router}/>
  </AppProviders>
)
