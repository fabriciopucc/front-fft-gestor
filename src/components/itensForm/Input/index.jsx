export default function Input({dica, nome, entidade, preencherEntidade, eNumerico}){

  return(
    <input
      placeholder={dica}
      type={eNumerico ? "number" : "text"}
      name={nome}
      onChange={(e) => preencherEntidade(e)}
      value={entidade || ""}
    />
  );
}