"use client";
import { signin } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';


export function SigninForm() {

    const [password, setPassword] = useState('#Kul@0109');
    const [email, setEmail] = useState('kulmc01@gmail.com');
    // const [error, setError] = useState('');

    const [state, action] = useFormState(signin, undefined);
    const { pending } = useFormStatus();

    useEffect(() => {}, [state]);

    if(state?.success) {
        redirect('/explore');
    }

    return (
        <div className='flex flex-col  items-center justify-center border px-8 py-10 rounded-lg border-zinc-700'>
            <div className='text-2xl font-semibold'>
                Sign In
            </div>
            <form action={() => action({email, password})}>
                <div className='h-12 w-80 mt-4'>
                    <input
                        className='w-full h-full bg-inherit border border-zinc-700 rounded-xl px-3 m-1'
                        placeholder='Email'
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {state?.errors?.email && <div className='text-red-500'>{state.message}</div>}
                </div>
                <div className='h-12 w-80'>
                    <input
                        className='w-full h-full bg-inherit border border-zinc-700 rounded-xl px-3 m-1'
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {state?.errors?.password && <div className='text-red-500'>{state.message}</div>}
                </div>
                <div className='h-12 w-80'>
                    <button
                        className='w-full h-full bg-slate-200 text-zinc-900 border border-zinc-700 rounded-xl px-3 m-1'
                        type="submit"
                        disabled={pending}
                    >
                        Sign In 
                    </button>
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {state?.message && <div className='text-red-500'>{state.message}</div>}
                </div>
            </form>
        </div>
    );
}