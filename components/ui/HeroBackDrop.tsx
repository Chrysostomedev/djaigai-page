"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const slides = [
    { src: "/img/landing-1.jpg" },
    { src: "/img/landing-2.jpg" },
];

const DURATION = 6500; // ms par image
const EASE = [0.76, 0, 0.24, 1] as const;

export function HeroBackdrop() {
    const [index, setIndex] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        const t = setTimeout(
            () => setIndex((i) => (i + 1) % slides.length),
            DURATION
        );
        return () => clearTimeout(t);
    }, [index]);

    const slide = slides[index];
    const panX = index % 2 === 0 ? -24 : 24;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <AnimatePresence>
                <motion.div
                    key={slide.src}
                    className="absolute inset-0"
                    // Rideau qui balaie l'écran de droite à gauche
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
                    // L'ancienne image reste sous le rideau, puis disparaît
                    exit={{ opacity: 0, transition: { duration: 0.1, delay: 1.3 } }}
                    transition={{ duration: 1.3, ease: EASE }}
                >
                    {/* Ken Burns : zoom arrière lent + dérive latérale */}
                    <motion.div
                        className="absolute inset-0"
                        initial={reduce ? false : { scale: 1.18, x: panX }}
                        animate={reduce ? undefined : { scale: 1, x: 0 }}
                        transition={{ duration: DURATION / 1000 + 1.5, ease: "easeOut" }}
                    >
                        <Image
                            src={slide.src}
                            alt=""
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Voile de lisibilité : fort à gauche (texte), léger à droite */}
            <div className="absolute inset-0 bg-white/80 lg:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/80 to-white/20 lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
    );
}