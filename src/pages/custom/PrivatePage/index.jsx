import { useEffect } from 'react';
import useRoutes from '@/hooks/useRoutes';
import useSessao from '@/hooks/useSessao';

export default function PrivatePage({children}){

  const {sessao} = useSessao();
  const {redirecionarParaHome} = useRoutes();

  useEffect(() => {
    redirecionarParaHome();
  }, [sessao]);

  return(
    <>
      {(sessao) && children}
    </>
  )
}