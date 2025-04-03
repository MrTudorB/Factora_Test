'use client';

import { useEffect, useState } from 'react';

interface MarketSentiment {
  grade: number;
  label: string;
  last_signal: number;
  date: string;
}

interface ApiResponse {
  status: string;
  market_sentiment: MarketSentiment;
}

export default function MarketSentimentCard() {
  const [data, setData] = useState<MarketSentiment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketSentiment = async () => {
      try {
        const response = await fetch('https://bucharest-hackathon.onrender.com/api/tokens/market-sentiment');
        if (!response.ok) {
          throw new Error('Failed to fetch market sentiment');
        }
        const result: ApiResponse = await response.json();
        setData(result.market_sentiment);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketSentiment();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchMarketSentiment, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      case 'neutral':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Sentiment</h3>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Sentiment</h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-500">Current Sentiment</div>
          <div className={`text-2xl font-bold ${getSentimentColor(data.label)}`}>
            {data.label.charAt(0).toUpperCase() + data.label.slice(1)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Sentiment Score</div>
          <div className="text-2xl font-bold text-gray-900">{data.grade.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Last Signal</div>
          <div className="text-2xl font-bold text-gray-900">{data.last_signal}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="text-sm text-gray-900">
            {new Date(data.date).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
} 