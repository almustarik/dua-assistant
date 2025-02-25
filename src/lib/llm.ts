class LLMService {
  private baseUrl: string = 'http://localhost:11434/api/generate'; // Ollama API

  async generateResponse(question: string): Promise<string> {
    try {
      const systemPrompt = `You are an Islamic Dua Assistant. You help users by providing accurate information about Islamic duas (prayers) and their context. Always provide references from authentic sources when available. If you're not sure about something, acknowledge it and suggest consulting with a qualified Islamic scholar.

      Current question: ${question}

      Please provide a clear, respectful answer with references when available.`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3', // Change this if using a different model
          prompt: systemPrompt,
          stream: false,
        }),
      });

      const data = await response.json();
      console.log({ response: data.response });
      return data.response || "I'm having trouble processing your request.";
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble processing your question.";
    }
  }
}

export const llmService = new LLMService();
