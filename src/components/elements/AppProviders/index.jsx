import { FormProvider } from "@/contexts/FormContext";
import { LoaderProvider } from "@/contexts/LoaderContext";
import { MessageBoxProvider } from "@/contexts/MessageBoxContext";
import { PaginacaoProvider } from "@/contexts/PaginacaoContext";
import { SaldoProvider } from "@/contexts/SaldoContext";
import { SessaoProvider } from "@/contexts/SessaoContext";

export default function AppProviders({children}){

  return(
    <SessaoProvider>
      <PaginacaoProvider>
        <SaldoProvider>
          <MessageBoxProvider>
            <LoaderProvider>
              <FormProvider>
                {children}
              </FormProvider>
            </LoaderProvider>
          </MessageBoxProvider>
        </SaldoProvider>
      </PaginacaoProvider>
    </SessaoProvider>
  )
}