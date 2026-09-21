import styles from './CategoriasForm.module.css';

import iconFechar from '@/assets/icons/close.png';
import Input from '@/components/itensForm/Input';

import categoriasIcons from '@/constants/categoriasIcons';


export default function CategoriasForm({categoria, preencherCategoria, selecionarIconCategoria, enviarFormularioSalvarCategoria, esconderForm}){


  return(
    <form
      onSubmit={enviarFormularioSalvarCategoria}
    >
      <img 
        className={styles.iconFechar}
        src={iconFechar} 
        alt="Icone fechar" 
        onClick={esconderForm}
      />
      <label className={styles.labelTitulo}>Selecione um ícone</label>

      <div className={styles.containerIcons}>
        <div className={styles.centralizarICons}>
          {
            categoriasIcons.map((icon) => (
              <div 
                className={styles.molduraIcone+" "+styles[(categoria.indiceIcon === icon.id) && "selecionado"]}
                key={icon.id}
                onClick={() => selecionarIconCategoria(icon.id)}   
              >
                <img 
                  src={icon.src} 
                  alt={icon.alt}
                  className={styles.icone}
                />
              </div>
            ))
          }
        </div>
      </div>

      <Input
        dica={"Digite o nome da categoria"}
        nome={"nome"}
        entidade={categoria.nome}
        preencherEntidade={preencherCategoria}
      />

      <button
        disabled={!(categoria.nome && categoria.indiceIcon)}
        className={(categoria.nome && categoria.indiceIcon) ? "" : "desativado"}
      >
        Salvar categoria
      </button>
    </form>
  );
}