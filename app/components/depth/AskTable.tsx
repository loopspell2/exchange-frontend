"use client";

export const AskTable = ({ asks }: { asks: [string, string][] }) => {

    if (!Array.isArray(asks) || asks.length === 0) {
        return <p>No data available</p>;  // Handle empty or invalid asks
    }

    let currentTotal: number = 0;
    const relevantAsks = asks.slice(0, 100);
    // relevantAsks.reverse();
    const asksWithTotal: [string, string, number][] = relevantAsks.map(([price, quantity]) => {
        currentTotal += Number(quantity);
        return [price, quantity, currentTotal];
    });
    const askToMap = asksWithTotal.slice(0, 15);
    askToMap.reverse();
    // asksWithTotal.reverse();
    const maxTotal = relevantAsks.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

    return (<>
        <div>
            {askToMap.map(([price, quantity, total]) => <Ask key={price} price={price} quantity={quantity} total={total} maxTotal={maxTotal} />)}
        </div>
    </>)
}

function Ask({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (<>
        <div className="flex flex-1 items-center justify-end relative w-full bg-transparent overflow-hidden my-1 py-1">
            <div
                className="absolute h-full bg-[#e44b441a] transition-all duration-300 ease-in-out"
                style={{ width: `${(100 * total) / maxTotal}%` }}
            ></div>
            <div
                className="absolute h-full bg-[#e44b4436] transition-all duration-300 ease-in-out"
                style={{ width: `${(100 * (+quantity)) / maxTotal}%` }}
            ></div>
            <div className="flex items-center justify-between text-xs w-full">
                <div className="text-[#fd4b4eb3] ml-1">
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