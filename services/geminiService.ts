
import { GoogleGenAI, Type } from "@google/genai";
import { CvRoadmap, EuroOpportunity, GermanOpportunity, DreamerAnswers, UnifiedDreamResult } from "../types";

export interface MentorResponse {
  text: string;
  sources?: { title: string; uri: string }[];
}

const processResponse = (response: any): MentorResponse => {
    const text = response.text || "I couldn't generate a response at this time.";
    let sources: { title: string; uri: string }[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (groundingChunks) {
      const rawSources = groundingChunks
        .map((chunk: any) => {
          if (chunk.web?.uri && chunk.web?.title) {
            return { title: chunk.web.title as string, uri: chunk.web.uri as string };
          }
          return null;
        })
        .filter((s: any): s is { title: string; uri: string } => s !== null);
      
      const uniqueSourcesMap = new Map<string, { title: string; uri: string }>();
      for (const item of rawSources) {
        uniqueSourcesMap.set(item.uri, item);
      }
      sources = Array.from(uniqueSourcesMap.values());
    }

    return { text, sources };
};

// --- SPECIALIZED TECHNICAL TOOLS ---

export const generateTechnicalContent = async (toolType: string, input: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let prompt = "";

  switch(toolType) {
    case 'translator':
      prompt = `Translate the following technical engineering text into clear, professional Urdu. Focus on maintaining the accuracy of technical terms: "${input}"`;
      break;
    case 'coverLetter':
      prompt = `Write a professional, concise 250-word cover letter for a Pakistani DAE holder applying for this role/description: "${input}". Focus on technical hands-on skills.`;
      break;
    case 'interview':
      prompt = `Generate 5 technical interview questions and their brief answers for a DAE graduate for this position: "${input}".`;
      break;
    case 'plc':
      prompt = `Suggest basic PLC ladder logic steps or pseudo-code for the following industrial task: "${input}". Use industry-standard terminology.`;
      break;
    case 'studyPlan':
      prompt = `Create a 7-day intensive study plan for a PBTE DAE student for the subject: "${input}". Include daily topics and exam preparation tips.`;
      break;
    case 'grammarFixer':
      prompt = `Correct the grammar and professional tone of this technical text, ensuring it sounds like it was written by an expert engineer. Input: "${input}"`;
      break;
    case 'emailGenerator':
      prompt = `Write a formal professional email for a DAE technician regarding this topic: "${input}". Use a polite and standard business tone suitable for Pakistan or the Middle East.`;
      break;
    case 'mcqGen':
      prompt = `Generate 5 high-quality Multiple Choice Questions (MCQs) with answers for the following technical topic to help with DAE exam preparation: "${input}"`;
      break;
    case 'labReport':
      prompt = `Create a professional lab report outline (Aim, Apparatus, Procedure, Precautions) for this technical experiment: "${input}"`;
      break;
    case 'wordExplainer':
      prompt = `Explain this technical engineering term or concept in very simple language that a first-year DAE student can understand: "${input}"`;
      break;
    case 'presenter':
      prompt = `Create a 5-slide presentation script or outline for a technical project presentation on this topic: "${input}"`;
      break;
    case 'skillExtractor':
      prompt = `Analyze this job description and extract a list of specific technical skills and tools a DAE technician needs to highlight in their resume: "${input}"`;
      break;
    case 'syllabusSimplifier':
      prompt = `Simplify this PBTE syllabus topic into easy-to-remember bullet points and key formulas: "${input}"`;
      break;
    case 'codeDebugger':
      prompt = `Act as a senior software engineer. Debug this code snippet and explain the fix clearly. Focus on CIT/Computer Science context: "${input}"`;
      break;
    case 'mathFormula':
      prompt = `Explain this engineering math formula or problem step-by-step for a technical student: "${input}"`;
      break;
    default:
      prompt = input;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    return "The AI service is currently unavailable. Please try again later.";
  }
};

export const searchTechnicalResources = async (query: string): Promise<MentorResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for details about the following technical course/diploma: ${query}. 
      PRIORITY SOURCES: 
      1. For DAE/Diplomas: https://www.pbte.edu.pk/Course_p.aspx
      2. For Short Courses: https://navttc.gov.pk/
      
      Provide a summary of the course duration, eligibility, and which official body offers it.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are the Official Technical Course Assistant for Pakistan. 
        When users ask about DAE Diplomas, rely on PBTE (Punjab Board of Technical Education). 
        When users ask about Short Courses/Vocational training, rely on NAVTTC (National Vocational and Technical Training Commission).
        Always provide URLs to the official source if found.`,
      }
    });
    return processResponse(response);
  } catch (error) {
    console.error("Technical resource search failed", error);
    return { text: "Sorry, I'm having trouble searching for technical resources right now." };
  }
};

export const analyzeCvAndProvideRoadmap = async (
  cvData: string,
  cvMimeType: string,
  interests: string
): Promise<CvRoadmap> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const roadmapPrompt = `Analyze this DAE technician's CV. Extra Interests: ${interests}. 
  Provide a concrete technical roadmap in JSON format focusing on their skills and how they can reach their goals.`;

  const roadmapResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: cvData, mimeType: cvMimeType } },
        { text: roadmapPrompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          extractedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedJobs: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                reason: { type: Type.STRING }
              } 
            } 
          },
          suggestedCourses: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                title: { type: Type.STRING },
                level: { type: Type.STRING },
                description: { type: Type.STRING }
              } 
            } 
          },
          gapAnalysis: { type: Type.STRING },
          entrepreneurshipIdeas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "extractedSkills", "suggestedJobs", "suggestedCourses", "gapAnalysis", "entrepreneurshipIdeas"]
      }
    }
  });

  return JSON.parse(roadmapResponse.text || "{}");
};

export const generateCareerVision = async (field: string, location: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const visionPrompt = `A cinematic, hyper-realistic, 8k resolution photo of a successful Pakistani technician working as a ${field} in ${location}. 
  The lighting is professional, inspiring PPE. Focus on technical excellence and the specific environment of ${location}.`;

  const visionResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: visionPrompt }] },
    config: {
      imageConfig: { aspectRatio: "16:9" }
    } as any
  });

  for (const part of visionResponse.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return "";
};

export const generateUnifiedCareerDream = async (
  cvData: string,
  cvMimeType: string,
  answers: DreamerAnswers
): Promise<UnifiedDreamResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const roadmapPrompt = `Analyze this DAE technician's CV and synthesize it with their future dreams: 
  Target Location: ${answers.dreamLocation}. 
  Target Environment: ${answers.dreamEnvironment}. 
  Motivation: ${answers.primaryMotivation}.
  Provide a concrete technical roadmap in JSON format.`;

  const roadmapResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: cvData, mimeType: cvMimeType } },
        { text: roadmapPrompt },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          extractedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedJobs: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                reason: { type: Type.STRING }
              } 
            } 
          },
          suggestedCourses: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                title: { type: Type.STRING },
                level: { type: Type.STRING },
                description: { type: Type.STRING }
              } 
            } 
          },
          gapAnalysis: { type: Type.STRING },
          entrepreneurshipIdeas: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "extractedSkills", "suggestedJobs", "suggestedCourses", "gapAnalysis", "entrepreneurshipIdeas"]
      }
    }
  });

  const roadmap: CvRoadmap = JSON.parse(roadmapResponse.text || "{}");

  const topJob = roadmap.suggestedJobs[0]?.title || "Professional Technician";
  const visionPrompt = `A cinematic, hyper-realistic, 8k resolution photo of a successful Pakistani DAE Technician working as a ${topJob} in a high-tech ${answers.dreamEnvironment} in ${answers.dreamLocation}. 
  The lighting is golden hour, inspiring, professional PPE. The technician looks confident and skilled. 
  Focus on technical excellence and the specific environment of ${answers.dreamEnvironment}.`;

  const visionResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: visionPrompt }] },
    config: {
      imageConfig: { aspectRatio: "16:9" }
    } as any
  });

  let visionImageUrl = "";
  for (const part of visionResponse.candidates[0].content.parts) {
    if (part.inlineData) {
      visionImageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }

  return { roadmap, visionImageUrl };
};

export const searchJobsInPakistan = async (query: string): Promise<MentorResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for current job openings in Pakistan for DAE graduates or technical technicians matching this query: ${query}. 
      PRIORITY SOURCES: 
      1. WAPDA Career Portal
      2. Pakistan Atomic Energy Commission (PAEC)
      3. Private industrial firms (Lucky Cement, Engro, etc.)
      4. Job portals like Rozee.pk, Mustakbil, etc.
      
      Provide a list of 3-5 specific recent job openings with titles, companies, and links if available.`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are the Official Technical Job Assistant for Pakistan. 
        Help DAE graduates find relevant technical roles. 
        Always provide URLs to the job source if found.`,
      }
    });
    return processResponse(response);
  } catch (error) {
    console.error("Job search in Pakistan failed", error);
    return { text: "Sorry, I'm having trouble searching for jobs in Pakistan right now." };
  }
};

export const getMentorResponse = async (userMessage: string): Promise<MentorResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are an expert Career Counselor for DAE students in Pakistan. Help with jobs, higher studies, and technical business ideas.`,
      }
    });
    return processResponse(response);
  } catch (error) {
    return { text: "Sorry, I'm having trouble connecting." };
  }
};

