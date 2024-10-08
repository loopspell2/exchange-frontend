"use server";
import axios from "axios";
import { SignupFormSchema, FormState, SigninFormSchema } from "../lib/definations";
import jwt from 'jsonwebtoken';
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import { cache } from "react";

export interface FormData {
    name: string;
    email: string;
    password: string;
}

export interface SigninData {
    email: string;
    password: string;
}

export async function signup(state: FormState, formData: FormData) {
    try {
        // console.log('Form Data:', formData);
        const validatedFields = SignupFormSchema.safeParse({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const token = jwt.sign(validatedFields, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        
        const response = await axios.post('http://localhost:5000/api/v1/auth/signup',
            {
                name: "",
                email: "",
                password: "",
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

        // console.log('Response:', response.data);
        await createSession(response.data);

        return {success: 'Account created successfully'};

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // console.log('Error:', err.response?.data);
            return {
                message: err.response?.data.message,
            }
        } else {
            console.log('Error:', err);
            return {
                message: 'An error occurred',
            }
        }
    }
}

export async function signin(state: FormState, formData: SigninData) {
    try {
        // console.log('Form Data:', formData);
        const validatedFields = SigninFormSchema.safeParse({
            email: formData.email,
            password: formData.password,
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const token = jwt.sign(validatedFields, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        // console.log('Token:', token);
        

        const response = await axios.post('http://localhost:5000/api/v1/auth/signin',
            {
                email: "",
                password: "",
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

        // console.log('Response:', response.data);
        await createSession(response.data);

        return {success: 'Account created successfully'};

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            // console.log('Error:', err.response?.data);
            return {
                message: err.response?.data.message,
            }
        } else {
            console.log('Error:', err);
            return {
                message: 'An error occurred',
            }
        }
    }
}

export async function logout(){
    deleteSession();
    redirect('/');
}

export const myUser = cache(async() => {
    const session = await verifySession();
    if (!session) {
        return null;
    }
    
    if (session.isAuth) {
        return session;
    }

    return null;
})