import styles from './Menu.module.css';

import Container from "@/components/layout/Container";

import iconEngrenagem from '@/assets/icons/iconEngrenagem.png';
import iconDespesas from '@/assets/icons/iconDespesas.png';
import iconGestao from '@/assets/icons/iconGestao.png';
import iconCategorias from '@/assets/icons/iconCategorias.png';
import iconCartao from '@/assets/icons/iconCartao.png';
import iconUser from '@/assets/icons/iconUser.png';

import OpcaoMenu from '@/components/elements/OpcaoMenu';
import Saldo from '@/components/elements/Saldo';
import useSessao from '@/hooks/useSessao';
import { useEffect } from 'react';
import categoriasIcons from '@/constants/categoriasIcons';

export default function Menu(){

  const {sessao} = useSessao();

  let imagensPreCarregadas = false;
  const preCarregarImagens = (imagens) => {
    if (imagensPreCarregadas) return;

    imagensPreCarregadas = true;

    imagens.forEach((imagem) => {
      const img = new Image();
      img.src = imagem.src;
    });
  }

  useEffect(() => {
    preCarregarImagens(categoriasIcons);
  }, []);

  return(
    <Container centralizar={true}>
      <h1 className={styles.saudacao}> 
        Olá, &nbsp; 
        {(sessao.nome.split(" ").length > 1) ? sessao.nome.split(" ")[0] : sessao.nome}
      </h1>

      {
        sessao.saldoInicial <= 0 && (
          <span className={styles.avisoInicial}>
            Inicie sua gestão na aba configuração!! 
          </span>
        ) 
      }

      <Saldo/>

      <br />

      <div className={styles.containerOpcoes}>
        <OpcaoMenu
          evitarBloqueio={true}
          destino={"/configuracao"}
          srcIcon={iconEngrenagem}
          altIcon={"Icon engrenagem"}
          titulo={"Configuração"}
          txtAlternativo={"Configure sua conta"}
        />

        <OpcaoMenu
          destino={"estatisticas"}
          srcIcon={iconGestao}
          altIcon={"Icon estatisticas"}
          titulo={"Estatisticas"}
          txtAlternativo={"Veja suas estatisticas"}
        />

        <OpcaoMenu
          destino={"/gestao"}
          srcIcon={iconGestao}
          altIcon={"Icon gestão"}
          titulo={"Gestão"}
          txtAlternativo={"Lance suas ações"}
        />

        <OpcaoMenu
          destino={"/categorias"}
          srcIcon={iconCategorias}
          altIcon={"Icon categorias"}
          titulo={"Categorias"}
          txtAlternativo={"Crie suas categorias"}
        />

        <OpcaoMenu
          destino={"/despesas"}
          srcIcon={iconDespesas}
          altIcon={"Icon despesas"}
          titulo={"Despesas"}
          txtAlternativo={"Defina suas depesas"}
        />

        <OpcaoMenu
          destino={"/cartoes"}
          srcIcon={iconCartao}
          altIcon={"Icon cartçao"}
          titulo={"Cartões"}
          txtAlternativo={"Adicone seus cartões"}
        />

        <OpcaoMenu
          evitarBloqueio={true}
          destino={"/meuPerfil"}
          srcIcon={iconUser}
          altIcon={"Icon user"}
          titulo={"Meu perfil"}
          txtAlternativo={"Veja seus dados"}
        />
      </div>
    </Container>
  )
}