"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importar de 'next/navigation' ao invés de 'next/router'
import styles from "./page.module.scss";
import logoImg from "/public/RUBY9.png";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dados para validação
    const isValid =
      email === process.env.NEXT_PUBLIC_EMAIL_ACESS_VALIDATION &&
      senha === process.env.NEXT_PUBLIC_PASSWORD_ACESS_VALIDATION;

    if (isValid) {
      console.log("Login Realizado com Sucesso!");
      toast.success("Login Realizado com Sucesso!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirecionamento para a página de cadastro
      localStorage.setItem("isLoggedIn", "true");
      router.push("/Home");
    } else {
      console.log("Erro ao realizar Login!");
      toast.error("Erro ao realizar Login!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={styles.containerCenter}>
      <Image className={styles.img} src={logoImg} alt="micromoney" />

      {/* <h2 className={styles.p}>Realize seu Cadastro: </h2>

      <section className={styles.login}>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Email: </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Digite o email corporativo"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>Senha: </label>
          <input
            type="password"
            required
            name="senha"
            placeholder="Digite a Senha"
            className={styles.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button className={styles.button} type="submit">
            Acessar
          </button>

          <Link href="/Planos" className={styles.text}>
            Consulte os planos do Ruby!
          </Link>
        </form>
      </section> */}
      <ToastContainer />
    </div>
  );
}
