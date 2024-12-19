import React from "react";
import styles from "./page.module.scss";

interface CheckEmailProps {
    valor: string;
    qrCode: string;
    qrCodeImg: string;
    link: string;
}

const CheckEmail: React.FC<CheckEmailProps> = ({ valor, qrCode, qrCodeImg, link }) => {
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
                    <h1 className={styles.title}>Verifique sua caixa de e-mail!</h1>
                    <p className={styles.message}>
                        Enviamos um link de confirmação para o seu e-mail. Por favor, clique
                        no link para confirmar seu cadastro.
                    </p>
                    <p className={styles.note}>
                        Se você não encontrar o e-mail em sua caixa de entrada, verifique a
                        pasta de spam ou lixo eletrônico.
                    </p>

                    {/* Informações do PIX */}
                    <div className={styles.pixContainer}>
                        <h2 className={styles.pixTitle}>Informações do Pagamento via PIX</h2>
                        <p className={styles.pixDetail}>
                            Valor: <strong>R$ {valor}</strong>
                        </p>
                        <img
                            src={`data:image/png;base64,${qrCodeImg}`}
                            alt="QR Code para pagamento"
                            className={styles.qrCode}
                        />
                        <p className={styles.pixInstruction}>
                            Escaneie o QR Code acima no aplicativo do seu banco para efetuar o pagamento.
                        </p>
                        <p className={styles.pixLink}>
                            Ou <a href={link} target="_blank" rel="noopener noreferrer">clique aqui</a> para pagar diretamente no navegador.
                        </p>
                    </div>
                </main>
                <footer className={styles.footer}>
                    <p>© 2024 RUBY - MICROFOLHA. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default CheckEmail;
