const axios = require("axios");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  const { message } = JSON.parse(event.body);
  const apiKey = process.env.GROQ_API_KEY; // Se configura en el panel de Netlify

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `Eres TI-Bot, el asistente inteligente de la carrera de TI en la UNESUM.
          Usa la siguiente información para responder:
          - Prácticas: Se realizan en instituciones con convenio. Si no hay convenio, gestionar en secretaría.
          - Biblioteca: Atiende de 08:00 a 18:00. Ofrece Urkund, libros digitales y préstamos.
          - Admisión: Encargada de requisitos de ingreso, homologación y matrículas.
          - Bienestar Estudiantil: Gestiona becas y servicios médicos.
          - Ubicación: Campus Jipijapa, Guayas.
          Si no sabes la respuesta, sugiere contactar a secretaria@unesum.edu.ec.`,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.data.choices[0].message.content }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al conectar con la IA" }),
    };
  }
};
