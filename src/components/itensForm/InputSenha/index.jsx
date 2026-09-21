import { useState } from 'react';
import styles from './InputSenha.module.css';

import iconOlho from '@/assets/icons/olho.png';
import iconOlhoF from '@/assets/icons/olhoF.png';

export default function InputSenha({dica, nome, entidade, preencherEntidade}){

  const [visibilidadeSenha, setVisibilidadeSenha] = useState(false);

  return(
    <div className={styles.linhaInputSenha}>
      <input
        placeholder={dica}
        type={(visibilidadeSenha) ? "text" : "password"}
        name={nome}
        onChange={(e) => preencherEntidade(e)}
        value={entidade || ""}
      />

      <img 
        src={(visibilidadeSenha) ? iconOlhoF : iconOlho} 
        alt="Icon olho" 
        onClick={() => setVisibilidadeSenha((visibilidadeSenha) ? false : true)}
      />
    </div>
  );
}