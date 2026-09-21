import styles from './DespesasForm.module.css';

import iconFechar from '@/assets/icons/close.png';

import Input from "@/components/itensForm/Input";


export default function DespesasForm({despesa, preencherDespesa, enviarFormularioSalvarDespesa, esconderForm}){

  const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  return(
    <form
      onSubmit={enviarFormularioSalvarDespesa}
    >
      <img 
        className={styles.iconFechar}
        src={iconFechar} 
        alt="Icone fechar" 
        onClick={esconderForm}
      />

      <Input
        dica={"Digite a descrição da despesa"}
        nome={"descricao"}
        entidade={despesa.descricao}
        preencherEntidade={preencherDespesa}
      />

      <Input
        dica={"Digite o valor da despesa"}
        nome={"valor"}
        entidade={despesa.valor}
        preencherEntidade={preencherDespesa}
        eNumerico={true}
      />

      <select 
        name="diaVencimento"
        onChange={(e) => preencherDespesa(e)}
        value={despesa.diaVencimento || ""}
      >
        <option value="escolha">Escolha o dia do vencimento</option>
        {
          dias.map((dia, index) => (
            <option 
              value={dia}
              key={index}  
            >
              {dia}
            </option>
          ))
        }
      </select>

      <button
        disabled={(!despesa.descricao || !despesa.valor || despesa.diaVencimento == "escolha")}
        className={(despesa.descricao && despesa.valor && despesa.diaVencimento !== "escolha") ? "" : "desativado"}   
      >
        Adicionar despesa
      </button>
    </form>
  );
}