import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { getCrypto, getAssets } from "../api";
import type { ICoin, IAsset } from "../types";
import { percentDiffernce } from "../utils";
import type { IContextType } from "../types";

const CryptoContex = createContext<IContextType>({  // Объщее кол-во данных 
    assets: [],                                     // Базовые значения
    crypto: [],
    isLoading: false,
})

export const CryptoContexProvider = ({ children }: PropsWithChildren) => {   // Чтобы передовать значения всем дочерним компонентам
      const [crypto, setCrypto] = useState<ICoin[]>([]);
      const [assets, setAssets] = useState<IAsset[]>([]);
      const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        const preload = async () => {
          setIsLoading(true)
          const cryptoData = await getCrypto();
          const userAssets = await getAssets();
    
          setAssets(
            userAssets.map(asset => {
              const coin = cryptoData.find(c => c.id === asset.id);
              if (!coin) {
                return {
                    grow: false,
                    growPercent: 0,
                    totalAmount: 0,
                    totalProfit: 0,
                    ...asset,
                }
              }
              return {
                grow: asset.price < coin?.price,
                growPercent: percentDiffernce(asset.price, coin?.price),
                totalAmount: asset.amount * coin?.price,
                totalProfit: asset.amount * coin?.price - asset.amount * asset.price,
                ...asset,
              }
            })
          );
          setCrypto(cryptoData);
          setIsLoading(false);
        }
        preload()
      }, [])

    return <CryptoContex.Provider value={{isLoading, assets, crypto}}>{children}</CryptoContex.Provider>
}

export default CryptoContex