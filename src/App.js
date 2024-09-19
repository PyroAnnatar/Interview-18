import React, { useEffect, useState } from "react";
import axios from "axios";

const useBitcoin = () => {
  const [loading, setLoading] = useState(false);
  const [monez, setMonez] = useState(null);
  useEffect(() => {
    async function fetchy() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setMonez(response.data.bpi);
      } catch (error) {
        console.error("Whoopsie", error);
      } finally {
        setLoading(false);
      }
    }
    fetchy();

    const interval = setInterval(fetchy, 60000);
    return () => clearInterval(interval);
  }, []);

  return [monez, loading];
};

function App() {
  const [monez, loading] = useBitcoin();

  return (
    <>
      {monez?.USD ? (
        <div className=" backdrop-blur-[10px]  p-4 min-w-[300px] rounded-md border-[1px] border-black/20 bg-teal-300/50">
          <h2 className="text-xl text-center mb-4 font-bold">
            Bitcoin Exchange Rates
          </h2>
          <p className="flex justify-between">
            <span>{monez?.USD.description}</span>
            <span>${monez?.USD.rate}</span>
          </p>
          <p className="flex justify-between">
            <span>{monez?.EUR.description}</span>
            <span>€{monez?.EUR.rate}</span>
          </p>
          <p className="flex justify-between">
            <span>{monez?.GBP.description}</span>
            <span>£{monez?.GBP.rate}</span>
          </p>
          <p className="text-center text-xs">
            (Updates every minute - relative)
          </p>
          <p className="text-center text-xs">(You should go with DogeCoin)</p>
        </div>
      ) : (
        "Loading.."
      )}
    </>
  );
}

export default App;
