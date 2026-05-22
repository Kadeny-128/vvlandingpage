"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const DISPLAY = {
  fontFamily: "var(--font-cormorant), Georgia, 'Times New Roman', serif",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const services = [
  {
    title: "ChatGPT Ads Setup",
    body: "We configure and launch your business on ChatGPT's native advertising platform. From account setup to creative strategy, we handle everything — so you capture the fastest-growing search audience on the internet.",
  },
  {
    title: "Geo-Targeted Campaigns",
    body: "Precision campaigns that reach the right people in the right places. Whether you're targeting a single neighborhood or a national market, we engineer campaigns that convert location intent into paying customers.",
  },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden">
        <div className="hero-gradient" />
        <div className="grain-overlay" />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.13 } },
            }}
          >
<motion.h1
              variants={heroItem}
              className="text-white leading-[0.88] mb-10 select-none"
              style={{
                ...DISPLAY,
                fontSize: "clamp(5rem, 13.5vw, 15rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Victory
              <br />
              Velocity
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-white/70 leading-relaxed max-w-[420px]"
              style={{ ...DISPLAY, fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
            >
              We set up ChatGPT ads for your business.
              <br />
              We also do geo-targeted campaigns.
            </motion.p>

            <motion.div variants={heroItem} className="mt-14">
              <a href="#contact">
                <Button
                  className="rounded-none border border-white/25 bg-transparent text-white
                             hover:bg-white hover:text-black hover:border-white
                             text-[11px] tracking-[0.28em] uppercase px-9 py-5 h-auto
                             transition-all duration-300"
                >
                  Work with us
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* ── SERVICES ── */}
      <section className="bg-white py-28 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
<div className="grid md:grid-cols-2 gap-[1px] bg-black/10">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.14,
                  ease: EASE,
                }}
                className="group"
              >
                <Card className="border-0 rounded-none shadow-none bg-white group-hover:bg-black transition-colors duration-500 h-full py-0 gap-0">
                  <CardContent className="p-12 lg:p-16 flex flex-col gap-7 h-full">
                    <h3
                      className="text-black group-hover:text-white leading-[0.9] tracking-tight transition-colors duration-500"
                      style={{
                        ...DISPLAY,
                        fontSize: "clamp(2.25rem, 3.5vw, 3.75rem)",
                        fontWeight: 300,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-black/55 group-hover:text-white/55 leading-relaxed flex-1 transition-colors duration-500"
                      style={{ ...DISPLAY, fontWeight: 300, fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)" }}>
                      {s.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-black py-28 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20">
          <div className="max-w-2xl">
<motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: EASE,
              }}
              className="text-white leading-[0.9] mb-16"
              style={{
                ...DISPLAY,
                fontSize: "clamp(4rem, 7vw, 8.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
              }}
            >
              Work with us.
            </motion.h2>

            <motion.form
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <Label className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-normal">
                    Name
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    placeholder="Your name"
                    className="border-0 border-b border-white/20 rounded-none bg-transparent
                               text-white placeholder:text-white/40 px-0 h-12 shadow-none
                               focus-visible:ring-0 focus-visible:ring-offset-0
                               focus-visible:border-white/60 transition-colors duration-200"
                    style={{ ...DISPLAY, fontWeight: 300, fontSize: "1.1rem" }}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-normal">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    placeholder="your@email.com"
                    className="border-0 border-b border-white/20 rounded-none bg-transparent
                               text-white placeholder:text-white/40 px-0 h-12 shadow-none
                               focus-visible:ring-0 focus-visible:ring-offset-0
                               focus-visible:border-white/60 transition-colors duration-200"
                    style={{ ...DISPLAY, fontWeight: 300, fontSize: "1.1rem" }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] tracking-[0.3em] uppercase text-white/55 font-normal">
                  Message
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  rows={4}
                  placeholder="Tell us about your business and goals."
                  className="border-0 border-b border-white/20 rounded-none bg-transparent
                             text-white placeholder:text-white/40 px-0 shadow-none min-h-[5rem]
                             focus-visible:ring-0 focus-visible:ring-offset-0
                             focus-visible:border-white/60 resize-none transition-colors duration-200"
                  style={{ ...DISPLAY, fontWeight: 300, fontSize: "1.1rem" }}
                />
              </div>

              <Button
                type="submit"
                disabled={status !== "idle"}
                className="rounded-none border border-white/25 bg-transparent text-white
                           hover:bg-white hover:text-black hover:border-white
                           text-[11px] tracking-[0.28em] uppercase px-9 py-5 h-auto
                           transition-all duration-300 disabled:opacity-40"
                style={{ ...DISPLAY, fontWeight: 400, fontSize: "0.85rem" }}
              >
                {status === "idle"
                  ? "Send Message"
                  : status === "sending"
                  ? "Sending…"
                  : "Message Sent"}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/10 py-8 px-8 lg:px-20">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <span className="text-[10px] tracking-[0.28em] uppercase text-white/45" style={{ ...DISPLAY, fontWeight: 400 }}>
            Victory Velocity
          </span>
          <span className="text-[10px] text-white/35" style={{ ...DISPLAY, fontWeight: 400 }}>© 2026</span>
        </div>
      </footer>
    </main>
  );
}
