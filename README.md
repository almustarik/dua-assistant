# Islamic Dua Assistant

A web-based Islamic Dua Assistant that allows users to ask questions about duas (prayers) and receive accurate responses from an open-source LLM (Large Language Model) powered by **Ollama**.

## ✨ Features
- **AI-powered** responses using an open-source LLM (Llama 2, Mistral, or any compatible model)
- **Predefined QA database** for fallback responses
- **React frontend** with a beautiful UI
- **References from authentic Islamic sources**
- **Supports multiple languages (including Bengali)**

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/almustarik/dua-assistant.git
 cd dua-assistant
```

### **2️⃣ Install Dependencies**
```sh
npm install  # or yarn install
```

---

## 🏗️ Backend Setup - Ollama

This project integrates **Ollama** for running an open-source LLM on your machine.

### **🔹 Install Ollama**
#### **For macOS & Linux**
```sh
curl -fsSL https://ollama.ai/install.sh | sh
```
#### **For Windows**
1. Download and install Ollama from [here](https://ollama.ai).
2. Open PowerShell and verify the installation:
   ```sh
   ollama --version
   ```

### **🔹 Start Ollama Server**
```sh
ollama serve
```
> If you encounter a port conflict on **11434**, kill the existing process or use a different port:
```sh
OLLAMA_PORT=11500 ollama serve
```

### **🔹 Download & Run a Model (e.g., Llama 2)**
```sh
ollama pull llama3
```

---

## 🌍 Frontend Setup (React)

### **🔹 Configure LLM in the Project**
**Ollama API integration**.

Edit `llm.ts` (located in `lib/llm.ts`):

```typescript
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
```

### **🔹 Run the Frontend**
```sh
npm run dev  # or yarn dev
```

---

## 📌 Usage
1. Start Ollama (`ollama serve`)
2. Start the React app (`npm run dev`)
3. Open `http://localhost:3000` in your browser
4. Type a question like:
   - "What dua should I recite in the morning?"
   - "What is the dua before eating?"
5. Get AI-generated responses, including **Bengali translations** if enabled.

---

## 📖 Future Enhancements
- **Multi-language support** (Enable Bengali translations)
- **Deploy on Vercel / Netlify**
- **Use a more powerful open-source LLM**
- **Enhance reference extraction** from LLM responses

---

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit PRs.

---

## 🔗 Links
- **Ollama Documentation:** [https://ollama.ai](https://ollama.ai)
- **Llama 3 Model:** [Meta AI](https://ai.meta.com/llama)
- **Project Repository:** [GitHub](https://github.com/almustarik/dua-assistant)

---

## 📜 License
MIT License. See `LICENSE` file for details.

---

_Developed with ❤️ for the Muslim community._

