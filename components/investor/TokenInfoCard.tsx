'use client';

import { useState } from 'react';

interface Category {
  category_id: string | number;
  category_name: string;
  category_slug: string;
}

interface Exchange {
  exchange_id: string;
  exchange_name: string;
}

interface TokenInfo {
  id: number;
  name: string;
  symbol: string;
  exchange_list: Exchange[];
  category_list: Category[];
  contract_address: string | null;
  tm_link: string | null;
}

interface ApiResponse {
  status: string;
  token_info?: {
    id: number;
    name: string;
    symbol: string;
    exchange_list: Exchange[] | null;
    category_list: Category[];
    contract_address: string | null;
    tm_link: string | null;
  };
  message?: string;
}

export default function TokenInfoCard() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformTokenInfo = (info: ApiResponse['token_info']): TokenInfo => {
    if (!info) throw new Error('Invalid token info');
    console.log('Raw API response info:', info);
    const transformed = {
      id: info.id,
      name: info.name,
      symbol: info.symbol,
      exchange_list: Array.isArray(info.exchange_list) ? info.exchange_list : [],
      category_list: Array.isArray(info.category_list) ? info.category_list : [],
      contract_address: info.contract_address,
      tm_link: info.tm_link
    };
    console.log('Transformed data:', transformed);
    return transformed;
  };

  const fetchTokenInfo = async () => {
    if (!symbol.trim()) {
      setError('Please enter a token symbol');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://bucharest-hackathon.onrender.com/api/tokens/info?symbol=${encodeURIComponent(symbol.trim().toUpperCase())}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      console.log('API Response:', result);

      if (result.status === 'error') {
        setError(result.message || 'Failed to fetch token information');
        setData(null);
      } else if (result.token_info) {
        try {
          const transformedData = transformTokenInfo(result.token_info);
          console.log('Setting data:', transformedData);
          setData(transformedData);
          setError(null);
        } catch (err) {
          console.error('Transform error:', err);
          setError('Invalid token data received from server');
          setData(null);
        }
      } else {
        setError('No token information received');
        setData(null);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching token information');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTokenInfo();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchTokenInfo();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Information</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter token symbol (e.g., BTC)"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Token Name</div>
            <div className="text-lg font-medium text-gray-900">{data.name || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Symbol</div>
            <div className="text-lg font-medium text-gray-900">{data.symbol || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Contract Address</div>
            <div className="text-sm font-mono text-gray-900 break-all">{data.contract_address || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Exchanges</div>
            <div className="flex flex-wrap gap-2">
              {data.exchange_list && data.exchange_list.length > 0 ? (
                data.exchange_list.map((exchange, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                  >
                    {exchange.exchange_name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No exchanges listed</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Categories</div>
            <div className="flex flex-wrap gap-2">
              {data.category_list && data.category_list.length > 0 ? (
                data.category_list.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {category.category_name}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No categories listed</span>
              )}
            </div>
          </div>
          {data.tm_link && data.tm_link !== 'https://app.tokenmetrics.com/undefined' && (
            <div>
              <div className="text-sm text-gray-500">Trading View Link</div>
              <a
                href={data.tm_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                View on Trading View
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 