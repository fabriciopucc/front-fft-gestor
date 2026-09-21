import useLoader from "./useLoader";
import useMessageBox from "./useMessageBox";

const useTratarErro = () => {

  const {exibirMessageBox} = useMessageBox();
  const {esconderCardLoader} = useLoader();

  const tratarErro = (error) => {
    esconderCardLoader();
    exibirMessageBox('', false, error.response.data.message, "Entendido!");
  }

  return{tratarErro};
};

export default useTratarErro;