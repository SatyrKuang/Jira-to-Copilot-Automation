export interface ProviderConfig {
  description?: string;
  capabilities?: string[];
  apiVersion?: string;
  lastUpdated?: string;
  [key: string]: string | string[] | number | boolean | undefined;
}

export interface Provider {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  config?: ProviderConfig;
}

export interface ProviderManager {
  getProvider(id: string): Provider | undefined;
  getAllProviders(): Provider[];
  addProvider(provider: Provider): void;
}