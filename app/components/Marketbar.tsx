import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { useRouter } from "next/navigation";
import { SignalingManager } from "../utils/SignalingManager";

export const MarketBar = ({ market }: { market: string }) => {

    const [ticker, setTicker] = useState<Ticker | null>(null);
    const router = useRouter();

    function onclick() {
        router.push("/explore");
    }

    useEffect(() => {
        getTicker(market).then(setTicker);

        SignalingManager.getInstance().registerCallback("ticker", (data: Partial<Ticker>) => setTicker((prevTicker) => ({
            firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
            high: data?.high ?? prevTicker?.high ?? '',
            lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
            low: data?.low ?? prevTicker?.low ?? '',
            priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
            priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
            quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
            symbol: data?.symbol ?? prevTicker?.symbol ?? '',
            trades: data?.trades ?? prevTicker?.trades ?? '',
            volume: data?.volume ?? prevTicker?.volume ?? '',
        })), `TICKER-${market}`);
        SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]});
        // SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]}	);

        return () => {
            SignalingManager.getInstance().deRegisterCallback("ticker", `TICKER-${market}`);
            SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`ticker.${market}`] });
        }

    }, [market]);

    return (<>
        <div className="h-[60px] border-t border-b border-zinc-800 flex justify-between items-center">
            <div
                className="flex items-center justify-center mx-4 p-2 rounded-3xl text-white bg-zinc-800 cursor-pointer"
                onClick={onclick}
            >
                {/* <div className="h-6 w-6 p-1 bg-red-800 rounded-xl">
                    $
                </div> */}
                <p className="ml-2 text-sm">
                    {ticker?.symbol && (ticker?.symbol).toUpperCase().replace("_", " / ")}
                </p>
                <ChevronDown className="h-6 w-6 ml-2" />
            </div>
            <div className="flex items-center flex-row mr-4">
                <div className="flex flex-col h-full mx-4">
                    <div className="font-medium tabular-nums text-lg">
                        {
                            ticker?.lastPrice && ticker?.lastPrice >= ticker?.high ?
                                <p className="text-green-400">{ticker?.lastPrice}</p>
                                : <p className="text-red-400">{ticker?.lastPrice}</p>
                        }
                    </div>
                    <p className="font-medium text-baseTextHighEmphasis text-left text-sm tabular-nums">
                        ${ticker?.lastPrice}
                    </p>
                </div>
                <div className="flex flex-col mx-4">
                    <p className="font-medium text-xs leading-3 text-zinc-400">24H Change</p>
                    <div className="mt-1 text-sm font-medium tabular-nums leading-5 text-green-400">
                        {ticker?.priceChange && +ticker?.priceChange >= 0 ?
                            <p className="text-green-400">+{ticker?.priceChange}</p>
                            : <p className="text-red-400">{ticker?.priceChange}</p>}
                        {ticker?.priceChangePercent && +ticker?.priceChangePercent >= 0 ?
                            <p className="text-green-400">+{ticker?.priceChangePercent}%</p>
                            : <p className="text-red-400">{ticker?.priceChangePercent}%</p>}
                    </div>
                </div>
                <div className="flex flex-col mx-4">
                    <p className="font-medium text-xs leading-3 text-zinc-400">24H High</p>
                    <p className="mt-1 text-sm font-medium tabular-nums leading-5">{ticker?.high}</p>
                </div>
                <div className="flex flex-col mx-4">
                    <p className="font-medium text-xs leading-3 text-zinc-400">24H Low</p>
                    <p className="mt-1 text-sm font-medium tabular-nums leading-5">{ticker?.low}</p>
                </div>
                <div className="flex flex-col mx-4">
                    <p className="font-medium text-xs leading-3 text-zinc-400">24H Volume (USDC)</p>
                    <p className="mt-1 text-sm font-medium tabular-nums leading-5">{ticker?.quoteVolume ? (+ticker.quoteVolume).toFixed(2) : 0}</p>
                </div>
            </div>
        </div>
    </>)
}