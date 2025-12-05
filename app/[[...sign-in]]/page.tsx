'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage(){
    const {isLoaded, isSignedIn, user} = useUser();

    const router = useRouter();
    useEffect(() => {
        const role = user?.publicMetadata.role;
        if(role){
            router.push(`/${role}`);
        }
    }, [user, router])
    return(
        <div className="h-screen flex items-center justify-center from-sky-100 via-white to-sky-200">
            <SignIn.Root>
                <SignIn.Step name='start' className="bg-white/90 backdrop-blur-md rounded-2xl p-10 md:p-12 shadow-2xl flex flex-col gap-6 w-[90%] max-w-md border border-gray-100 ">
                    <h1 className="mt-2 text-3xl font-semibold text-sky-600 text-center tracking-tight">School</h1>
                    <h2 className='text-gray-500 text-sm text-center mb-2'>Sign In To Your Account</h2>
                    <Clerk.GlobalError className="text-sm text-red-500 text-center mt-1"/>
                    <Clerk.Field name="identifier" className='flex flex-col gap-1 mt-2'>
                        <Clerk.Label className='text-sm font-medium text-gray-700'>UserName</Clerk.Label>
                        <Clerk.Input type='text' required className='p-2.5 rounded-lg border border-gray-300 focus:outline-none  focus:border-transparent '/>
                        <Clerk.FieldError className='text-xs text-red-500 mt-0.5'/>
                    </Clerk.Field>
                    <Clerk.Field name="password" className='flex flex-col gap-1 mt-2'>
                        <Clerk.Label className='text-sm font-medium text-gray-700'>Password</Clerk.Label>
                        <Clerk.Input type='password' required className='p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent '/>
                        <Clerk.FieldError className='text-xs text-red-500 mt-0.5'/>
                    </Clerk.Field>
                    <SignIn.Action submit className='mt-4 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg text-sm py-2.5 cursor-pointer'>Sign In</SignIn.Action>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    );
};