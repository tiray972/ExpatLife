import nodemailer from "nodemailer";

// Méthode POST pour traiter la soumission du formulaire
export async function POST(req) {
  const { name, surname, message } = await req.json(); // Utilisation de `req.json()` pour accéder aux données du body

  if (!name || !surname || !message) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  try {
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net", // Exemple pour le serveur SMTP d'OVH
      port: 465,
      secure: true, // True pour 465, false pour les autres ports
      auth: {
        user: process.env.EMAIL_USER, // Votre adresse e-mail
        pass: process.env.EMAIL_PASS, // Votre mot de passe ou mot de passe d'application
      },
    });

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Email de l'expéditeur
      to: "contact@expatlife-uae.com", // Email du destinataire
      subject: "Contact Form Submission",
      text: `
        Name: ${name}
        Surname: ${surname}
        Message: ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Surname:</strong> ${surname}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email." }),
      { status: 500 }
    );
  }
}
