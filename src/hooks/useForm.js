import { FormContext } from "@/contexts/FormContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useForm = () => {

  const {visibilidadeForm, exibirForm, esconderForm} = useContext(FormContext);
  const {pathanme} = useLocation();

  useEffect(() => {
    esconderForm();
  }, [pathanme]);


  return {visibilidadeForm, exibirForm, esconderForm};
}

export default useForm;