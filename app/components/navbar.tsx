"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { logout } from "../actions/auth";

export function Navbar() {

    const [isAuth, setIsAuth] = useState(false);

    const { user, isLoading, error } = useAuth();

    useEffect(() => {
        if (user) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [user]);

    const handleLogout = () => {
        setIsAuth(false);
        logout();
    }

    return (
        <>
            <div className="sticky top-0 z-20 h-[56px] w-full bg-[#0e0f14]">
                <div>
                    <div className="relative flex h-14 w-full flex-col justify-center pl-5 pr-4">
                        <div className="flex flex-row justify-between">
                            <div className="flex items-center flex-row">
                                <div className="mx-4 flex flex-row items-center justify-center">
                                    <a className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:outline-none hover:opacity-90 disabled:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-[#f4f4f6]" href="/">
                                        Home
                                    </a>
                                </div>
                                <div className="mx-4 flex flex-row items-center justify-center">
                                    <a className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:outline-none hover:opacity-90 disabled:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-[#f4f4f6]" href="/explore">
                                        Explore
                                    </a>
                                </div>
                                <div className="mx-4 flex flex-row items-center justify-center">
                                    <a className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:outline-none hover:opacity-90 disabled:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-[#f4f4f6]" href="/trade/SOL_USDC">
                                        Trade
                                    </a>
                                </div>
                                <div className="mx-4 flex flex-row items-center justify-center">
                                    <a className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:outline-none hover:opacity-90 disabled:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-[#f4f4f6]" href="/">
                                        More
                                    </a>
                                </div>
                            </div>
                            {!isLoading && (
                                <div>
                                    {isAuth ? (<div className="flex flex-row">
                                        <div
                                            className="my-auto ml-10 whitespace-nowrap rounded-lg cursor-pointer px-3 py-1.5 text-sm font-semibold text-[#32a852] bg-[#00c27829]  hover:opacity-90"
                                            onClick={handleLogout}
                                        >
                                            log out
                                        </div>
                                    </div>) : (
                                        <div className="flex flex-row">
                                            <a className="my-auto ml-10 whitespace-nowrap rounded-lg  px-3 py-1.5 text-sm font-semibold text-[#32a852] bg-[#00c27829]  hover:opacity-90" href="/signup">
                                                Sign up
                                            </a>
                                            <a className="my-auto ml-6 whitespace-nowrap rounded-lg bg-accentBlue/[16%] px-3 py-1.5 text-sm font-semibold text-#4a94ff bg-[#4a94ff29] hover:opacity-90" href="/signin">
                                                Sign in
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