export const searchGermanAusbildung = async (technology: string): Promise<GermanOpportunity[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Act as an expert career guide for international students. Search ausbildung.de, meinestatistik.de and other official German sources for current "Ausbildung" (vocational training/apprenticeship) positions in Germany for the ${technology} sector.

Requirements for each listing:
- Title of the Ausbildung
- Specific city in Germany
- Company name offering the position
- Minimum Language Level required (usually B1 or B2)
- Brief summary of the training
- Direct link to apply or view the source

Return the result as a detailed JSON array of 5 active matching positions. If no specific technology matches are found, look for general technical Apprenticeships for technical students.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              location: { type: Type.STRING },
              company: { type: Type.STRING },
              languageLevel: { type: Type.STRING },
              description: { type: Type.STRING },
              link: { type: Type.STRING }
            },
            required: ["title", "location", "company", "languageLevel", "description", "link"]
          }
        }
      }
    });

    const textResult = response.text || "[]";
    const sanitizedText = textResult.includes('```json') 
      ? textResult.split('```json')[1].split('```')[0].trim()
      : textResult.trim();

    return JSON.parse(sanitizedText || "[]");
  } catch (error) {
    console.error("German search failed:", error);
    return [];
  }
};

export const searchAbroadOpportunities = async (
  country: string, 
  technology: string, 
  portal: string,
  languageLevel?: string,
  visaType?: string
): Promise<EuroOpportunity[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `Act as a specialized international technical recruiter. Search the national job portal "${portal}" and other reputable sources for current job openings, apprenticeships, or vocational training positions in ${country} specifically for ${technology} technology professionals or students.

Filters to apply during search:
- Targeted Field: ${technology}
- Required Language Level: ${languageLevel || 'Any'}
- Visa Consideration: ${visaType || 'Any'}

Search for live, active listings. For each result, provide:
1. Job Title
2. Specific Location in ${country}
3. Company Name
4. Language Requirement (e.g., "B1 German", "English")
5. Brief Description (tech stack, role)
6. Direct Link to the job portal or company site
7. Country name
8. Source Portal Name
9. Visa type (if specified)

Return the results as a JSON array of up to 5 matching opportunities. If no specific results are found for the portal, search broadly for ${technology} jobs in ${country} for international applicants.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              location: { type: Type.STRING },
              company: { type: Type.STRING },
              languageRequirement: { type: Type.STRING },
              description: { type: Type.STRING },
              link: { type: Type.STRING },
              country: { type: Type.STRING },
              portalSource: { type: Type.STRING },
              visaType: { type: Type.STRING }
            },
            required: ["title", "location", "company", "languageRequirement", "description", "link", "country", "portalSource"]
          }
        }
      }
    });

    const textResult = response.text || "[]";
    // Try to sanitize if it's not pure JSON (sometimes models add markdown wrappers)
    const sanitizedText = textResult.includes('```json') 
      ? textResult.split('```json')[1].split('```')[0].trim()
      : textResult.trim();
      
    return JSON.parse(sanitizedText || "[]");
  } catch (error) {
    console.error("Abroad search failed:", error);
    // Return empty array instead of crashing
    return [];
  }
};
