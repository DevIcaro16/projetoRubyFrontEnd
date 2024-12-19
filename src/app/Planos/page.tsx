import Link from "next/link";
import styles from "./page.module.scss";
import logoImg from "/public/RUBY9.png";
import Image from "next/image";

export default function Planos() {
  return (
    <>
      <div className={styles.containerCenter}>
        

        <div className={styles.h2}>
            <h1>Adquira o</h1>
            <Image className={styles.img} src={logoImg} alt="micromoney" />
        </div>

        <div className={styles.divider}></div>

        <section className={styles.cardsContainer}>
          {/* Card 1 - Plano Gratuito */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plano Gratuito</h2>
            </div>
            <div className={styles.cardPrice}>
              <h3>1 Mês</h3>
            </div>
            <div className={styles.cardAttributes}>
              {/* Aqui vai os atributos do plano */}
              <div className={styles.p}>
                <p>Vantagem 1</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
              </div>
            </div>
            <div className={styles.cardFooter}>
              <Link href="https://micromoney.com.br/RUBY.zip" className={styles.button}>
                Download
              </Link>
            </div>
          </div>

          {/* Card 2 - Plano Mensal */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plano Mensal</h2>
            </div>
            <div className={styles.cardPrice}>
              <h3>R$ 49,90 / Mês</h3>
            </div>
            <div className={styles.cardAttributes}>
              {/* Aqui vai os atributos do plano */}
                <p>Vantagem 1</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 2</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
            </div>
            <div className={styles.cardFooter}>
              <Link href="/" className={styles.button}>
                Comprar
              </Link>
            </div>
          </div>

          {/* Card 3 - Plano Semestral */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plano Semestral</h2>
            </div>
            <div className={styles.cardPrice}>
              <h3>R$ 39,90 / Mês</h3>
            </div>
            <div className={styles.cardAttributes}>
              {/* Aqui vai os atributos do plano */}
                <p>Vantagem 1</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 2</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 3</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 4</p>
                <div className={styles.divider2}></div>
                <p>X</p>
                <div className={styles.divider2}></div>
            </div>
            <div className={styles.cardFooter}>
              <Link href="/" className={styles.button}>
                Comprar
              </Link>
            </div>
          </div>


          {/* Card 4 - Plano Anual */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plano Anual</h2>
            </div>
            <div className={styles.cardPrice}>
              <h3>R$ 29,90 / Mês</h3>
            </div>
            <div className={styles.cardAttributes}>
              {/* Aqui vai os atributos do plano */}
                <p>Vantagem 1</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 2</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 3</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 4</p>
                <div className={styles.divider2}></div>
                <p>Vantagem 5</p>
                <div className={styles.divider2}></div>
            </div>
            <div className={styles.cardFooter}>
              <Link href="/" className={styles.button}>
                Comprar
              </Link>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
