"use client"

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTable } from "../../utils/table";
import { useRouter } from "next/navigation";

interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    marketCap: string;
    high24h: string;
    low24h: string;
    priceChange24h: string;
    volume: string;
}

export default function Page() {

    const [data, setData] = useState<Coin[] | null>(null);
    const router = useRouter();

    const handleRowClick = (symbol: string) => {
        router.push(`/trade/${symbol.toUpperCase()}_USDC`)
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTable();
            // console.log(response);
            if (response) {
                setData(response.data); // No need to call response.data
            }
        };
        fetchData();

        setTimeout(() => {
            console.log("data : ",data);
        }, 1000);
    }, []);

    return (<>
        <div>
            <div className="flex flex-col justify-center items-center">
                <SearchBar data={data || []} handleRowClick={handleRowClick} />
            </div>

            <div className="bg-neutral-800 h-0.5 w-full" />

            <div className="mt-6 w-full flex flex-col items-between justify-around px-52">
                <div className="flex items-center justify-between">
                    <div className="text-2xl">
                        Markets
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="cursor-pointer px-3 py-1 font-medium text-[#4c94ffe6] outline-none rounded-lg text-base">
                            Spot
                        </div>
                        <div aria-selected='false' className="cursor-pointer px-3 py-1 font-medium text-[#4c94ffe6] outline-none rounded-lg text-base">
                            Favorites
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-3 mx-10 flex-1 rounded-xl px-52">
                <div className="flex flex-col items-center w-full rounded-lg py-3">
                    <Table data={data || []} handleRowClick={handleRowClick} />
                </div>
            </div>

        </div>

    </>)
};

interface TableProps {
    data: Coin[];
    handleRowClick: (symbol: string) => void;
}

function SearchBar({ data, handleRowClick }: TableProps) {

    const [activeSerach, setActiveSearch] = useState<Coin[] | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === "") {
            setActiveSearch(null);
            return;
        }
        const filteredData = data?.filter((coin) => coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm));
        setActiveSearch(filteredData);
    }

    return (<>
        <div className="h-[30vh] p-2 flex flex-col items-center justify-center">
            <div className=" text-5xl p-2 m-2">
                Explore your trade
            </div>
            <div className="flex bg-sky-800 text-white h-12 w-full rounded-3xl p-3 m-2">
                <Search className="h-6 w-6 mr-4" />
                <input
                    type="search"
                    placeholder="Search your asset"
                    className="bg-transparent w-full outline-none"
                    onChange={handleSearch}
                />
                {activeSerach &&
                    <div className="z-99999 p-2 overflow-y-auto mt-12 -translate-x-9 rounded-xl bg-[#0e0f14] shadow shadow-black absolute max-h-80 w-[465px] scrollbar-none">
                        {activeSerach.map((coin) => (
                            <div
                                key={coin.id}
                                className="flex justify-between items-center p-2 cursor-pointer bg-inherit hover:bg-[#1c1e2c66] rounded-lg w-full outline-none"
                                onClick={() => handleRowClick(coin.symbol)}
                            >
                                <div className="flex items-center justify-center">
                                    <div className="m-0.5">
                                        <Image
                                            src={coin.image}
                                            alt="image"
                                            width={30}
                                            height={30}
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <div className="ml-4 text-sm">
                                        {coin.symbol.toUpperCase()}/USDC
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-xs">
                                        {coin.currentPrice}
                                    </div>
                                    <div className="text-xs">
                                        {+coin.priceChange24h > 0
                                            ? <p className="text-green-400">+{coin.priceChange24h}</p>
                                            : <p className="text-red-400">{coin.priceChange24h}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    </>)
}

function Table({ data, handleRowClick }: TableProps) {
    // console.log(data);
    return (<>
        <table className="w-[73vw] table-auto bg-[#14151b]">
            <thead>
                <tr>
                    <th
                        className="px-2 py-3 text-sm font-normal first:pr-0 first:pl-0 last:pl-0 last:pr-7"
                    >
                        Name
                    </th>
                    <th className="px-2 py-3 text-sm font-normal first:pr-0 first:pl-0 last:pl-0 last:pr-7">
                        <div className="flex items-center gap-1 cursor-pointer select-none justify-end">
                            <span className="w-4"></span>
                            Price
                        </div>
                    </th>
                    <th className="px-2 py-3 text-sm font-normal first:pr-0 first:pl-0 last:pl-0 last:pr-7">
                        <div className="flex items-center gap-1 cursor-pointer select-none justify-end">
                            <span className="w-4"></span>
                            Market Cap
                        </div>
                    </th>
                    <th className="px-2 py-3 text-sm font-normal first:pr-0 first:pl-0 last:pl-0 last:pr-7">
                        <div className="flex items-center gap-1 cursor-pointer select-none justify-end">
                            <span className="w-4"></span>
                            24h Volume
                        </div>
                    </th>
                    <th className="px-2 py-3 text-sm font-normal first:pr-0 first:pl-0 last:pl-0 last:pr-7">
                        <div className="flex items-center gap-1 cursor-pointer select-none justify-end">
                            <span className="w-4"></span>
                            24h Change
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map(((coin) => (
                    <tr
                        key={coin.id}
                        className="cursor-pointer border-t border-neutral-800 hover:bg-[#1c1e2c66]"
                        onClick={() => handleRowClick(coin.symbol)}
                    >

                        <td className="px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                            <div className="flex justify-start">
                                <div className="flex-shrink">
                                    <div className="flex items-center">
                                        <div className="relative flex-none overflow-hidden rounded-full border w-[40px] h-[40px]">
                                            <div className="relative">
                                                <Image src={coin.image} alt="image" width={40} height={40} />
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-col">
                                            <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
                                                {coin.name}
                                            </p>
                                            <div className="flex items-center justify-start flex-row gap-2">
                                                <div className="flex-medium text-left text-xs leading-5 ">
                                                    {coin.symbol.toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                            <div className="flex justify-end">
                                <p className="text-base font-medium tabular-nums">
                                    ${coin.currentPrice}
                                </p>
                            </div>
                        </td>
                        <td className="px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                            <div className="flex justify-end">
                                <div className="text-base font-medium tabular-nums">
                                    {coin.marketCap}
                                </div>
                            </div>
                        </td>
                        <td className="px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                            <div className="flex justify-end">
                                <p className="text-base font-medium tabular-nums">
                                    {coin.volume}
                                </p>
                            </div>
                        </td>
                        <td className="px-2 py-3 first:pl-7 first:pr-0 last:pl-0 last:pr-7">
                            <div className="flex justify-end">
                                <p className="text-base font-medium tabular-nums">
                                    {+coin.priceChange24h > 0
                                        ? <p className="text-green-400">+{coin.priceChange24h}%</p>
                                        : <p className="text-red-400">{coin.priceChange24h}%</p>}
                                </p>
                            </div>
                        </td>

                    </tr>
                )))}
            </tbody>
        </table>
    </>)
}