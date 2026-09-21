import useSessao from "@/hooks/useSessao";
import api from "@/services/api";
import { createContext, useEffect, useState } from "react";

export const SaldoContext = createContext();

export const SaldoProvider = ({ children }) => {
  const {sessao, codigo} = useSessao();

  const [saldo, setSaldo] = useState(() => {
    const saldoSalvo = localStorage.getItem("meuSaldo");
    return (saldoSalvo) ? JSON.parse(saldoSalvo) : null;
  });

  const atualizarSaldo = () => {
    if (!sessao) return;

    api.get("/saldo/".concat(codigo))
    .then((resp) => {
      setSaldo(resp.data);
    })
    .catch((error) => {
      tratarErro(error);
    });
  };

  useEffect(() => {
    if (saldo) localStorage.setItem("meuSaldo", JSON.stringify(saldo));
  }, [saldo]);

  useEffect(() => {
    if (sessao) atualizarSaldo();
  }, [sessao]);

  return (
    <SaldoContext.Provider value={{ saldo, atualizarSaldo }}>
      {children}
    </SaldoContext.Provider>
  );
};