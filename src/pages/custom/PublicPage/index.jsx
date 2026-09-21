import useRoutes from "@/hooks/useRoutes";
import useSessao from "@/hooks/useSessao";
import { useEffect } from "react";

export default function PublicPage({children}){

  const {sessao} = useSessao();
  const {redirecionarParaMenu} = useRoutes();

  useEffect(() => {
    redirecionarParaMenu();
  }, [sessao]);

  return(
    <>
      {!sessao && children}
    </>
  );
}