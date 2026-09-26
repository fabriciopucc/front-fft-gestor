import { useEffect } from 'react';
import useRoutes from '@/hooks/useRoutes';
import useSessao from '@/hooks/useSessao';
import { useLocation } from 'react-router-dom';

export default function PrivatePage({children}){

  const {sessao} = useSessao();
  const location = useLocation();
  const {redirecionarParaHome, redirecionarParaMenu} = useRoutes();

  //Redireciona para home se não tiver sessão ativa
  useEffect(() => {
    redirecionarParaHome();
  }, [sessao]);

  //Bloqueia rotas privadas se não tiver iniciado a gestão
  useEffect(() => {
    if(sessao.saldoInicial <= 0 && 
       !['/configuracao', '/meuPerfil'].includes(location.pathname)
    ){
      redirecionarParaMenu();
    }
  }, [location.pathname]);

  return(
    <>
      {(sessao) && children}
    </>
  )
}