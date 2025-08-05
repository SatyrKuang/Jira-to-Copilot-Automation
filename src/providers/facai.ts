import type { Provider } from '../types/provider';

export const facaiProvider: Provider = {
  id: '1234526537475',
  name: 'FaCai',
  type: 'automation',
  status: 'active',
  config: {
    description: 'FaCai provider for Jira to Copilot automation',
    capabilities: ['jira-integration', 'copilot-automation', 'workflow-management'],
    apiVersion: '1.0',
    lastUpdated: new Date().toISOString()
  }
};