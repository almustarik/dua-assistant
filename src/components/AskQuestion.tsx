// import React, { useState } from 'react';
// import { Send, BookOpen, Loader2 } from 'lucide-react';
// import { llmService } from '../lib/llm';

// // Keep the existing qa database for fallback responses
// const qaDatabase = [
//   {
//     keywords: ['morning', 'wake', 'waking'],
//     question: "What dua should I recite when waking up in the morning?",
//     answer: "When waking up in the morning, you can recite: 'Alhamdu lillahil-lathi ahyana ba'da ma amatana wa ilayhin-nushur' which means 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.'",
//     references: [
//       {
//         source: "Sahih Al-Bukhari",
//         book: "Book of Invocations",
//         number: "6324"
//       }
//     ]
//   },
//   {
//     keywords: ['eating', 'food', 'before'],
//     question: "What dua should I say before eating?",
//     answer: "Before eating, you should say 'Bismillah' (In the name of Allah). If you forget to say it at the beginning, you can say 'Bismillahi fi awwalihi wa akhirihi' (In the name of Allah at the beginning and at the end).",
//     references: [
//       {
//         source: "Sunan Abu Dawood",
//         book: "Book of Foods",
//         number: "3767"
//       },
//       {
//         source: "Jami' At-Tirmidhi",
//         book: "Book on Foods",
//         number: "1858"
//       }
//     ]
//   },
//   {
//     keywords: ['protection', 'evil', 'protect'],
//     question: "Is there a dua for protection from evil?",
//     answer: "Yes, one of the most powerful duas for protection is reading Ayatul Kursi (The Verse of the Throne, 2:255). The Prophet ﷺ said whoever recites it before sleeping will have Allah's protection all night long.",
//     references: [
//       {
//         source: "Sahih Al-Bukhari",
//         book: "Book of Virtues of the Qur'an",
//         number: "5010"
//       }
//     ]
//   }
// ];

// function AskQuestion() {
//   const [question, setQuestion] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState('');
//   const [references, setReferences] = useState<Array<{ source: string; book: string; number: string }>>([]);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // First try the LLM response
//       const llmResponse = await llmService.generateResponse(question);
//       setResponse(llmResponse);

//       // Extract references if they exist in the response
//       const referencesMatch = llmResponse.match(/References?:([^]*?)(?=\n\n|$)/i);
//       if (referencesMatch) {
//         const referenceText = referencesMatch[1];
//         const extractedRefs = referenceText.split('\n')
//           .map(ref => ref.trim())
//           .filter(ref => ref)
//           .map(ref => {
//             const [source, details = ''] = ref.split(',').map(s => s.trim());
//             return {
//               source: source.replace(/^[-*•]/, '').trim(),
//               book: details || 'General Reference',
//               number: ''
//             };
//           });
//         setReferences(extractedRefs);
//       } else {
//         setReferences([]);
//       }
//     } catch (err) {
//       console.error('Error with LLM:', err);
//       // Fallback to database
//       const fallbackAnswer = findFallbackAnswer(question);
//       setResponse(fallbackAnswer.answer);
//       setReferences(fallbackAnswer.references);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findFallbackAnswer = (query: string) => {
//     const lowercaseQuery = query.toLowerCase();

//     const match = qaDatabase.find(qa =>
//       qa.keywords.some(keyword => lowercaseQuery.includes(keyword))
//     );

//     if (match) {
//       return {
//         answer: match.answer,
//         references: match.references
//       };
//     }

//     return {
//       answer: "I apologize, but I don't have specific information about that. For the most accurate guidance, please consult with a qualified Islamic scholar. You might want to try asking about morning duas, eating duas, or protection duas.",
//       references: []
//     };
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
//         <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
//           Ask About Duas
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="question"
//               className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
//             >
//               Your Question
//             </label>
//             <textarea
//               id="question"
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
//               placeholder="Try asking: 'What dua should I say before eating?' or 'Is there a dua for protection?'"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !question.trim()}
//             className="flex items-center justify-center w-full px-4 py-2 space-x-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Send className="w-4 h-4" />
//             )}
//             <span>{loading ? 'Processing...' : 'Ask Question'}</span>
//           </button>
//         </form>

//         {error && (
//           <div className="p-4 mt-4 text-red-800 rounded-lg bg-red-50 dark:bg-red-900/30 dark:text-red-200">
//             {error}
//           </div>
//         )}

//         {response && (
//           <div className="mt-6 space-y-4">
//             <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
//               <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Response:</h3>
//               <p className="text-gray-700 whitespace-pre-wrap dark:text-gray-300">{response}</p>
//             </div>

