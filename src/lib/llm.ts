// import { ChatModule, type ChatOptions, type Generation } from '@mlc-ai/web-llm';

// class LLMService {
//   private chat: ChatModule | null = null;
//   private isInitialized = false;

//   private async initialize() {
//     if (this.isInitialized) return;

//     this.chat = new ChatModule();
//     await this.chat.reload({
//       model: "Llama-2-7b-chat-q4f32_1",
//       repetitionPenalty: 1.1,
//       maxGenLength: 2048,
//     } as ChatOptions);

//     this.isInitialized = true;
//   }

//   async generateResponse(question: string): Promise<string> {
//     try {
//       if (!this.chat) {
//         await this.initialize();
//       }

//       if (!this.chat) {
//         throw new Error("Failed to initialize chat module");
//       }

//       const systemPrompt = `You are an Islamic Dua Assistant. You help users by providing accurate information about Islamic duas (prayers) and their context. Always provide references from authentic sources when available. If you're not sure about something, acknowledge it and suggest consulting with a qualified Islamic scholar.

// Current question: ${question}

// Please provide a clear, respectful answer with references when available.`;

//       await this.chat.resetChat();
//       await this.chat.generate(systemPrompt);
//       const response: Generation = await this.chat.generate(question);

//       return response.text;
//     } catch (error) {
//       console.error('Error generating response:', error);
//       return "I apologize, but I'm having trouble processing your question right now. Please try again later or refer to the predefined duas in our collection.";
//     }
//   }
// }

// export const llmService = new LLMService();
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
