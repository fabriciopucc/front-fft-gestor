import styles from './CadastroForm.module.css';

import InputSenha from '@/components/itensForm/InputSenha';
import InputNumerico from '@/components/itensForm/InputNumerico';
import { Link } from 'react-router-dom';

import useUsuario from "@/hooks/useUsuario";
import Input from '@/components/itensForm/Input';


export default function CadastroForm(){

  const {usuario, preencherUsuario, indiceCadastroForm, setIndiceCadastroForm, solicitarCodigoDeConfirmacao, enviarFormularioFazerCadastro} = useUsuario();

  return(
    <form
      onSubmit={enviarFormularioFazerCadastro}
    >
      <h1>Cadastro ({indiceCadastroForm+1}/2)</h1>

      {
        indiceCadastroForm == 0 ? (
          <>
            <Input
              dica={"Digite seu nome"}
              nome={"nome"}
              entidade={usuario.nome}
              preencherEntidade={preencherUsuario}
            />

            <Input
              dica={"Digite seu email"}
              nome={"email"}
              entidade={usuario.email}
              preencherEntidade={preencherUsuario}
            />
            
            <InputSenha
              dica={"Defina a senha"}
              nome={"senha"}
              entidade={usuario.senha}
              preencherEntidade={preencherUsuario}
            />

            <InputSenha
              dica={"Confirme a senha"}
              nome={"confirmacaoSenha"}
              entidade={usuario.confirmacaoSenha}
              preencherEntidade={preencherUsuario}
            />

            <button
              type='button'
              className={(usuario.nome && usuario.email && usuario.senha && usuario.confirmacaoSenha) ? "" : "desativado"}
              disabled={!(usuario.nome && usuario.email && usuario.senha && usuario.confirmacaoSenha)}
              onClick={() => {
                if(usuario.email == usuario.emailDefinido) setIndiceCadastroForm(1);
                else solicitarCodigoDeConfirmacao();
              }}
            >
              {
                (usuario.email == usuario.emailDefinido) 
                ? "Avançar" 
                : "Solicitar codigo de confirmação"
              }
            </button>
          </>
        ) : indiceCadastroForm == 1 && (
          <>
            <InputNumerico
              dica={"Digite o código de confirmação"}
              entidade={usuario.codigoConfirmacao}
              nome={"codigoConfirmacao"}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={4}
            />

            <button
              onClick={() => setIndiceCadastroForm(0)}
            >
              Voltar
            </button>

            <button
              disabled={(!usuario.codigoConfirmacao)}
              className={(usuario.codigoConfirmacao) ? "" : "desativado"}   
            >
              Cadastro
            </button>
          </>
        )
      }

      <br />

      <div className={styles.links}>
        <p>Já tem conta? Faça</p>

        <Link 
          to={"/login"}
          className={styles.txtLink}
        >
          login
        </Link>
      </div>
      
    </form>
  );
}