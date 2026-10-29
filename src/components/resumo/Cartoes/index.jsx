import ListaDeEntidade from '@/components/lists/ListaDeEntidade';
import styles from './Cartoes.module.css';
import BarraProgresso from '@/components/utils/BarraProgresso';
import ContainerMolde from '@/components/utils/ContainerMolde';

export default function Cartoes({listaCartoes}){

  return(
    <ContainerMolde>
      <div className={styles.cartoes}>
        <div className={styles.margemCartoes}>
          <div className={styles.infosCartoes}>
            <h1>Cartões</h1>
          </div>
          
          <ListaDeEntidade
            lista={listaCartoes}
            textoAlternativo={"Você ainda não possui cartões cadastrados"}
          >
            {
              listaCartoes.map((cartao, index) => (
                <div
                  key={index}
                  className={styles.categoria}
                >
                  <div className={styles.iconeCategoria}>
                    <p>{cartao.apelido.charAt(0)}</p>
                  </div>

                  <div className={styles.dadosCartao}>
                    <p>
                      {cartao.apelido}
                    </p>

                    <p>{((cartao.limiteUtilizado/cartao.limiteTotal)*100).toFixed(0)}%</p>

                    <p>
                      R$ {cartao.limiteUtilizado.toFixed(2)} de 
                      R$ {cartao.limiteTotal.toFixed(2)}
                    </p>
                    

                    <BarraProgresso
                      inicial={cartao.limiteUtilizado}
                      maximo={cartao.limiteTotal}
                    />
                  </div>
                </div>
              ))
            }
          </ListaDeEntidade>
        </div>
      </div>
    </ContainerMolde>
  );
}