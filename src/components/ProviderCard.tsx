import React from 'react';
import type { Provider } from '../types/provider';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const getStatusColor = (status: Provider['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            provider.status
          )}`}
        >
          {provider.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">ID:</span>
          <span className="font-mono text-sm">{provider.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="text-gray-800">{provider.type}</span>
        </div>
      </div>

      {provider.config && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Configuration</h4>
          <div className="space-y-1 text-sm">
            {provider.config.description && (
              <p className="text-gray-600">{provider.config.description}</p>
            )}
            {provider.config.capabilities && (
              <div>
                <span className="text-gray-600">Capabilities:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.config.capabilities.map((capability: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};