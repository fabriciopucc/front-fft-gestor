import styles from './MenuBar.module.css';

import {Link} from 'react-router-dom';
import iconCasa from '@/assets/icons/iconHome.svg';
import iconEngrenagem from '@/assets/icons/categorias/iconEngrenagem.svg';
import iconMenu2 from '@/assets/icons/iconMenu2.svg';
import iconDespesas from '@/assets/icons/categorias/iconDinheiro.svg';
import iconResumo from '@/assets/icons/iconResumo.svg';
import iconGestao from '@/assets/icons/iconGestao.svg';
import iconCategorias from '@/assets/icons/iconCategorias.svg';
import iconCartao from '@/assets/icons/iconCartoes.svg';
import iconUser from '@/assets/icons/iconUser.svg';

import useSessao from '@/hooks/useSessao';


export default function MenuBar(){

  const fecharMenuBar = () => {
    document.getElementById('menuBar').checked = false;
  }

  const {sessao, deslogar} = useSessao();
  
  return(
    <>
      <input type="checkbox" id="menuBar" className={styles.menuBar}/>    
      <label htmlFor="menuBar" className={styles.sobreporMenuBar}></label>

      <nav className={styles.menuBar}>
        <div className={styles.margemMenuBar}>
          <div className={styles.sessao}>
            {
              sessao ? (
                <p
                  onClick={deslogar}
                >
                  Sair
                </p>
              ) : (
                <Link
                  to={"/login"}
                  className={styles.linkLogin}
                >
                  Login
                </Link>
              )
            }
          </div>

          <div className={styles.opcoes}>
            {
              sessao ? (
                <>
                  <Link 
                    to={"/menu"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconMenu2} 
                      alt="Icon casa"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Menu</p>
                  </Link>

                  <Link 
                    to={"/configuracao"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconEngrenagem} 
                      alt="Icon engrenagem"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Configuração</p>
                  </Link>

                  <Link 
                    to={"/resumo"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconResumo} 
                      alt="Icon resumo"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Resumo</p>
                  </Link>

                  <Link 
                    to={"/gestao"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconGestao} 
                      alt="Icon gestão"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Gestão de dias</p>
                  </Link>

                   <Link 
                    to={"/categorias"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconCategorias} 
                      alt="Icon categorias"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Categorias</p>
                  </Link>

                  <Link 
                    to={"/despesas"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconDespesas} 
                      alt="Icon despesas"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Despesas</p>
                  </Link>

                  <Link 
                    to={"/cartoes"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconCartao} 
                      alt="Icon cartões"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Cartões</p>
                  </Link>

                  <Link 
                    to={"/meuPerfil"}
                    className={styles.opcao}
                    onClick={fecharMenuBar}
                  >
                    <img 
                      src={iconUser} 
                      alt="Icon user"
                      className={styles.iconMenu} 
                    />
                    
                    <p>Meu perfil</p>
                  </Link>
                </>
              ) : (
                <Link 
                  to={"/"}
                  className={styles.opcao}
                  onClick={fecharMenuBar}
                >
                  <img 
                    src={iconCasa} 
                    alt="Icon casa"
                    className={styles.iconMenu} 
                  />
                  
                  <p>Cadastro</p>
                </Link>
              )
            }
          </div>
        </div>
      </nav>
    </>
  )
}