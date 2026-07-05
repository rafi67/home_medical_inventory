import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";
import Link from "next/link";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-teal-100 selection:text-teal-900">
            <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-40 border-b">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal-600">
                        <Pill className="w-6 h-6" />
                        <span className="font-bold text-xl tracking-tight text-foreground">
                            MediVault
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-teal-600 hover:bg-teal-700 rounded-full shadow-sm shadow-teal-600/20">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
};

export default CommonLayout;