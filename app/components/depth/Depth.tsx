"use client";

import { getDepth } from "@/app/utils/httpClient";
import { useEffect, useState } from "react";
import { AskTable } from "./AskTable";
import { SignalingManager } from "@/app/utils/SignalingManager";
import { BidTable } from "./BidTable";

export const Depth = ({ market }: { market: string }) => {

    const [bids, setBids] = useState<[string, string][]>();
    const [asks, setAsks] = useState<[string, string][]>();
    const [price, setPrice] = useState<string>();
    // const [toggle, setToggle] = useState<boolean>(false);

    // useEffect(() => {
    //     if (!toggle) {
    //         getDepth(market).then(d => {
    //             setBids(d.bids.reverse());
    //             setAsks(d.asks);
    //         })
    //         setToggle(true);
    //     }
    // })

    useEffect(() => {

        SignalingManager.getInstance().registerCallback("depth", (data: any) => {

            setBids((originalBids) => {
                const bidsAfterUpdate = [...(originalBids || [])];

                for (let i = 0; i < bidsAfterUpdate.length; i++) {
                    for (let j = 0; j < data.bids.length; j++) {
                        if (bidsAfterUpdate[i][0] === data.bids[j][0]) {
                            // bidsAfterUpdate[i][0] = data.bids[j][0];
                            bidsAfterUpdate[i][1] = data.bids[j][1];
                            break;
                        }
                    }
                }

                return bidsAfterUpdate;
            });

            setAsks((originalAsks) => {
                const asksAfterUpdate = [...(originalAsks || [])];

                for (let i = 0; i < asksAfterUpdate.length; i++) {
                    for (let j = 0; j < data.asks.length; j++) {
                        if (asksAfterUpdate[i][0] === data.asks[j][0]) {
                            // asksAfterUpdate[i][0] === data.asks[j][0];
                            asksAfterUpdate[i][1] = data.asks[j][1];
                            break;
                        }
                    }
                }
                return asksAfterUpdate;
            });
        }, `DEPTH-${market}`);

        getDepth(market).then(d => {
            setBids(d.bids.reverse());
            setAsks(d.asks);
        })

        SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`depth@${market}`] });


        return () => {
            SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`depth@${market}`] });
            SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
        }
    }, []);
 
    return (<>
        <div className="w-full">
            <Header market={market} />
            <div className="snap-y snap-proximity w-full max-h-[70vh] overflow-scroll scrollbar-none">
                <div className="grow">
                    <AskTable asks={asks as [string, string][]} />
                </div>
                <div className="snap-center snap-normal text-center">
                    ---------------------------
                </div>
                <div className="grow">
                    <BidTable bids={bids as [string, string][]} />
                </div>
            </div>
        </div>
    </>)
};

function Header({ market }: { market: string }) {
    const baseAsset = market.split("_")[0];
    const quoteAsset = market.split("_")[1];
    return (<>
        <div className="flex items-center justify-between mt-2">
            <div className="text-xs font-bold">Price ({quoteAsset})</div>
            <div className="text-xs text-zinc-400 font-bold mr-4">Size ({baseAsset})</div>
            <div className="text-xs text-zinc-400 font-bold mr-2">Total ({baseAsset})</div>
        </div>
    </>)
}