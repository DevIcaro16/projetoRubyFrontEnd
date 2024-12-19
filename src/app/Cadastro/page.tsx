"use client";

import { useSearchParams } from "next/navigation"; // hook adequado no app directory
import router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Cadastro = () => {

  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Pegue o valor do query param 'token'

  useEffect(() => {

    const validateToken = async () => {
      if (!token) return; // Aguarda o token estar disponível na URL

      try {
        const response = await fetch(`http://127.0.0.1:3200/verificarToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (data.valid) {
          const { decoded } = data;

          console.log(data);

          // Preencha os campos do formulário com os valores retornados
          //   setEmpresa(decoded.DES);
          //   setCNPJ(decoded.CGC);
          //   setLocalizacao(decoded.EDR);
          //   setTelefone(decoded.TEL);
          //   setEmail(decoded.LOG);
          //   setSenha(decoded.PWD);
          //   setMesMovimentoInicial(decoded.INI);
          //   setMesMovimentoFinal(decoded.FIM);
          //   toast.success(data.message, { position: "top-right", autoClose: 3000 });
        } else {
          toast.error("Token inválido ou expirado!", { position: "top-right", autoClose: 3000 });
          router.push("/error"); // Redireciona se o token for inválido
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        toast.error("Erro ao validar o token!", { position: "top-right", autoClose: 3000 });
      }
    };

    validateToken();
  }, [token]); // Executa sempre que o token mudar


  if (!token) {
    return <p>Token não encontrado...</p>; // Verifica se o token está presente
  }

  return (
    <div>
      <h1>Confirmação de Cadastro</h1>
      <p>Token: {token}</p>
    </div>
  );
};

export default Cadastro;


