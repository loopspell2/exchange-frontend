import { SigninForm } from "@/app/components/auth/signin-from";


export default function SigninPage() {
    return (<>
        <div className="flex items-center justify-center h-[70vh]">
            <div className="">
                <SigninForm />
            </div>
        </div>
    </>);
}