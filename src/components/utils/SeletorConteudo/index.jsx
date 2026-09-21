import styles from './SeletorConteudo.module.css';

export default function SeletorConteudo({exibirConteudo, trocarDeConteudo}){

  return(
    <div className={styles.seletorConteudo}>
      <span
        onClick={() => trocarDeConteudo("configuracao")}
        className={styles[(exibirConteudo == "configuracao") && "selecionado"]}
      >
        Configuração
      </span>

      <span 
        onClick={() => trocarDeConteudo("gestao")}
        className={styles[(exibirConteudo == "gestao") && "selecionado"]}
      >
        Gestão
      </span>

      <span 
        onClick={() => trocarDeConteudo("categorias")}
        className={styles[(exibirConteudo == "categorias") && "selecionado"]}
      >
        Categorias
      </span>
      
      <span 
        onClick={() => trocarDeConteudo("despesas")}
        className={styles[(exibirConteudo == "despesas") && "selecionado"]}
      >
        Despesas
      </span>
    </div>
  )
}