import React from "react";
import styles from "./page.module.scss";

const MessageError = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvV804ZTmDRXUG4cxSodfy6fGW5Jin9hb9ZA&s"
                        alt="Ruby Logo"
                        className={styles.logo}
                    />
                </header>
                <main className={styles.main}>
                    <h1 className={styles.title}>Erro ao Verificar Token 😓</h1>
                    <p className={styles.message}>
                        Infelizmente Não Foi Possível Validar seu Token, Por Favor volte até o seu Email
                        e Tente Novamente
                    </p>
                    {/*<p className={styles.note}>
                        Se você não encontrar o e-mail em sua caixa de entrada, verifique a
                        pasta de spam ou lixo eletrônico.
                    </p> */}
                </main>
                <footer className={styles.footer}>
                    <p>© 2024 RUBY - MICROFOLHA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default MessageError;
