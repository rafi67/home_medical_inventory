"use client";

import { motion } from "framer-motion";
import { Bell, Pill, ShieldCheck } from "lucide-react";
import { Card } from "../../ui/card";

const FeaturesSection = () => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                    icon: <ShieldCheck className="w-6 h-6" />,
                    title: 'Expiry Tracking',
                    desc: 'Get notified before medications expire so you can safely dispose of them and restock.',
                },
                {
                    icon: <Bell className="w-6 h-6" />,
                    title: 'Low Stock Alerts',
                    desc: 'Never run out of essential medications. Set custom thresholds for automatic alerts.',
                },
                {
                    icon: <Pill className="w-6 h-6" />,
                    title: 'Smart Categorization',
                    desc: 'Organize by family member, condition, or type. Find what you need instantly.',
                },
            ].map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        delay: i * 0.1,
                    }}
                >
                    <Card className="h-full p-8 rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {feature.desc}
                        </p>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default FeaturesSection;