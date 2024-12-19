"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import logoImg from "/public/RUBY9.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState<string>("");
  const [result, setResult] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      toast.error("Acesso não autorizado! Faça login primeiro.", {
        position: "top-left",
        autoClose: 3000,
      });
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token Inválido! Por favor, preencha o campo corretamente.", {
        position: "top-left",
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      const response = await axios.post("http://127.0.0.1:3200/validarPlano", { token });

      if (response.status === 200) {
        toast.success("Plano Validado com sucesso!", {
          position: "top-left",
          autoClose: 3000,
        });
        setTimeout(() => setResult(true), 3500); // Aguardar a mensagem de sucesso antes de mudar a tela
      } else {
        toast.error("Erro ao Validar Plano! Tente novamente.", {
          position: "top-left",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Erro ao Validar Plano!";
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className={styles.containerCenter}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <h2 className={styles.loading}>Carregando...</h2>
        </div>
      )}

      {!isLoading && !result && (
        <>
          <Image className={styles.img} src={logoImg} alt="micromoney" />

          <h2 className={styles.p}>Valide o Token do cliente: </h2>

          <section className={styles.login}>
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>Token de Validação: </label>

              <textarea
                className={styles.textarea}
                placeholder="Digite o token aqui..."
                rows={10}
                value={token}
                onChange={(e) => setToken(e.target.value)}
              ></textarea>

              <button className={styles.button} type="submit">
                Validar
              </button>
            </form>
          </section>
        </>
      )}

      {result && (
        <div className={styles.resultContainer}>
          <h1 className={styles.h1}>PLANO VALIDADO!</h1>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
