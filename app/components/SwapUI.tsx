"use client";

import { useState } from "react";

enum Side {
    Buy = 'buy',
    Sell = 'sell'
}

enum Type {
    Limit = 'limit',
    Market = 'market'
}

enum Kind {
    PostOnly = 'post only',
    Ioc = 'ioc'
}

export function SwapUI({ market }: { market: string }) {

    const [quantity, setQuantity] = useState<number | null>(0);
    const [price, setPrice] = useState<number>(158.2);
    const [side, setSide] = useState<Side>(Side.Sell);
    const [type, setType] = useState<Type>(Type.Market);
    const [kind, setKind] = useState<Kind | null>(null);
    const [orederValue, setOrderValue] = useState<number>(0);
    const [balance, setBalance] = useState<string>("0.00");

    const handleSide = (side: Side) => {
        setSide(side);
    }

    const handleType = (type: Type) => {
        setType(type)
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as Kind;
        if (event.target.checked) {
            setKind(value);
        } else {
            setKind(null); // Uncheck will reset the state
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            const value = parseInt(event.target.value, 10);
            setQuantity(value);
            setOrderValue(value * price);
        } else {
            setQuantity(null);
        }
    }

    return (<>
        {/* 00c27829 00c27852 00c278b3 */}
        {/* e44b441a  e44b4436 fd4b4eb3 */}
        <div>
            <div className="flex h-[60px] items-center border-b border-zinc-800">
                <div
                    className={`text-sm flex items-center justify-center cursor-pointer text-[#32a852] h-full basis-1/2 ${side === "buy" ? "bg-[#00c27829] border-b border-[#32a852]" : ""}`}
                    onClick={() => handleSide(Side.Buy)}
                >
                    Buy
                </div>
                <div
                    className={`text-sm flex items-center justify-center cursor-pointer text-[#fd4b4eb3] h-full basis-1/2 ${side === "sell" ? "bg-[#e44b4436] border-b border-[#fd4b4eb3]" : ""}`}
                    onClick={() => handleSide(Side.Sell)}
                >
                    Sell
                </div>
            </div>

            <div className="m-2 flex flex-col">

                <div className="flex mb-2">
                    <div className={`mr-4 cursor-pointer ${type === "limit" ? "text-white border-b-2 border-blue-400 " : "text-zinc-400"}`}
                        onClick={() => handleType(Type.Limit)}
                    >
                        limit
                    </div>
                    <div className={`mr-4 cursor-pointer ${type === "market" ? "text-white border-b-2 border-blue-400 " : "text-zinc-400"}`}
                        onClick={() => handleType(Type.Market)}
                    >
                        market
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between my-2">
                        <div className="text-sm text-gray-400 font-normal">
                            Available Balance
                        </div>
                        <div className="text-sm font-normal">
                            {balance} USDC
                        </div>
                    </div>

                    {type === Type.Limit && (
                    <div className="flex flex-col my-1">
                        <div className="text-sm text-gray-400 font-normal">Price</div>
                        <div className="flex items-center justify-end font-bold border border-zinc-700 rounded-lg p-2 my-2">
                            {price}
                        </div>
                    </div>
                    )}

                    <div className="flex flex-col my-1">
                        <div className="text-sm text-gray-400 font-normal">Quantity</div>
                        <div className="flex items-center justify-end font-normal border border-zinc-700 rounded-lg p-3 my-2">
                            <input
                                type="number"
                                id="quantity"
                                className="bg-transparent text-end decoration-none w-full text-white outline-none appearance-none decoration-none"
                                value={quantity ?? ''}
                                onChange={handleQuantityChange}
                            />
                            <style jsx>{`
                                /* Custom CSS for removing the spinner arrows in number inputs */
                                #quantity::-webkit-outer-spin-button,
                                #quantity::-webkit-inner-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                }

                                #quantity[type='number'] {
                                    -moz-appearance: textfield; /* Removes spinner in Firefox */
                                }
                            `}</style>
                        </div>
                    </div>

                    <div className="flex flex-col my-1">
                        <div className="text-sm text-gray-400 font-normal">Order Value</div>
                        <div className="flex items-center justify-end font-bold border border-zinc-700 rounded-lg p-3 my-2">
                            {orederValue}
                        </div>
                    </div>

                    <div className="cursor-pointer flex items-center  justify-center text-black bg-white font-bold border border-zinc-700 rounded-lg p-3 my-2">
                        Sign up to Trade
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="post-only"
                            value={Kind.PostOnly}
                            checked={kind === Kind.PostOnly}
                            onChange={handleCheckboxChange}
                            className="mx-1 "
                        />
                        <label htmlFor="post-only" className="mx-1 text-gray-400">Post Only</label>

                        <input
                            type="checkbox"
                            id="ioc"
                            value={Kind.Ioc}
                            checked={kind === Kind.Ioc}
                            onChange={handleCheckboxChange}
                            className="mx-1"
                        />
                        <label htmlFor="ioc" className="mx-1 text-gray-400">Ioc</label>
                    </div>



                </div>

            </div>
        </div>
    </>)
}




