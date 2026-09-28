import { useState } from 'react';

import iconChipCard from '@/assets/icons/iconChipCard.png';

import { Link } from 'react-router-dom';

import styles from './Cartao.module.css';
import AlterarLimiteForm from '@/components/forms/AlterarLimiteForm';


export default function Cartao({cartao, preencherCartao}){

  const [visibilidadeAlterarLimite, setVisibilidadeAlterarLimite] = useState(false);

  return(
    <div 
      className={styles.cartao}
    >
      <div className={styles.cartaoVisual+" "+[cartao.cor]}>
        <img 
          className={styles.chipCard}
          src={iconChipCard} 
          alt="Icone chip card" 
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

          <div className={styles.barraProgresso}>
            <div
              className={styles.barraPreenchida+" btn"+[cartao.cor]}
              style={{ width: `${(cartao.limiteUtilizado/cartao.limiteTotal)*100}%` }}
            />
          </div>
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