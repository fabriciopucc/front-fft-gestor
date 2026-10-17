import styles from './CartoeForm.module.css';

import iconFechar from '@/assets/icons/iconFechar.svg';
import Input from "@/components/itensForm/Input";
import InputNumerico from "@/components/itensForm/InputNumerico";


export default function CartoesForm({cartao, preencherCartao, definirCorCartao, enviarFormularioCadastrarCartao, esconderForm}){

  const cores = ['roxo', 'azul', 'vermelho', 'verde', 'preto', 'amarelo'];
  const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

  return(
    <form onSubmit={enviarFormularioCadastrarCartao}>
      <img 
        className={styles.iconFechar}
        src={iconFechar} 
        alt="Icone fechar" 
        onClick={esconderForm}
      />

      <div
        className={styles.coresCartao}
      >
        <p>Selecione a cor para o cartão</p>
        {
          cores.map((cor) => (
            <div
              className={styles[cor]+" "+styles[(cartao.cor === cor) && "selecionado"]}
              key={cor}
              onClick={() => definirCorCartao(cor)}
            ></div>
          ))
        }
      </div>

      <Input
        dica={"Defina um apelido para o cartão"}
        nome={"apelido"}
        entidade={cartao.apelido}
        preencherEntidade={preencherCartao}
      />

      <InputNumerico
        dica={"Digite os últimos 4 digitos do cartão"}
        entidade={cartao.ultimosDigitos}
        nome={"ultimosDigitos"}
        preencherEntidade={preencherCartao}
        maximoDenumeros={4}
      />

      <select 
        onChange={(e) => preencherCartao(e)}
        name={"diaFechamento"}
        value={cartao.diaFechamento || ""}
      >
        <option
          value={"escolha"}
        >
          Escolha o dia do fechamento
        </option>
        
        {
          dias.map((dia) => (
            <option 
              value={dia}
              key={dia}
            >
              {dia}
            </option>
          ))
        }
      </select>

      <Input
        dica={"Digite o limite do cartão"}
        nome={"limiteTotal"}
        entidade={cartao.limiteTotal}
        preencherEntidade={preencherCartao}
        eNumerico={true}
      />

      <button
        disabled={!(cartao.cor || cartao.apelido || cartao.ultimosDigitos || cartao.limiteTotal) || cartao.diaFechamento == "escolha"}
        className={[(cartao.cor && cartao.apelido && cartao.ultimosDigitos && cartao.diaFechamento !== "escolha" && cartao.limiteTotal) ? "" : "desativado"]}   
      >
        Adicionar cartão
      </button>
    </form>
  );
}