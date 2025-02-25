class LLMService {
  private baseUrl: string = 'http://localhost:11434/api/generate'; // Ollama API

  // async generateResponse(question: string): Promise<string> {
  //   try {
  //     const systemPrompt = `You are an Islamic Dua Assistant. You help users by providing accurate information about Islamic duas (prayers) and their context. Always provide references from authentic sources when available. If you're not sure about something, acknowledge it and suggest consulting with a qualified Islamic scholar.

  //     Current question: ${question}

  //     Please provide a clear, respectful answer with references when available.`;

  //     const response = await fetch(this.baseUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         model: 'llama3', // Change this if using a different model
  //         prompt: systemPrompt,
  //         stream: false,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log({ response: data.response });
  //     return data.response || "I'm having trouble processing your request.";
  //   } catch (error) {
  //     console.error('Error generating response:', error);
  //     return "I'm having trouble processing your question.";
  //   }
  // }
  // async generateResponse(question: string): Promise<string> {
  //   try {
  //     const systemPrompt = `You are an **Islamic Dua Assistant**. Your ONLY purpose is to help users by providing **authentic Islamic duas (prayers)**, their context, and **Islamic guidance**.

  //   - **Strictly avoid responding to** any **non-Islamic** questions (e.g., coding, general knowledge, jokes).
  //   - If the user asks **anything unrelated to duas or Islamic teachings**, politely reply: "I can only assist with duas and Islamic knowledge."
  //   - Always provide **authentic references** (e.g., Quran, Hadith books like Sahih Al-Bukhari, Muslim, Tirmidhi).
  //   - If unsure, acknowledge and advise consulting an **Islamic scholar**.

  //   **User Question:** ${question}

  //   **Your Response (Islamic Answer Only):**`;

  //     const response = await fetch(this.baseUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         model: 'llama3',
  //         prompt: systemPrompt,
  //         stream: false,
  //       }),
  //     });

  //     const data = await response.json();
  //     return data.response ?? "I'm having trouble processing your request.";
  //   } catch (error) {
  //     console.error('Error generating response:', error);
  //     return "I'm having trouble processing your question.";
  //   }
  // }
  async generateResponse(question: string): Promise<string> {
    try {
      const systemPrompt = `You are an **Islamic Dua Assistant**, providing **accurate duas** and **authentic references**. Always include a "References" section at the end.

    - **ONLY answer Islamic-related questions.**  
    - If a question is **not about Islam or duas**, reply: "I only provide Islamic guidance."  
    - Always include **Hadith or Quranic references**.  
    - At the end of every response, add:

    **References:**  
    - Quran [Surah X:Verse Y]  
    - Hadith: [Source, Book X, Hadith Y]  

    **User Question:** ${question}

    **Your Response (Islamic Answer with References):**`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3',
          prompt: systemPrompt,
          stream: false,
        }),
      });

      const data = await response.json();
      return data.response ?? "I'm having trouble processing your request.";
    } catch (error) {
      console.error('Error generating response:', error);
      return "I'm having trouble processing your question.";
    }
  }
}

export const llmService = new LLMService();
