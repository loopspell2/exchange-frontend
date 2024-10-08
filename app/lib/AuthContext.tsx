"use client";
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { myUser } from '../actions/auth';

interface User {
    name: string;
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}

const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const fetchedUser = await myUser();
                if (fetchedUser) {
                    setUser(fetchedUser);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred while fetching user data'));
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    const value = useMemo(() => ({ user, isLoading, error }), [user, isLoading, error]);

    return (
        <AuthContext.Provider value= { value } >
        { children }
        </AuthContext.Provider>
      );
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};