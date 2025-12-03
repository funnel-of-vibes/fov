import {VibeAnalysisResult} from "../types";

const processVibeCheck = async (name: string, description: string): Promise<VibeAnalysisResult> => {
        return {
            vibeScore: Math.floor(Math.random() * 30) + 50,
            shortDescription: "LLM analysis unavailable (undesired maybe? :)). Running simulation."
        };
    }
;

export {processVibeCheck};