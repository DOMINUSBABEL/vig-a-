import { GoogleGenAI } from "@google/genai";
import { AIReport, SecurityAlert, Contract, EconomicIndicator, FiscalSanction, TrackedObject } from '../types';

export const generateSituationReport = async (
  alerts: SecurityAlert[],
  contracts: Contract[],
  economy: EconomicIndicator[],
  sanctions: FiscalSanction[],
  traffic: TrackedObject[]
): Promise<AIReport> => {
  
  if (!process.env.API_KEY) {
    console.warn("API Key not found. Returning mock AI report.");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: "ANÁLISIS INTEGRADO: Se detectan movimientos aéreos inusuales de aeronaves privadas en zonas con alertas de orden público activas. La red de contratación muestra vínculos con empresas sancionadas fiscalmente.",
          riskAssessment: "NIVEL DE RIESGO: ALTO. Correlación positiva entre financiación de campañas y adjudicación de contratos en infraestructura. Se recomienda auditoría forense a consorcios viales.",
          timestamp: new Date().toISOString()
        });
      }, 1500);
    });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Actúa como un oficial de inteligencia estratégica de alto nivel (NSA/CIA style) para Colombia.
    Analiza los siguientes vectores de información y genera un reporte SITREP (Situation Report) táctico.
    
    VECTOR 1: ORDEN PÚBLICO (Alertas): ${JSON.stringify(alerts)}
    VECTOR 2: DINERO (Contratos Recientes): ${JSON.stringify(contracts)}
    VECTOR 3: ECONOMÍA (Indicadores): ${JSON.stringify(economy)}
    VECTOR 4: LEGAL/FISCAL (Sanciones): ${JSON.stringify(sanctions)}
    VECTOR 5: TÁCTICO (Tráfico Aéreo/Marítimo): ${JSON.stringify(traffic)}

    Identifica patrones ocultos. ¿Hay aviones privados cerca de zonas de conflicto? ¿Hay empresas sancionadas ganando contratos?

    Formato JSON requerido:
    {
      "summary": "Resumen ejecutivo estilo militar/inteligencia.",
      "riskAssessment": "Evaluación de amenazas híbridas y recomendaciones."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const parsed = JSON.parse(text);
    
    return {
      summary: parsed.summary || "No se pudo generar el resumen.",
      riskAssessment: parsed.riskAssessment || "Sin evaluación.",
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return {
      summary: "Error al conectar con el módulo de inteligencia artificial.",
      riskAssessment: "Sistemas offline.",
      timestamp: new Date().toISOString()
    };
  }
};