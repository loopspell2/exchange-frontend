"use client";

export const BidTable = ({ bids }: { bids: [string, string][] }) => {

    if (!Array.isArray(bids) || bids.length === 0) {
        return <p>No data available</p>;  // Handle empty or invalid asks
    }

    let currentTotal: number = 0;
    const relevantBids = bids.slice(0, 100);
    // relevantBids.reverse();
    const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => {
        currentTotal += Number(quantity);
        return [price, quantity, currentTotal];
    });
    const bidToMap = bidsWithTotal.slice(0, 15);
    // bidToMap.reverse();
    // bidsWithTotal.reverse();
    const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

    return (<>
        <div className="">
            {bidToMap.map(([price, quantity, total]) => <Bid key={price} price={price} quantity={quantity} total={total} maxTotal={maxTotal} />)}
        </div>
    </>)
}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (<>
        <div className="flex flex-1 items-center justify-end relative w-full bg-transparent overflow-hidden my-1 py-1">
            <div
                className="absolute h-full bg-[#00c27829] transition-all duration-300 ease-in-out"
                style={{ width: `${(100 * total) / maxTotal}%` }}
            ></div>
            <div
                className="absolute h-full bg-[#00c27852] transition-all duration-300 ease-in-out"
                style={{ width: `${(100 * (+quantity)) / maxTotal}%` }}
            ></div>
            <div className="flex items-center justify-between text-xs w-full">
                <div className="text-[#00c278b3] ml-1">
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div className="mr-2">
                    {total.toFixed(5)}
                </div>
            </div>
        </div>
    </>)
}