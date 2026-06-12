import { config } from './index';

const SARVAM_API_BASE = 'https://api.sarvam.ai';
const SARVAM_MODEL = 'sarvam-30b';

export const sarvamConfig = {
  apiKey: config.sarvamApiKey,
  baseUrl: SARVAM_API_BASE,
  model: SARVAM_MODEL,
};

export function getSarvamHeaders() {
  return {
    'Content-Type': 'application/json',
    'api-subscription-key': sarvamConfig.apiKey,
  };
}