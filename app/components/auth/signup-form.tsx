"use client";

import { useFormState, useFormStatus } from 'react-dom';
import React, { useEffect, useState } from 'react';

import { signup } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export function SignUpForm() {

    const [confirmPassword, setConfirmPassword] = useState('#Kul@0109');
    const [password, setPassword] = useState('#Kul@0109');
    const [email, setEmail] = useState('kulmc01@gmail.com');
    const [name, setName] = useState('kuldeep');
    const [error, setError] = useState('');
    const router = useRouter();

    const [state, action] = useFormState(signup, undefined);
    const { pending } = useFormStatus();

    useEffect(() => {}, [state]);

    if(state?.success) {
        router.push('/explore');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmValue = e.target.value;
        setConfirmPassword(confirmValue);
        setError('');
        console.log('Confirm Password:', confirmValue);
        if (confirmValue !== password) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    }


    return (
        <div className='flex flex-col  items-center justify-center border px-8 py-10 rounded-lg border-zinc-700'>
            <div className='text-2xl font-semibold'>
                Create Account
            </div>
            <form action={() => action({ name, email, password })}>
                <div className='h-12 w-80 mt-4'>
                    <input
                        className='w-full h-full bg-inherit border border-zinc-700 rounded-xl px-3 m-1'
                        placeholder='Full Name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {state?.errors?.name && <div className='text-red-500'>{state.errors.name}</div>}
                </div>
                <div className='h-12 w-80'>
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
                    {state?.errors?.email && <div className='text-red-500'>{state.errors.email}</div>}
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
                    {state?.errors?.password && <div className='text-red-500'>{state.errors.password}</div>}
                </div>
                <div className='h-12 w-80'>
                    <input
                        name='confirmPassword'
                        className='w-full h-full bg-inherit border border-zinc-700 rounded-xl px-3 m-1'
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {error && <div className='text-red-500'>{error}</div>}
                </div>
                <div className='h-12 w-80'>
                    <button
                        className='w-full h-full bg-slate-200 text-zinc-900 border border-zinc-700 rounded-xl px-3 m-1'
                        type="submit"
                        disabled={pending}
                    >
                        Sign Up
                    </button>
                </div>
                <div className='min-h-6 w-80 mt-1 p-1 text-xs'>
                    {state?.message && <div className='text-red-500'>{state.message}</div>}
                </div>
            </form>
        </div>
    );
}