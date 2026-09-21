import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const FormContext = createContext();

export const FormProvider = ({children}) => {

  const [visibilidadeForm, setVisibilidadeForm] = useState(false);

  const exibirForm = () => setVisibilidadeForm(true);
  const esconderForm = () => setVisibilidadeForm(false);

  return(
    <FormContext.Provider
      value={{visibilidadeForm, exibirForm, esconderForm}}
    >
      {children}
    </FormContext.Provider>
  )
}