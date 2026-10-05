import styles from './CartoeForm.module.css';

import iconFechar from '@/assets/icons/iconFechar.svg';
import Input from "@/components/itensForm/Input";
import InputNumerico from "@/components/itensForm/InputNumerico";


export default function CartoesForm({cartao, preencherCartao, definirCorCartao, enviarFormularioCadastrarCartao, esconderForm}){

  let cores = ['roxo', 'azul', 'vermelho', 'verde', 'preto'];

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

      <Input
        dica={"Digite o limite do cartão"}
        nome={"limiteTotal"}
        entidade={cartao.limiteTotal}
        preencherEntidade={preencherCartao}
        eNumerico={true}
      />

      <button
        disabled={!(cartao.cor || cartao.apelido || cartao.ultimosDigitos || cartao.limiteTotal)}
        className={[(cartao.cor && cartao.apelido && cartao.ultimosDigitos && cartao.limiteTotal) ? "" : "desativado"]}   
      >
        Adicionar cartão
      </button>
    </form>
  );
}