//             {references.length > 0 && (
//               <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
//                 <div className="flex items-center mb-3 space-x-2">
//                   <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
//                   <h3 className="font-medium text-emerald-900 dark:text-emerald-200">References:</h3>
//                 </div>
//                 <ul className="space-y-2">
//                   {references.map((ref, index) => (
//                     <li key={index} className="text-sm text-emerald-800 dark:text-emerald-300">
//                       {ref.source}{ref.book ? `, ${ref.book}` : ''}{ref.number ? ` #${ref.number}` : ''}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AskQuestion;
import React, { useState } from 'react';
import { Send, BookOpen, Loader2 } from 'lucide-react';
import { llmService } from '../lib/llm';

// Keep the existing QA database for fallback responses
const qaDatabase = [
  {
    keywords: ['morning', 'wake', 'waking'],
    question: 'What dua should I recite when waking up in the morning?',
    answer:
      "When waking up in the morning, you can recite: 'Alhamdu lillahil-lathi ahyana ba'da ma amatana wa ilayhin-nushur' which means 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.'",
    references: [
      {
        source: 'Sahih Al-Bukhari',
        book: 'Book of Invocations',
        number: '6324',
      },
    ],
  },
  {
    keywords: ['eating', 'food', 'before'],
    question: 'What dua should I say before eating?',
    answer:
      "Before eating, you should say 'Bismillah' (In the name of Allah). If you forget to say it at the beginning, you can say 'Bismillahi fi awwalihi wa akhirihi' (In the name of Allah at the beginning and at the end).",
    references: [
      {
        source: 'Sunan Abu Dawood',
        book: 'Book of Foods',
        number: '3767',
      },
      {
        source: "Jami' At-Tirmidhi",
        book: 'Book on Foods',
        number: '1858',
      },
    ],
  },
  {
    keywords: ['protection', 'evil', 'protect'],
    question: 'Is there a dua for protection from evil?',
    answer:
      "Yes, one of the most powerful duas for protection is reading Ayatul Kursi (The Verse of the Throne, 2:255). The Prophet ﷺ said whoever recites it before sleeping will have Allah's protection all night long.",
    references: [
      {
        source: 'Sahih Al-Bukhari',
        book: "Book of Virtues of the Qur'an",
        number: '5010',
      },
    ],
  },
];

function AskQuestion() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [references, setReferences] = useState<
    Array<{ source: string; book: string; number: string }>
  >([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');
    setReferences([]);

    try {
      // First try the LLM response from Ollama
      const llmResponse = await llmService.generateResponse(question);
      setResponse(llmResponse);

      // Extract references if they exist in the response
      const extractedReferences = extractReferences(llmResponse);
      setReferences(extractedReferences);
    } catch (err) {
      console.error('Error with LLM:', err);
      setError(
        "Sorry, I'm having trouble processing your question. Please try again.",
      );

      // Fallback to predefined database
      const fallbackAnswer = findFallbackAnswer(question);
      setResponse(fallbackAnswer.answer);
      setReferences(fallbackAnswer.references);
    } finally {
      setLoading(false);
    }
  };

  const extractReferences = (text: string) => {
    const referencesMatch = text.match(/References?:([^]*?)(?=\n\n|$)/i);
    if (referencesMatch) {
      const referenceText = referencesMatch[1];
      return referenceText
        .split('\n')
        .map((ref) => ref.trim())
        .filter((ref) => ref)
        .map((ref) => {
          const [source, details = ''] = ref.split(',').map((s) => s.trim());
          return {
            source: source.replace(/^[-*•]/, '').trim(),
            book: details || 'General Reference',
            number: '',
          };
        });
    }
    return [];
  };

  const findFallbackAnswer = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const match = qaDatabase.find((qa) =>
      qa.keywords.some((keyword) => lowercaseQuery.includes(keyword)),
    );

    if (match) {
      return {
        answer: match.answer,
        references: match.references,
      };
    }

    return {
      answer:
        "I apologize, but I don't have specific information about that. For accurate guidance, please consult with a qualified Islamic scholar.",
      references: [],
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Ask About Duas
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="question"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Your Question
            </label>
            <textarea
              id="question"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              placeholder="Try asking: 'What dua should I say before eating?' or 'Is there a dua for protection?'"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 font-medium text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{loading ? 'Processing...' : 'Ask Question'}</span>
          </button>
        </form>

        {error && (
          <div className="p-4 mt-4 text-red-800 rounded-lg bg-red-50 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </div>
        )}

        {response && (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
              <h3 className="mb-2 font-medium text-gray-900 dark:text-white">
                Response:
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap dark:text-gray-300">
                {response}
              </p>
            </div>

            {references.length > 0 && (
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                <div className="flex items-center mb-3 space-x-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-medium text-emerald-900 dark:text-emerald-200">
                    References:
                  </h3>
                </div>
                <ul className="space-y-2">
                  {references.map((ref, index) => (
                    <li
                      key={index}
                      className="text-sm text-emerald-800 dark:text-emerald-300"
                    >
                      {ref.source}
                      {ref.book ? `, ${ref.book}` : ''}
                      {ref.number ? ` #${ref.number}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AskQuestion;
