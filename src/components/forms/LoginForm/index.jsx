import styles from './LoginForm.module.css';

import { Link } from 'react-router-dom';
import InputSenha from '@/components/itensForm/InputSenha';

import useUsuario from '@/hooks/useUsuario';
import Input from '@/components/itensForm/Input';


export default function LoginForm(){

  const {usuario, preencherUsuario, enviarFormularioFazerLogin} = useUsuario();

  return(
    <form 
      onSubmit={enviarFormularioFazerLogin}
    >
      <h1>Login</h1>

      <Input
        dica={"Digite o email"}
        nome={"email"}
        entidade={usuario.email}
        preencherEntidade={preencherUsuario}
      />

      <InputSenha
        dica={"Digite a senha"}
        nome={"senha"}
        entidade={usuario.senha}
        preencherEntidade={preencherUsuario}
      />

      <button
        disabled={!(usuario.email && usuario.senha)}
        className={(usuario.email && usuario.senha) ? "" : "desativado"}
      >
        Login
      </button>

      <br />

      <div className={styles.links}>
        <p>Não tem conta? Faça</p>
        
        <Link 
          to={"/"}
          className={styles.txtLink}
        >
          cadatro
        </Link>
      </div>

       <div className={styles.links}>
        <p>Esqueceu a senha?</p>
        
        <Link 
          to={"/recuperarSenha"}
          className={styles.txtLink}
        >
          Clique aqui
        </Link>
      </div>
    </form>
  );
}