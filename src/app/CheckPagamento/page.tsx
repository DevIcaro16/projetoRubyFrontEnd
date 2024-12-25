import React from "react";
import styles from "./page.module.scss";

// interface CheckPagamentoProps {
//     valor: any;
//     qrCode: any;
//     qrCodeImg: any;
//     link: any
// };

const CheckPagamento = () => {
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
                    <h1 className={styles.title}>Pagamento Confirmado Com Sucesso!</h1>
                    <p className={styles.message}>
                        Importe sua Lincença no Seu RUBY - MicroFolha .
                    </p>
                    <p className={styles.note}>
                        Se você não encontrar o e-mail em sua caixa de entrada, verifique a
                        pasta de spam ou lixo eletrônico.
                    </p>
                </main>
                <footer className={styles.footer}>
                    <p>© 2024 RUBY - MICROFOLHA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default CheckPagamento;
