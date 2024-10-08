"use client";
import { Depth } from "@/app/components/depth/Depth";
import { MarketBar } from "@/app/components/Marketbar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/TradeView";
import { useParams } from "next/navigation";


export default function Page() {

  const { market } = useParams();

  return (
    <div className="flex w-full">

      <div className="w-4/5">
        <div>
          <MarketBar market={market as string} />
        </div>
        <div className="flex">
          <div className="w-3/4 border border-zinc-800">
            <TradeView market={market as string} />
          </div>
          <div className="m-2 w-1/4">
            <Depth market={market as string} />
          </div>
        </div>
      </div>

      <div className="w-1/5 border border-zinc-800">
        <SwapUI market={market as string}/>
      </div>

    </div>
  );
}