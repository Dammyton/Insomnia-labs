import MiniCard from "@/components/MiniCard";
import { useState, useEffect } from "react";

const BitcoinPriceIndex = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [priceData, setPriceData] = useState<Record<string, any>>({});
  const [refreshInterval, setRefreshInterval] = useState<number>(5000); // Default refresh interval: 5 seconds
  const [displayCurrencies, setDisplayCurrencies] = useState<
    Record<string, boolean>
  >({
    USD: true,
    GBP: true,
    EUR: true,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const data = await response.json();
        setPriceData(data.bpi);
      } catch (error) {
        console.log("Error fetching price data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, refreshInterval);

    return (): void => clearInterval(interval);
  }, [refreshInterval]);

  const handleRefreshIntervalChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRefreshInterval(parseInt(event.target.value));
  };

  const handleCurrencyToggle = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const currency = event.target.name;
    setDisplayCurrencies((prevCurrencies) => ({
      ...prevCurrencies,
      [currency]: !prevCurrencies[currency],
    }));
  };

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-2xl font-bold lg:mt-12 mt-6 mb-8">Bitcoin Price Index</h1>
      <div className="flex flex-wrap space-y-3 items-center justify-between lg:mb-5 mb-3">
        <div>
          Refresh Interval:{" "}
          <select
            value={refreshInterval}
            onChange={handleRefreshIntervalChange}
            className="border border-gray-300 focus-within:outline-0 rounded px-2 py-1"
          >
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={15000}>15 seconds</option>
          </select>
        </div>
        <div className="flex gap-4">
          {["USD", "GBP", "EUR"].map((currency) => (
            <label key={currency}>
              <input
                type="checkbox"
                name={currency}
                checked={displayCurrencies[currency]}
                onChange={handleCurrencyToggle}
                className="mr-2 accent-[#000]"
              />
              {currency}
            </label>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-12 gap-2">
        {displayCurrencies?.USD && (
          <MiniCard
            title="USD"
            total={priceData?.USD?.rate}
            isLoading={isLoading}
          />
        )}

        {displayCurrencies?.GBP && (
          <MiniCard
            title="GBP"
            total={priceData?.GBP?.rate}
            isLoading={isLoading}
          />
        )}

        {displayCurrencies?.EUR && (
          <MiniCard
            title="EUR"
            total={priceData?.EUR?.rate}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default BitcoinPriceIndex;
