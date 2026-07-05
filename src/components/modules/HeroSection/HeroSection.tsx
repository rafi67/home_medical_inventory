"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Activity, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "../../ui/card";

const HeroSection = () => {
    return (
         <section className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
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
              duration: 0.5,
            }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Your personal health companion
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6">
              Never lose track of your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
                medications
              </span>{' '}
              again.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A smart, simple, and secure way to manage your home pharmacy.
              Track expiry dates, monitor stock levels, and organize your
              family's health essentials in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 rounded-full text-base h-12 px-8 shadow-lg shadow-teal-600/25"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full text-base h-12 px-8"
              >
                View Demo
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" /> Free forever
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" /> No credit
                card
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-500" /> Secure data
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-emerald-50 rounded-[2.5rem] transform rotate-3 scale-105 -z-10"></div>
            <Card className="p-6 rounded-[2rem] shadow-2xl shadow-slate-200/50 border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Inventory Overview
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time status
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: 'Ibuprofen',
                    status: 'In Stock',
                    color: 'bg-emerald-500',
                    qty: '45 pills',
                  },
                  {
                    name: 'Amoxicillin',
                    status: 'Low Stock',
                    color: 'bg-amber-500',
                    qty: '4 pills',
                  },
                  {
                    name: 'Vitamin C',
                    status: 'Expired',
                    color: 'bg-red-500',
                    qty: '120 pills',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${item.color}`}
                      ></div>
                      <span className="font-medium text-foreground">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {item.qty}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
};

export default HeroSection;