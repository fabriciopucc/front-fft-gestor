import Input from "@/components/itensForm/Input";
import InputNumerico from "@/components/itensForm/InputNumerico";
import InputSenha from "@/components/itensForm/InputSenha";
import useUsuario from "@/hooks/useUsuario";

export default function RecuperarSenhaForm(){

  const {usuario, preencherUsuario, solicitarCodigoDeConfirmacao, indiceRecuperarSenhaForm, setIndiceRecuperarSenhaForm, enviarFormularioRecuperarSenha} = useUsuario();

  return(
    <form
      onSubmit={enviarFormularioRecuperarSenha}
    >
      <h1>Recuperar senha {indiceRecuperarSenhaForm+1}/2</h1>
      {
        indiceRecuperarSenhaForm == 0 ? (
          <>
            <Input
              dica={"Digite o email"}
              nome={"email"}
              entidade={usuario.email}
              preencherEntidade={preencherUsuario}
            />

            <button
              type='button'
              className={(usuario.email) ? "" : "desativado"}
              disabled={!(usuario.email)}
              onClick={() => {
                if(usuario.email == usuario.emailDefinido) setIndiceRecuperarSenhaForm(1);
                else solicitarCodigoDeConfirmacao();
              }}
            >
              {
                (usuario.email == usuario.emailDefinido) 
                ? "Avançar" 
                : "Solicitar codigo de recuperação"
              }
            </button>
          </>
        ) : indiceRecuperarSenhaForm == 1 && (
          <>
            <InputNumerico
              dica={"Digite o código de confirmação"}
              entidade={usuario.codigoConfirmacao}
              nome={"codigoConfirmacao"}
              preencherEntidade={preencherUsuario}
              maximoDenumeros={4}
            />

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
              onClick={() => setIndiceRecuperarSenhaForm(0)}
            >
              Voltar
            </button>

            <button
              disabled={(!usuario.codigoConfirmacao || !usuario.novaSenha || !usuario.confirmacaoNovaSenha)}
              className={(usuario.codigoConfirmacao && usuario.novaSenha && usuario.confirmacaoNovaSenha) ? "" : "desativado"}   
            >
              Recuperar senha
            </button>
          </>
        )
      }
    </form>
  );
}