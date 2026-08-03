"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth/loginUser";
import { motion } from "framer-motion";
import { Pill } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";


const LoginPage = () => {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    useEffect(() => {
        if (state && !state.success && state.message) {
            const errorMessage = process.env.NODE_ENV === "development" ? state.message : "Failed to login";
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
                        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={formAction} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email"
                                >Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-teal-600 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input id="password" placeholder="password" name="password" type="password" required />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700"
                                disabled={isPending}
                            >
                                {
                                    isPending ?
                                        'Signing....'
                                        :
                                        'Sign In'
                                }
                            </Button>
                            <Toaster />
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="text-sm text-center text-slate-500">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-teal-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};

export default LoginPage;