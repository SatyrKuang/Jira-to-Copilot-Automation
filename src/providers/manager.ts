import type { Provider, ProviderManager } from '../types/provider';
import { facaiProvider } from './facai';

class DefaultProviderManager implements ProviderManager {
  private providers: Map<string, Provider> = new Map();

  constructor() {
    // Initialize with FaCai provider
    this.addProvider(facaiProvider);
  }

  getProvider(id: string): Provider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): Provider[] {
    return Array.from(this.providers.values());
  }

  addProvider(provider: Provider): void {
    this.providers.set(provider.id, provider);
  }
}

export const providerManager = new DefaultProviderManager();