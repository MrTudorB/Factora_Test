'use client';

interface FactoringQuoteProps {
  latestInvoice?: {
    amount: number;
    id: string;
  };
  onAcceptQuote: () => void;
}

export default function FactoringQuote({ latestInvoice, onAcceptQuote }: FactoringQuoteProps) {
  const advanceRate = 0.70; // 70%
  const fee = 0.03; // 3%

  const handleAcceptClick = () => {
    console.log('Quote accepted for invoice:', latestInvoice?.id);
    onAcceptQuote();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow px-5 py-6 sm:px-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Available Factoring Quote</h3>
          {latestInvoice ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                For invoice {latestInvoice.id}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Advance Amount:</span>{' '}
                  ${(latestInvoice.amount * advanceRate).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Fee:</span>{' '}
                  ${(latestInvoice.amount * fee).toFixed(2)} ({(fee * 100)}%)
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Net Advance:</span>{' '}
                  ${(latestInvoice.amount * advanceRate - latestInvoice.amount * fee).toFixed(2)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Create an invoice to receive a factoring quote.
            </p>
          )}
        </div>
        {latestInvoice && (
          <button
            onClick={handleAcceptClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Accept Quote
          </button>
        )}
      </div>
    </div>
  );
} 