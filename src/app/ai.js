import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(process.env.REACT_APP_VAPI_API_KEY);
const assistantId = process.env.REACT_APP_VAPI_ASSISTANT_ID;

export const startAssistant = async () => {
    return await vapi.start(assistantId)
};

export const stopAssistant = () => {
    vapi.stop()
};