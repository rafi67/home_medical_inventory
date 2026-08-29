"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/auth/registerUser";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const RegisterPage = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            const errorMessage = process.env.NODE_ENV === "development" ? state.message : "Failed to register";
            toast.error(errorMessage);
        }
    }, [state]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.4,
                }}
                className="w-full max-w-md"
            >
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2 text-teal-600">
                        <Pill className="w-8 h-8" />
                        <span className="font-bold text-2xl tracking-tight text-slate-900">
                            MediVault
                        </span>
                    </Link>
                </div>

                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">
                            Create an account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Enter your details below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name"
                                    name="name" placeholder="John Doe" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" placeholder="Password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" placeholder="Confirm Password" name="confirmPassword" type="password" required />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700"
                                disabled={isPending}
                            >
                                {
                                    isPending ?
                                    'Signing Up...'
                                    :
                                    'Sign Up'
                                }
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-slate-500">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-teal-600 hover:underline"
                            >
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default RegisterPage;