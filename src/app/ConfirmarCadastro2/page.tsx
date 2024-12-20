"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation"; // Importar de 'next/navigation' ao invés de 'next/router'
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { config } from "dotenv"; // Para carregar variáveis de ambiente
import Modal from "react-modal";
import styles from "./page.module.scss";
import logoImg from "/public/RUBY9.png";
import Image from "next/image"; 
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputDate from "../components/inputDate";
import CheckEmail from "../components/CheckEmail";
import LoadingSpinner from "../LoadingSpinner/page";
import MessageError from "../MessageError/page";
import InputPassword from "../components/InputPassword";
import CheckPagamento from "../CheckPagamento/page";

export default function ConfirmarCadastro2() {
     const [CNPJ, setCNPJ] = useState<string>("");
      const [endereco, setEndereco] = useState<string>("");
      const [bairro, setBairro] = useState<string>("");
      const [cidade, setCidade] = useState<string>("");
      const [telefone, setTelefone] = useState<string>("");
      const [empresa, setEmpresa] = useState<string>("");
      const [razao, setRazao] = useState<string>("");
      const [email, setEmail] = useState<string>("");
      const [senha, setSenha] = useState<string>("");
      const [confirmSenha, setConfirmSenha] = useState<string>("");
      const [mesMovimentoInical, setMesMovimentoInicial] = useState('');  // Mês de Movimento Inicial
      const [mesMovimentoFinal, setMesMovimentoFinal] = useState('');  // 
      const [emissao, setEmissao] = useState('');  // 
      const [versao, setVersao] = useState('');  // 
      const [contrato, setContrato] = useState('');  // 
      const [nomePagador, setNomePagador] = useState('');  //
      const [proprietario, setProprietario] = useState('');  //
    
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const [tipoPlano, setTipoPlano] = useState("");
      const [diffMes, setDiffMes] = useState<any>(true);
      const [totalFuncionarios, setTotalFuncionarios] = useState<String>("");
      const [valorPago, setValorPago] = useState("");
      const [exibirValorPago, setExibirValorPago] = useState(false);
      const router = useRouter();
      // const searchParams = useSearchParams();  // Utiliza useSearchParams para acessar os parâmetros da URL
      // const token = searchParams.get('token');
      const [tokenData, setTokenData] = useState<any>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<any>("");
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [result, setResult] = useState<boolean>(false);
      const [result2, setResult2] = useState<boolean>(false);
      const [idPix, setIdPix] = useState<string>("");
      const [valorPix, setValorPix] = useState<string>("");
      const [qrCodePix, setQrCodePix] = useState<string>("");
      const [qrCodeImgPix, setQrCodeImgPix] = useState<string>("");
      const [linkPix, setLinkPix] = useState<string>("");
    
      async function fetchAndProcessTXT() {
        try {
          // Faz a requisição GET para obter o arquivo TXT
          const response = await axios.get("http://micromoney.com.br/ruby/dados/rub_pla.php");
          const data = response.data;
    
          // Extração dos valores usando expressões regulares
          const valorBaseMatch = data.match(/<LIC>(.*?)<\/LIC>/);
          const taxaFUNMatch = data.match(/<FUN>(.*?)<\/FUN>/);
          const taxaFATMatch = data.match(/<FAT>(.*?)<\/FAT>/);
    
          // Converte os valores encontrados para números
          const valorBase = valorBaseMatch ? parseFloat(valorBaseMatch[1]) : null;
          const taxaFUN = taxaFUNMatch ? parseFloat(taxaFUNMatch[1]) : null;
          const taxaFAT = taxaFATMatch ? parseFloat(taxaFATMatch[1]) : null;
    
          // Valida se todos os valores foram extraídos corretamente
          if (valorBase === null || taxaFUN === null || taxaFAT === null) {
            throw new Error("Não foi possível extrair os valores do arquivo TXT.");
          }
    
    
          return { valorBase, taxaFUN, taxaFAT };
        } catch (error: any) {
          console.error("Erro ao buscar ou processar o TXT:", error.message);
          return null;
        }
      }
    
      
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      // Quando o token está disponível, faça a requisição para verificar o token
      const verifyToken = async () => {
        try {
          const response = await axios.post('https://projeto-ruby-back-end.vercel.app/verificarToken', { token });
          if (response.data.valid) {
            setTokenData(response.data.decoded); // Armazena os dados decodificados
            setLoading(false);

            const {
              EMP,
              DES,
              CGC,
              EDR,
              BAI,
              CID,
              TEL,
              LOG,
              PWD,
              INI,
              FIM,
              MAT,
              EMI,
              VER,
              CTR,
              PRP
            } = response.data.decoded;


            setEmpresa(EMP || "");
            setRazao(DES || "");
            setCNPJ(CGC || "");
            setEndereco(EDR || "");
            setBairro(BAI || "");
            setCidade(CID || "");
            setTelefone(TEL || "");
            setEmail(LOG || "");
            setSenha(PWD || "");
            setTipoPlano(MAT || "");
            setMesMovimentoInicial(INI)
            setMesMovimentoFinal(FIM);
            setEmissao(EMI);
            setVersao(VER);
            setContrato(CTR);
            setProprietario(PRP);

          } else {
            setError("Token inválido ou expirado.");
            setLoading(false);
          }
        } catch (error) {
          setError(<MessageError />);
          setLoading(false);
        }
      };
      verifyToken();
    }

    fetchAndProcessTXT();


  }, [router]);

  // if (loading) return <p>Carregando...</p>
  if (loading) return <LoadingSpinner />
  if (error) return <p>{error}</p>


  const closeModal = () => {
    setIsModalOpen(false);

    // Reseta as datas para o mês atual (11/2024)
    const mesAtual = new Date();
    const mes = (mesAtual.getMonth() + 1).toString().padStart(2, '0');  // Formato MM
    const ano = mesAtual.getFullYear().toString();  // Formato YYYY

    setMesMovimentoInicial(`${mes}/${ano}`);  // Atualiza o mês de movimento inicial
    setMesMovimentoFinal(`${mes}/${ano}`);  // Atualiza o mês de movimento final

  };

  const handleConfirm = () => {

    if (!valorPago) {
      toast.error("Por favor, calcule o valor do seu Plano.", { position: "top-right", autoClose: 3000 });
      return;
    }

    if (tipoPlano) {
    } else {
      toast.error("Por favor, selecione um plano.", { position: "top-right", autoClose: 3000 });
      return;
    }
    setIsLoading(true);
    handleSubmit();

  };


  const handlePlanChange = (e: ChangeEvent<HTMLSelectElement>) => {

    const plan = e.target.value;
    setTipoPlano(plan);
    // calcularValorPlano();

    // Atualiza os dados do plano
    if (plan === "05") {
      setTotalFuncionarios("5 Funcionários");
    } else if (plan === "10") {
      setTotalFuncionarios("10 Funcionários");
    } else if (plan === "20") {
      setTotalFuncionarios("20 Funcionários");
    } else if (plan === "40") {
      setTotalFuncionarios("40 Funcionários");
    } else if (plan === "80") {
      setTotalFuncionarios("80 Funcionários");
    } else {
      setTotalFuncionarios("0");
    }

    // Calcular o valor do plano
    // calcularValorPlano();

    setValorPago("");

  };

  const handleDateChange = (date: string, type: 'inicio' | 'final') => {
    setValorPago("");
    if (type === 'inicio') {
      setMesMovimentoInicial(date);  // Atualiza o mês de movimento inicial
    } else {
      setMesMovimentoFinal(date);  // Atualiza o mês de movimento final
    }
  };

  async function calcularValorPlano() {
    const meses = calcularMeses(mesMovimentoInical, mesMovimentoFinal);

    if (!meses) {
      setValorPago("");
      return;
    }

    try {
      const dadosPlano = await fetchAndProcessTXT();

      if (!dadosPlano) {
        setValorPago("");
        return;
      }

      const { valorBase, taxaFUN, taxaFAT } = dadosPlano;

      let multiplicadorFuncionario = 1;
      let valorFinal = valorBase;

      switch (tipoPlano) {
        case "10":
          multiplicadorFuncionario = taxaFUN;
          break;
        case "20":
          multiplicadorFuncionario = taxaFUN ** 2;
          break;
        case "40":
          multiplicadorFuncionario = taxaFUN ** 3;
          break;
        case "80":
          multiplicadorFuncionario = taxaFUN ** 4;
          break;
        default:
          multiplicadorFuncionario = 1;
      }

      valorFinal *= multiplicadorFuncionario;
      valorFinal *= meses === 1 ? 1 : taxaFAT ** (meses - 1);

      console.log("Valor antes do arredondamento:", valorFinal);

      // Garantir que valorFinal é um número
      valorFinal = parseFloat(valorFinal.toString());

      // Arredondando para baixo para 2 casas decimais
      valorFinal = Math.floor(valorFinal * 100) / 100;

      console.log("Valor arredondado:", valorFinal);

      valorFinal = Math.round(valorFinal);

      setValorPago(`R$ ${valorFinal.toFixed(2)}`);
      setExibirValorPago(true);
    } catch (error: any) {
      console.error("Erro ao calcular valor do plano:", error.message);
      setValorPago("");
    }
  }




  // Função para calcular a quantidade de meses entre as datas no formato MM/YYYY
  const calcularMeses = (dataInicial: string, dataFinal: string): any => {
    const [mesInicio, anoInicio] = dataInicial.split('/');
    const [mesFim, anoFim] = dataFinal.split('/');
  
    // Criando objetos Date usando o primeiro dia de cada mês
    const inicio = new Date(parseInt(anoInicio), parseInt(mesInicio) - 1, 1);  // Mês começa em 0, então subtrai 1
    const fim = new Date(parseInt(anoFim), parseInt(mesFim) - 1, 1);  // Mês começa em 0, então subtrai 1
  
    // Data atual
    const hoje = new Date();
    const mesAtual = hoje.getMonth(); // Mês atual (0-11)
    const anoAtual = hoje.getFullYear(); // Ano atual
  
    // Verifica se a data inicial é anterior ao mês/ano atual
    if (inicio < new Date(anoAtual, mesAtual, 1)) {
      toast.error("A data inicial não pode ser inferior ao mês atual!", { position: "top-right", autoClose: 3000 });
      return;
    }
  
    // Verifica se a data final é anterior ao mês/ano atual
    if (fim < new Date(anoAtual, mesAtual, 1)) {
      toast.error("A data final não pode ser inferior ao mês atual!", { position: "top-right", autoClose: 3000 });
      return;
    }
  
    // Verifica se a data inicial é maior que a data final
    if (inicio > fim) {
      toast.error("Confira as datas de Referência!", { position: "top-right", autoClose: 3000 });
      return;
    }
  
    // Calcula a diferença de meses entre as datas
    const diferencaMeses = (fim.getFullYear() - inicio.getFullYear()) * 12 + (fim.getMonth() - inicio.getMonth());
    let diferencaMesesMaisUm = diferencaMeses + 1;
  
    return diferencaMesesMaisUm;
  };
  


  const verificarStatusPagamento = (paymentId: string, token: string) => {
    const intervalo = setInterval(async () => {
      try {
        const resposta = await axios.get(`https://projeto-ruby-back-end.vercel.app/consultarStatus/${paymentId}`);
  
        const status = resposta.data.status; // 'approved', 'pending', 'rejected'
        console.log('Status atual do pagamento:', status);
  
        if (status === 'approved') {
          clearInterval(intervalo); // Parar o timer
  
          const externalReference = resposta.data.external_reference;
          const dateApproved = resposta.data.date_approved;

          // Requisição para validar o plano
          try {
            const validarResposta = await axios.post(`https://projeto-ruby-back-end.vercel.app/validarPlano`, { token, externalReference, dateApproved });
  
            console.log('Resposta da validação do plano:', validarResposta.data);
  
            if (validarResposta.status === 200) {
              setResult(false);
              setResult2(true);
              // alert('Plano validado com sucesso!');
              toast.success( "Plano validado com sucesso!", { position: "top-right", autoClose: 3000 });

            } else {
              // alert('Erro ao validar plano.');
              toast.error( "Erro ao validar plano.", { position: "top-right", autoClose: 3000 });
            }
          } catch (erroValidar) {
            console.error('Erro ao validar plano:', erroValidar);
            alert('Erro ao validar plano.');
          }
        } else if (status === 'rejected') {
          alert('Pagamento rejeitado. Tente novamente.');
          clearInterval(intervalo); // Parar o timer
        }
        // Caso seja "pending", continua verificando
      } catch (erro) {
        console.error('Erro ao consultar status do pagamento:', erro);
        clearInterval(intervalo); // Parar o timer em caso de erro
      }
    }, 5000); // Intervalo de 5 segundos
  };

  const handleSubmit = async () => {

    const mesesMovimento = calcularMeses(mesMovimentoInical, mesMovimentoFinal);  // Calcula a quantidade de meses

    console.log(mesesMovimento);
    if (!mesesMovimento) {
      return;
    }

    let cnpj = CNPJ.replace(/[^\d]/g, '');
    let valorPagoFloat = parseFloat(valorPago.replace("R$", "").trim());

    // Converter 'emissao' (string no formato xx/yy/zzzz) para um objeto Date
    const emissaoParts = emissao.split("/"); // Divide a string 'emissao' em dia, mês e ano
    const emissaoDate = new Date(
      parseInt(emissaoParts[2]), // Ano
      parseInt(emissaoParts[1]) - 1, // Mês (0-indexado em Date)
      parseInt(emissaoParts[0]) // Dia
    );

    // Incrementar 3 dias
    emissaoDate.setDate(emissaoDate.getDate() + 3);

    // Formatar a nova data para o formato xx/yy/zzzz
    const dataFormatada = `${String(emissaoDate.getDate()).padStart(2, "0")}/${String(emissaoDate.getMonth() + 1).padStart(2, "0")
      }/${emissaoDate.getFullYear()}`;

    // Atualizar a propriedade 'DAT' com a nova data
    const data = {
      EMP: empresa,
      CGC: CNPJ,
      DES: razao,
      PRP: proprietario,
      EDR: endereco,
      BAI: bairro,
      CID: cidade,
      TEL: telefone,
      LOG: email,
      PWD: senha,
      CTR: contrato,
      INI: mesMovimentoInical,
      FIM: mesMovimentoFinal,
      MAT: tipoPlano,
      EMI: emissao,
      DAT: dataFormatada, // Nova data com 3 dias incrementados
      VER: versao,
      VAL: valorPagoFloat,
      NOM: proprietario
    };

    
    console.log(data);
    // Inclui mesMovimento no envio de dados
    try {

      const response = await fetch("https://projeto-ruby-back-end.vercel.app/confirmarPlano", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });


      const result = await response.json();

      setIdPix(result.pix.id);
      setValorPix(result.pix.valor);
      setQrCodePix(result.pix.qrcode);
      setQrCodeImgPix(result.pix.qrCodeImg);
      setLinkPix(result.pix.link);
      
      
      // console.log("Result: " + JSON.stringify(result));

      if (result.success) {
        toast.success(result.message, { position: "top-right", autoClose: 3000 });
        // setTimeout(() => setResult(true), 1500);
        setResult(true);

        verificarStatusPagamento(result.pix.id, result.token);
      } else {
        toast.error(result.message, { position: "top-right", autoClose: 3000 });
      }


    } catch (error) {
      toast.error("Erro: Plano Já Existente ou Inválido!", { position: "top-right", autoClose: 3000 });
    } finally {
      setIsLoading(false);
      setIsModalOpen(false); 
    }
  
  
  };

  return(
    <div className={styles.containerCenter}>

      {isLoading && (
        <div className={styles.loadingOverlay}>
          {/* <h2 className={styles.loading}>Carregando...</h2> */}
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && !result && !result2 && (
        <>
          <Image className={styles.img} src={logoImg} alt="micromoney" />
          <section className={styles.loginForm}>
            <h2 className={styles.h2}>Confirme seu Plano</h2>
            <div className={styles.selectContainer}>
                <div className={styles.dataContainer}>
                    <div className={styles.labelContainer}>
                    <label className={styles.label}>Mês de Movimento Inicial </label>
                    <InputDate
                        initialValue={mesMovimentoInical}
                        onDateChange={(date) => handleDateChange(date, 'inicio')}
                    />
                    </div>

                    <div className={styles.labelContainer}>
                    <label className={styles.label}>Mês de Movimento Final </label>
                    <InputDate
                        initialValue={mesMovimentoFinal}
                        onDateChange={(date) => handleDateChange(date, 'final')}
                    />
                    </div>
                </div>

                <label htmlFor="planSelect" className={styles.label}>Quantidade de Funcionários</label>
                <div className={styles.calcContainer}>
                    <select
                    id="planSelect"
                    className={styles.select}
                    value={tipoPlano}
                    onChange={handlePlanChange}
                    required
                    >
                    <option value="00" defaultChecked>Selecione</option>
                    <option value="05">5 Funcionários</option>
                    <option value="10">10 Funcionários</option>
                    <option value="20">20 Funcionários</option>
                    <option value="40">40 Funcionários</option>
                    <option value="80">80 Funcionários</option>
                    </select>

                    
                </div>


                <div
                    className={styles.valorApagarContainer}
                    style={{ display: exibirValorPago ? 'block' : 'none', flexDirection: "column" }} // Controla a visibilidade
                >
                    <label className={styles.label}>
                    Valor a Ser Pago
                    </label><br />

                    <input
                    title="valorPago"
                    type="text"
                    value={valorPago}
                    disabled
                    className={styles.input2}
                    />
                </div>

                </div>

                <button className={styles.calcButton} onClick={calcularValorPlano}>
                    Recalcular Valor
                </button>

                <button className={styles.confirmButton} onClick={handleConfirm}>
                    Confirmar Plano
                </button>
            </section>
        </>
      )}

      {result && (
        <div className={styles.resultContainer}>

          <CheckEmail
            valor={valorPix}
            qrCode={qrCodePix}
            qrCodeImg={qrCodeImgPix}
            link={linkPix}
          />
        </div>
      )}

      {
        result2 && (
          <div className={styles.resultContainer}>
            <CheckPagamento />
          </div>
        )
      }

      <ToastContainer />
    </div>
  );

}