/*

"use client";
import Image from "next/image";
import { useState } from "react";

export function SwapUI({ market }: { market: string }) {
    const [amount, setAmount] = useState('');
    const [activeTab, setActiveTab] = useState('buy');
    const [type, setType] = useState('limit');

    return <div>
        <div className="flex flex-col">
            <div className="flex flex-row border border-b border-zinc-800 h-[60px]">
                <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
                <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="px-3">
                    <div className="flex flex-row flex-0 gap-5 undefined">
                        <LimitButton type={type} setType={setType} />
                        <MarketButton type={type} setType={setType} />
                    </div>
                </div>
                <div className="flex flex-col px-3">
                    <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between flex-row">
                                <p className="text-xs font-normal text-baseTextMedEmphasis">Available Balance</p>
                                <p className="font-medium text-xs text-baseTextHighEmphasis">36.94 USDC</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-normal text-baseTextMedEmphasis">
                                Price
                            </p>
                            <div className="flex flex-col relative">
                                <input step="0.01" placeholder="0" className="h-12 rounded-lg border-2 border-solid border-baseBorderLight bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value="134.38" />
                                <div className="flex flex-row absolute right-1 top-1 p-2">
                                    <div className="relative">
                                        <Image src="/usdc.webp" alt="USDC" width={24} height={24} className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-normal text-baseTextMedEmphasis">
                            Quantity
                        </p>
                        <div className="flex flex-col relative">
                            <input step="0.01" placeholder="0" className="h-12 rounded-lg border-2 border-solid border-baseBorderLight bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <div className="flex flex-row absolute right-1 top-1 p-2">
                                <div className="relative">
                                    <Image src="/sol.webp" alt="SOL" width={24} height={24} className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end flex-row">
                            <p className="font-medium pr-2 text-xs text-baseTextMedEmphasis">≈ 0.00 USDC</p>
                        </div>
                        <div className="flex justify-center flex-row mt-2 gap-3">
                            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                                25%
                            </div>
                            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                                50%
                            </div>
                            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                                75%
                            </div>
                            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
                                Max
                            </div>
                        </div>
                    </div>
                    <button type="button" className="font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base px-4 py-2 my-4 bg-greenPrimaryButtonBackground text-greenPrimaryButtonText active:scale-98" data-rac="">Buy</button>
                    <div className="flex justify-between flex-row mt-1">
                        <div className="flex flex-row gap-2">
                            <div className="flex items-center">
                                <input className="form-checkbox rounded border border-solid border-baseBorderMed bg-base-950 font-light text-transparent shadow-none shadow-transparent outline-none ring-0 ring-transparent checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:ring-0 focus:ring-offset-0 focus:checked:border-baseBorderMed cursor-pointer h-5 w-5" id="postOnly" type="checkbox" data-rac="" />
                                <label className="ml-2 text-xs">Post Only</label>
                            </div>
                            <div className="flex items-center">
                                <input className="form-checkbox rounded border border-solid border-baseBorderMed bg-base-950 font-light text-transparent shadow-none shadow-transparent outline-none ring-0 ring-transparent checked:border-baseBorderMed checked:bg-base-900 checked:hover:border-baseBorderMed focus:bg-base-900 focus:ring-0 focus:ring-offset-0 focus:checked:border-baseBorderMed cursor-pointer h-5 w-5" id="ioc" type="checkbox" data-rac="" />
                                <label className="ml-2 text-xs">IOC</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function LimitButton({ type, setType }: { type: string, setType: React.Dispatch<React.SetStateAction<string>> }) {
    return <div className="flex flex-col cursor-pointer justify-center py-2" onClick={() => setType('limit')}>
        <div className={`text-sm font-medium py-1 border-b-2 ${type === 'limit' ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}>
            Limit
        </div>
    </div>
}

function MarketButton({ type, setType }: { type: string, setType: React.Dispatch<React.SetStateAction<string>> }) {
    return <div className="flex flex-col cursor-pointer justify-center py-2" onClick={() => setType('market')}>
        <div className={`text-sm font-medium py-1 border-b-2 ${type === 'market' ? "border-accentBlue text-baseTextHighEmphasis" : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"} `}>
            Market
        </div>
    </div>
}

function BuyButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) {
    return <div className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'buy' ? 'border-b-greenBorder bg-greenBackgroundTransparent' : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'}`} onClick={() => setActiveTab('buy')}>
        <p className="text-center text-sm font-semibold text-greenText">
            Buy
        </p>
    </div>
}

function SellButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: React.Dispatch<React.SetStateAction<string>> }) {
    return <div className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'sell' ? 'border-b-redBorder bg-redBackgroundTransparent' : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'}`} onClick={() => setActiveTab('sell')}>
        <p className="text-center text-sm font-semibold text-redText">
            Sell
        </p>
    </div>
}

*/