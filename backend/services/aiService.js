import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let ai = null;

try {
  if (process.env.GOOGLE_AI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    console.log('Google AI SDK initialized.');
  } else {
    console.warn('⚠️ GOOGLE_AI_API_KEY missing. AI features will be mocked.');
  }
} catch (error) {
  console.error('Error initializing Google AI SDK:', error);
}

/**
 * Evaluate student answers using Google AI.
 * Handles timeouts, retries, and error handling.
 */
export const evaluateAssessment = async (track, questions, studentAnswers) => {
  // Mock evaluation if no API key
  if (!ai) {
    return mockEvaluation(questions, studentAnswers);
  }

  const prompt = `
    You are an expert technical evaluator for the Nexiv Engineering Learning Platform.
    Track: ${track}
    
    The student has submitted an assessment. Please evaluate their answers.
    
    Questions and Expected Concepts:
    ${JSON.stringify(questions, null, 2)}
    
    Student Answers:
    ${JSON.stringify(studentAnswers, null, 2)}
    
    Instructions:
    1. For objective questions (MCQ/True-False), strictly check if the answer is correct.
    2. For short answers, compare with expected concepts. Award partial points if applicable.
    3. Calculate a final score out of 100.
    4. Provide question-wise analysis, explanations for incorrect answers, and detect plagiarized or nonsensical answers.
    5. Recommend revision topics based on weak areas.
    6. Return ONLY a valid JSON object matching the following structure exactly, no markdown formatting blocks, no extra text:
    {
      "score": 85,
      "passed": true, // passing score is 70
      "questionAnalysis": [
        { "questionId": "q1", "isCorrect": true, "pointsAwarded": 10, "feedback": "Good job." }
      ],
      "weakConcepts": ["React Hooks"],
      "strongConcepts": ["JavaScript Fundamentals"],
      "recommendedModules": ["Advanced React Patterns"]
    }
  `;

  let retries = 3;
  while (retries > 0) {
    try {
      // Using gemini-2.5-flash as the standard efficient model
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        }
      });
      
      const resultText = response.text();
      return JSON.parse(resultText);
      
    } catch (error) {
      console.error(`AI Evaluation failed. Retries left: ${retries - 1}`, error);
      retries--;
      if (retries === 0) {
        throw new Error('AI Evaluation Service Unavailable after retries.');
      }
      // Wait before retry
      await new Promise(res => setTimeout(res, 1000));
    }
  }
};

function mockEvaluation(questions, studentAnswers) {
  return {
    score: 85,
    passed: true,
    questionAnalysis: questions.map((q, i) => ({
      questionId: q.id,
      isCorrect: true,
      pointsAwarded: 10,
      feedback: "Correctly answered."
    })),
    weakConcepts: ["Mock Concept"],
    strongConcepts: ["Mock Concept"],
    recommendedModules: ["Mock Module"]
  };
}
