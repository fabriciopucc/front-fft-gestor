import InputSenha from "@/components/itensForm/InputSenha";
import useUsuario from "@/hooks/useUsuario";

export default function AlterarSenhaForm(){

  const {usuario, preencherUsuario, enviarFormularioAlterarSenha} = useUsuario();

  return(
    <form onSubmit={enviarFormularioAlterarSenha}>
      <InputSenha
        dica={"Digite a senha atual"}
        nome={"senha"}
        entidade={usuario.senha}
        preencherEntidade={preencherUsuario}
      />

      <br />

      <InputSenha
        dica={"Defina a nova senha"}
        nome={"novaSenha"}
        entidade={usuario.novaSenha}
        preencherEntidade={preencherUsuario}
      />

      <InputSenha
        dica={"Confirme a nova senha"}
        nome={"confirmacaoNovaSenha"}
        entidade={usuario.confirmacaoNovaSenha}
        preencherEntidade={preencherUsuario}
      />

      <button
        disabled={!(usuario.senha && usuario.novaSenha && usuario.confirmacaoNovaSenha)}
        className={(usuario.senha && usuario.novaSenha && usuario.confirmacaoNovaSenha) ? "" : "desativado"}
      >
        Alterar senha
      </button>
    </form>
  );
}