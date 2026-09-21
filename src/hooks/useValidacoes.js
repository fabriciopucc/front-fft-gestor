import useMessageBox from "./useMessageBox";

const useValidacoes = () => {

  const {exibirMessageBox} = useMessageBox();

  const validarCadastroUsuario = (usuario) => {
    let erros = [];

    if(usuario.nome.split(" ").lenth <= 1) erros.push("Digite o nome completo!");
    if(!usuario.email.endsWith("@gmail.com")) erros.push("Adicione o prefixo @gmail.com no seu email!");
    if(usuario.senha.length <= 7) erros.push("A senha deve conter ao menos 8 digítos!");
    if(usuario.senha !== usuario.confirmacaoSenha) erros.push("A senha e sua confirmação devem ser iguais!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarLogin = (usuario) => {
    let erros = [];

    if(!usuario.email.endsWith("@gmail.com")) erros.push("Adicione o prefixo @gmail.com no seu email!");
    if(usuario.senha.length <= 7) erros.push("A senha deve conter ao menos 8 digítos!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarRecuperarSenha = (usuario) => {
    let erros = [];

    if(usuario.codigoConfirmacao.length !== 4) erros.push("O código de confirmação deve possuir 4 digitos!");
    if(usuario.novaSenha.length < 8) erros.push("A nova senha deve conter ao menos 8 digítos!");
    if(usuario.novaSenha !== usuario.confirmacaoNovaSenha) erros.push("A nova senha e sua confirmação devem ser iguais!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarAlterarSenha = (usuario) => {
    let erros = [];

    if(usuario.novaSenha.length < 8) erros.push("A nova senha deve conter ao menos 8 digítos!");
    if(usuario.novaSenha !== usuario.confirmacaoNovaSenha) erros.push("A nova senha e sua confirmação devem ser iguais!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarCadastroCartao = (cartao) => {
    let erros = [];

    if(cartao.apelido.length > 8) erros.push("O apelido só pode conter no máximo 8 caracteres!");
    if(cartao.ultimosDigitos.length !== 4) erros.push("Você deve digitar apenas os ultimos 4 (QUATRO) digitos!");
    if(cartao.limiteTotal <= 0) erros.push("O limite deve ser maior que 0!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarCadastroDespesa = (despesa) => {
    let erros = [];

    if(despesa.descricao.length > 20) erros.push("A descrição só pode conter no máximo 20 caracteres!");
    if(despesa.valor <= 0) erros.push("O valor deve ser maior que 0!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  const validarCadastroCategoria = (categoria) => {
    let erros = [];

    if(categoria.nome.trim().split(" ").length > 1) erros.push("O nome da categoria deve ser formado por somente 1 palavra!");
    if(categoria.nome.length < 4) erros.push("A categoria deve conter ao menos 4 caracteres!");
    if(categoria.nome.length > 10) erros.push("A categoria só pode conter no máximo 10 caracteres!");

    if(erros.length === 0) return true;
    else exibirMessageBox('', false, erros, "Entendido");
  }

  return{
    validarCadastroUsuario, validarLogin, validarRecuperarSenha, validarAlterarSenha,
    validarCadastroCartao, validarCadastroDespesa, validarCadastroCategoria
  };
}

export default useValidacoes;