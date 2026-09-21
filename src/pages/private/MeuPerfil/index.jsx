import styles from './MeuPerfil.module.css';

import HeaderVoltar from "@/components/layout/HeaderVoltar";
import Container from "@/components/layout/Container";
import BotaoLink from "@/components/utils/BotaoLink";

import useSessao from '@/hooks/useSessao';


export default function MeuPerfil(){

  const {sessao} = useSessao();

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
         tituloPagina={"Meu perfil"}
      />

      <div
        className={styles.containerMeuPerfil}
      >
        <label>Nome</label>
        <div
          className={styles.dadosUsuario}
        >
          <p>{sessao.nome}</p>
        </div>

        <label>Email</label>
        <div
          className={styles.dadosUsuario}
        >
          <p>{sessao.email}</p>
        </div>

        <label>Senha</label>
        <div
          className={styles.dadosUsuario}
        >
          <p>**********</p>
        </div>

        <BotaoLink
          destino={"/alterarSenha"}
          texto={"Alterar senha"}
        />
      </div>
    </Container>
  )
}