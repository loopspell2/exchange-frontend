import { SignUpForm } from "@/app/components/auth/signup-form";


export default function SignupPage() {
    return (<>
        <div className="flex items-center justify-center h-[70vh]">
            <div className=""> 
                <SignUpForm />
            </div>
        </div>
    </>);
}