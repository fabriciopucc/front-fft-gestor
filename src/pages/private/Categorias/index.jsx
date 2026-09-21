import styles from './Categorias.module.css';

import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import Container from '@/components/layout/Container/index.jsx';
import HeaderVoltar from '@/components/layout/HeaderVoltar';
import CategoriasForm from '@/components/forms/CategoriasForm';

import useCategorias from '@/hooks/useCategorias.js';

import iconFechar from '@/assets/icons/close.png'
import categoriasIcons from '@/constants/categoriasIcons';
import QuantidadeEntidades from '@/components/utils/QuantidadeEntidades';
import useForm from '@/hooks/useForm';


export default function Categorias(){

  const {categorias, categoria, preencherCategoria, selecionarIconCategoria, enviarFormularioSalvarCategoria, excluirCategoria} = useCategorias();
  const {visibilidadeForm, exibirForm, esconderForm} = useForm();

  return(
    <Container centralizar={true}>
      <HeaderVoltar
        destino={"/menu"}
        tituloPagina={"Categorias"}
      />

      {
        visibilidadeForm && (
          <CategoriasForm
            categoria={categoria}
            preencherCategoria={preencherCategoria}
            selecionarIconCategoria={selecionarIconCategoria}
            enviarFormularioSalvarCategoria={enviarFormularioSalvarCategoria}
            esconderForm={esconderForm}
          />
        )
      }

      <QuantidadeEntidades
        lista={categorias}
        limite={20}
        nomeEntidade={"categorias"}
        visibilidadeForm={visibilidadeForm}
        exibirForm={exibirForm}
      />

      <ListaDeEntidade
        classe={"horizontal"}
        lista={categorias}
        textoAlternativo={"Ainda não foram cadastradas as categorias!"}
      > 
        {
          categorias.map((categoria) => (
            <div
              key={categoria.codigo}
              className={styles.categoria}
            >
              <div
                className={styles.margemCategoria}
              >
                <img 
                  src={iconFechar} 
                  alt="Icone fechar" 
                  className={styles.botaoFechar}
                  onClick={() => excluirCategoria(categoria.codigo)}  
                />

                <div
                  className={styles.molduraIcone}
                >
                  <img
                    src={categoriasIcons[categoria.indiceIcon - 1].src}
                  />
                </div>

                <p>{categoria.nome}</p>
              </div>
            </div>
          ))
        }
      </ListaDeEntidade>
    </Container>
  )
}