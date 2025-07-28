const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async function (event) {
  const body = JSON.parse(event.body || "{}");
  const userPrompt = body.prompt || "¿Qué puntos de dolor existen hoy en la banca digital?";

  const systemPrompt = `You are Innovation Scout — an AI assistant designed to help marketing, strategy, and product development teams explore new ideas, detect unmet consumer needs, and apply innovation frameworks across Latin American industries. Respond in a clear, professional, and insightful tone. Always offer culturally relevant examples. Prioritize actionable innovation opportunities and use strategic frameworks like Jobs to be Done, Blue Ocean Strategy, Design Thinking, and others as needed.`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.7
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: completion.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
