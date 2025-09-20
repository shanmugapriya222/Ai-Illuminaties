const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Gets a response from the AI model.
 * @param {string} userInput - The user's message/prompt.
 * @returns {Promise<string>} The AI's text response.
 */
async function getAIAssistantResponse(userInput) {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // This is a basic prompt. You can enhance it with more context about the user
    // to get more personalized and accurate career advice.
    const prompt = `You are an expert career mentor for a platform called CareerPath AI. 
    Your role is to provide supportive, insightful, and actionable advice. 
    A user has asked the following question: "${userInput}". 
    
    Please provide a helpful and encouraging response.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error getting response from Google AI:', error);
    return 'I am currently unable to respond. Please try again later.';
  }
}

module.exports = { getAIAssistantResponse };