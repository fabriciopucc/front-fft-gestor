import { useState } from 'react';

import iconChipCard from '@/assets/icons/iconChipCard.svg';

import { Link } from 'react-router-dom';

import styles from './Cartao.module.css';
import AlterarLimiteForm from '@/components/forms/AlterarLimiteForm';
import BarraProgresso from '@/components/utils/BarraProgresso';


export default function Cartao({cartao, preencherCartao}){

  const [visibilidadeAlterarLimite, setVisibilidadeAlterarLimite] = useState(false);

  return(
    <div 
      className={styles.cartao}
    >
      <div className={styles.cartaoVisual+" "+[cartao.cor]}>
        <img 
          src={iconChipCard} 
          alt="Icon chip card" 
          className={styles.chipCard}  
        />

        <div className={styles.apelidoCartao}>
          {cartao.apelido}
        </div>

        <div className={styles.numeroCartao}>
          •••• •••• •••• {cartao.ultimosDigitos}
        </div>
      </div>

      <div className={styles.informacaoCartao}>
        <span className={styles.tituloInformacao}>
          Limite usado
        </span>

        <span className={styles.valorPrincipal}>
          R$ {cartao.limiteUtilizado.toFixed(2)}

          <span className={styles.porcentagemUso}>
            {" ("}{((cartao.limiteUtilizado/cartao.limiteTotal)*100).toFixed(2)}%{")"}
          </span>

          <BarraProgresso
            maximo={cartao.limiteTotal}
            inicial={cartao.limiteUtilizado}
            corBarra={"btn".concat(cartao.cor)}
          />
        </span>
      </div>

      <div className={styles.informacaoCartao}>
        <span className={styles.tituloInformacao}>
          Disponível
        </span>

        <span className={styles.valorDisponivel}>
          R$ {(cartao.limiteTotal - cartao.limiteUtilizado).toFixed(2)}
        </span>
      </div>

      <div className={styles.informacaoCartao}>
        <span className={styles.tituloInformacao}>
          Limite total
        </span>

        <span className={styles.valorPrincipal}>
          R$ {cartao.limiteTotal.toFixed(2)}
        </span>
      </div>

      {
        visibilidadeAlterarLimite && (
          <AlterarLimiteForm
            cartao={cartao}
            setVisibilidadeAlterarLimite={setVisibilidadeAlterarLimite}
            preencherCartao={preencherCartao}
          />
        )
      }

      {
        !visibilidadeAlterarLimite && (
          <div className={styles.botoesCartao}>
            <Link
              className={styles.botaoFatura+" btn"+[cartao.cor]}
              to={"/fatura/".concat(cartao.codigo)}
            >
              Ver fatura
            </Link>

            <button
              type='button'
              className={styles.botaoAlterarLimite+" btn"+[cartao.cor]}
              onClick={() => setVisibilidadeAlterarLimite(true)}
            >
              Alterar limite
            </button>
          </div>   
        )
      }
    </div>
  );
}