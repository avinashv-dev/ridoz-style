import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Phone, Menu, X, ArrowUpRight, Star, Plus, Instagram, Facebook, Youtube, Wind, Feather, ShieldCheck } from "lucide-react";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import vest from "@/assets/c-vest.png";
import trunk from "@/assets/c-trunk.png";
import bra from "@/assets/c-bra.png";
import brief from "@/assets/c-brief.png";
import panty from "@/assets/c-panty.png";
import women from "@/assets/women-collection.jpg";
import men from "@/assets/men-collection.jpg";
import fabric from "@/assets/fabric.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIDOZ — Everyday Comfort Innerwear for Men & Women" },
      { name: "description", content: "Seamless, breathable innerwear by RIDOZ. Bras, briefs, boxers, panties and vests made for all-day comfort." },
      { property: "og:title", content: "RIDOZ — Everyday Comfort Innerwear" },
      { property: "og:description", content: "Seamless support and all-day comfort. Shop men's and women's innerwear." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "+91 7510441075";
const TEL = `tel:${PHONE.replace(/\s/g, "")}`;
type P = { name: string; short: string; price: number; img: string; tag: string; sw: string };
const products: P[] = [
  { name: "Wine Trunk Boxer", short: "TRUNK", price: 449, img: trunk, tag: "Men", sw: "var(--swatch-wine)" },
  { name: "Caramel Comfort Bra", short: "BRA", price: 599, img: bra, tag: "Women", sw: "var(--swatch-sand)" },
  { name: "Navy Classic Brief", short: "BRIEF", price: 299, img: brief, tag: "Men", sw: "var(--swatch-navy)" },
  { name: "Teal High-Waist Panty", short: "PANTY", price: 329, img: panty, tag: "Women", sw: "var(--swatch-teal)" },
  { name: "Ribbed Cotton Vest", short: "VEST", price: 349, img: vest, tag: "Men", sw: "var(--swatch-cloud)" },
];
const reviews = [
  { t: "Comfort You Can Feel", q: "Soft fabric that stays comfortable from morning meetings to late nights.", n: "Anjali R." },
  { t: "Quality That Matters", q: "Stitching holds up wash after wash. The waistband never rolls.", n: "Rahul M." },
  { t: "Made for Everyday Wear", q: "Breathable, light and fits perfectly. I've ordered three more packs.", n: "Sneha K." },
];
const ease = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** Headline whose words rise out of a mask, one after another. */
function SplitHeading({ lines, className = "" }: { lines: { text: string; className?: string }[]; className?: string }) {
  return (
    <motion.h2 className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
      {lines.map((l, li) => (
        <span key={li} className={`block ${l.className ?? ""}`}>
          {l.text.split(" ").map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span className="inline-block" variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.8, ease } } }}>
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{children}</p>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold" />;
}

function Header({ cart }: { cart: number }) {
  const [open, setOpen] = useState(false);
  const links = ["Drop", "Shop", "Collections", "Reviews", "Contact"];
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease }} className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border bg-background/80 px-5 py-2.5 shadow-sm backdrop-blur-xl">
        <a href="#drop" className="font-display text-3xl font-bold leading-none tracking-tight text-primary">RIDOZ<span className="text-gold">.</span></a>
        <nav aria-label="Primary" className="hidden gap-8 text-sm font-medium md:flex">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="flex min-h-11 items-center">
              <RandomLetterSwap
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                label={l}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <motion.span key={cart} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 14 }} aria-live="polite" className="inline-flex min-h-11 items-center rounded-full bg-muted px-4 text-xs font-semibold tracking-wide">
            BAG · {cart}
          </motion.span>
          <a href={TEL} className="hidden min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition duration-200 hover:bg-secondary sm:inline-flex">{PHONE}</a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:hidden">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }} className="mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl border border-border bg-card p-4 shadow-soft md:hidden">
            {links.map((l) => (
              <motion.a variants={rise} key={l} onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`} className="flex min-h-12 items-center px-3 font-display text-3xl font-semibold">{l}</motion.a>
            ))}
            <motion.a variants={rise} href={TEL} className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">{PHONE}</motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero({ onAdd }: { onAdd: () => void }) {
  const [i, setI] = useState(0);
  const p = products[i] ?? products[0]!;
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 16 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % products.length), 5500);
    return () => clearInterval(t);
  }, [i]);
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <section ref={ref} id="drop" onMouseMove={move} onMouseLeave={() => { mx.set(0); my.set(0); }} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-12">
      <motion.div animate={{ backgroundColor: p.sw }} transition={{ duration: 1.1 }} className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(92vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" />
      <div className="grain absolute inset-0 -z-10 opacity-60" />
      <motion.div style={{ y: textY }} className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none overflow-hidden text-center" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.p key={p.short} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: 0.6, ease }} className="text-outline font-display text-[28vw] font-bold leading-none tracking-tight opacity-25">
            {p.short}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 lg:grid-cols-[1fr_1.2fr_1fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.div variants={rise}><Eyebrow>SS·26 Drop</Eyebrow></motion.div>
          <motion.h1 variants={rise} className="mt-4 font-display text-6xl font-bold leading-[0.9] sm:text-7xl">
            Comfort<br />meets<br /><em className="font-semibold text-primary">confidence.</em>
          </motion.h1>
          <motion.p variants={rise} className="mt-5 max-w-xs leading-relaxed text-muted-foreground">Seamless support, all-day comfort. Engineered for performance, made for every day.</motion.p>
          <motion.a variants={rise} href="#shop" className="group mt-7 inline-flex min-h-12 items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Explore the drop <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </motion.div>

        <motion.div style={{ y: imgY, perspective: 1200 }} className="order-1 flex justify-center lg:order-2">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={p.img}
                src={p.img}
                alt={p.name}
                width={800}
                height={1000}
                style={{ rotateX: rx, rotateY: ry }}
                initial={{ opacity: 0, scale: 0.7, rotate: -18, y: 60 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, rotate: 14, y: -40 }}
                transition={{ duration: 0.8, ease }}
                className="drop-product w-[min(68vw,420px)]"
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <div className="order-3 flex flex-col items-start gap-4 lg:items-end">
          <AnimatePresence mode="wait">
            <motion.div key={p.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease }} className="lg:text-right">
              <p className="text-sm text-muted-foreground">{p.tag} · 0{i + 1}/0{products.length}</p>
              <p className="mt-1 font-display text-3xl font-semibold">{p.name}</p>
              <p className="font-display text-5xl font-bold text-primary">₹{p.price}</p>
            </motion.div>
          </AnimatePresence>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={onAdd} className="group inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-secondary">
            Add to bag <Plus className="h-4 w-4 transition duration-300 group-hover:rotate-90" />
          </motion.button>
          <div className="flex gap-2" role="group" aria-label="Choose product">
            {products.map((q, k) => (
              <button key={q.name} aria-label={q.name} aria-pressed={k === i} onClick={() => setI(k)} style={{ backgroundColor: q.sw }} className={`h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 p-1 transition duration-200 ${k === i ? "scale-110 border-primary" : "border-transparent opacity-75 hover:opacity-100"}`}>
                <img src={q.img} alt="" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Welcome to RIDOZ", "Everyday Comfort", "Made for You", "Move Freely", "Seamless Support"];
  return (
    <div aria-hidden className="overflow-hidden bg-primary py-5 text-primary-foreground">
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-3xl font-semibold italic">
        {[...items, ...items, ...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-10">{t}<Star className="h-4 w-4 fill-gold text-gold" /></span>)}
      </div>
    </div>
  );
}

function Shop({ onAdd }: { onAdd: () => void }) {
  const [filter, setFilter] = useState("All");
  const list = products.filter((p) => filter === "All" || p.tag === filter);
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-28">
      <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Eyebrow>The collection</Eyebrow>
          <SplitHeading className="mt-3 font-display text-6xl font-bold leading-[0.9] sm:text-8xl" lines={[{ text: "New" }, { text: "arrivals", className: "italic font-semibold text-primary" }]} />
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter products">
          {["All", "Men", "Women"].map((f) => (
            <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className="relative min-h-11 cursor-pointer rounded-full border border-border px-6 text-sm font-semibold transition-colors duration-200 hover:border-primary">
              {filter === f && <motion.span layoutId="filter-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-full bg-primary" />}
              <span className={`relative ${filter === f ? "text-primary-foreground" : ""}`}>{f}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div layout className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, k) => (
            <motion.div layout key={p.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.5, ease }} className={k === 0 && filter === "All" ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease }} className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-soft">
                <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-60 transition duration-700 group-hover:scale-[2.2]" style={{ backgroundColor: p.sw }} />
                <div className="relative flex items-start justify-between">
                  <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">{p.tag}</span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 transition duration-300 group-hover:rotate-45" />
                </div>
                <img src={p.img} alt={p.name} loading="lazy" width={800} height={1000} className="drop-product relative mx-auto my-4 aspect-square w-4/5 flex-1 object-contain transition duration-700 group-hover:-rotate-6 group-hover:scale-110" />
                <div className="relative flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{p.name}</p>
                    <p className="font-display text-3xl font-bold text-primary">₹{p.price}</p>
                  </div>
                  <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={onAdd} aria-label={`Add ${p.name} to bag`} className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-secondary"><Plus className="h-5 w-5" /></motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Collections() {
  const cols = [
    { t: "Men", s: "Comfort meets confidence", img: men, n: "01", items: "Trunks · Briefs · Vests" },
    { t: "Women", s: "Soft, seamless & breathable", img: women, n: "02", items: "Bras · Panties · Bralettes" },
  ];
  return (
    <section id="collections" className="mx-auto max-w-6xl px-5 pb-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Two worlds</Eyebrow>
          <SplitHeading className="mt-3 font-display text-6xl font-bold leading-[0.9] sm:text-8xl" lines={[{ text: "Shop by" }, { text: "collection", className: "italic font-semibold text-primary" }]} />
        </div>
        <Reveal><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Two worlds of everyday comfort — pick yours and never look back.</p></Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cols.map((c, i) => (
          <Reveal key={c.t} delay={i * 0.15}>
            <a href="#shop" className="group relative block overflow-hidden rounded-[2rem] border border-border">
              <div className="overflow-hidden">
                <img src={c.img} alt={`${c.t}'s innerwear`} loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover transition duration-[900ms] group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/10 to-transparent" />
              <span aria-hidden className="absolute right-6 top-4 font-display text-8xl font-bold text-secondary-foreground/40 transition duration-500 group-hover:text-secondary-foreground/80">{c.n}</span>
              <span className="absolute left-6 top-6 rounded-full bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground backdrop-blur">{c.items}</span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-secondary-foreground">
                <div>
                  <p className="text-sm opacity-90">{c.s}</p>
                  <h3 className="font-display text-7xl font-bold leading-none">{c.t}</h3>
                </div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground transition duration-500 group-hover:rotate-45 group-hover:scale-110"><ArrowUpRight /></span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Feature() {
  const feats = [
    { i: Wind, t: "Breathable", d: "Micro-modal airflow" },
    { i: Feather, t: "Featherlight", d: "Barely-there feel" },
    { i: ShieldCheck, t: "Anti-roll band", d: "Stays in place" },
  ];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 pb-28">
      <div className="relative grid overflow-hidden rounded-[2.5rem] bg-secondary text-secondary-foreground lg:grid-cols-2">
        <img src={fabric} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay" />
        <div className="relative p-8 sm:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Boxer Briefs</p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] sm:text-6xl">Comfort made for <em className="font-semibold text-accent">every move.</em></h2>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-9 grid gap-3">
            {feats.map((f) => (
              <motion.div variants={rise} key={f.t} className="flex items-center gap-4 rounded-2xl border border-secondary-foreground/15 bg-background/10 p-4 backdrop-blur">
                <f.i aria-hidden className="h-7 w-7 shrink-0 text-accent" />
                <div><p className="font-semibold">{f.t}</p><p className="text-sm opacity-80">{f.d}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="relative flex items-center justify-center p-8">
          <motion.img style={{ rotate, y }} src={trunk} alt="Wine trunk boxer" loading="lazy" className="drop-product w-[min(80%,420px)]" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 pb-28">
      <Eyebrow>Loved by customers</Eyebrow>
      <SplitHeading className="mt-3 font-display text-6xl font-bold leading-[0.9] sm:text-8xl" lines={[{ text: "Real talk", className: "italic font-semibold text-primary" }]} />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.figure variants={rise} whileHover={{ y: -8 }} key={r.t} className={`h-full rounded-[2rem] border border-border p-8 ${i === 1 ? "bg-primary text-primary-foreground" : "bg-card"}`}>
            <div className="flex gap-1 text-gold" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
            <figcaption className="mt-5 font-display text-3xl font-semibold leading-tight">{r.t}</figcaption>
            <blockquote className="mt-3 leading-relaxed opacity-90">“{r.q}”</blockquote>
            <p className="mt-6 text-sm font-semibold">{r.n}</p>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="text-sm">
          <p className="font-semibold uppercase tracking-widest text-primary">Contact</p>
          <p className="mt-3 text-muted-foreground">RIDOZ Innerwear Services, India</p>
          <a href={TEL} className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold"><Phone className="h-4 w-4" />{PHONE}</a>
          <div className="mt-4 flex gap-2">
            {[
              { I: Instagram, l: "Instagram" },
              { I: Facebook, l: "Facebook" },
              { I: Youtube, l: "YouTube" },
            ].map(({ I, l }) => <a key={l} href="#" aria-label={l} className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"><I className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 text-sm text-muted-foreground">
          {["Terms & Conditions", "Privacy Policy", "Returns & Exchanges", "Shipping & Delivery", "Contact Us", "Customer Care"].map((l) => <a key={l} href="#" className="flex min-h-11 items-center transition-colors duration-200 hover:text-foreground">{l}</a>)}
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {["UPI", "VISA", "Mastercard", "RuPay", "COD"].map((p) => <span key={p} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold">{p}</span>)}
        </div>
      </div>
      <p aria-hidden className="overflow-hidden px-5 text-center font-display text-[24vw] font-bold leading-[0.8] tracking-tight text-muted">RIDOZ</p>
      <p className="py-5 text-center text-xs text-muted-foreground">© 2026 RIDOZ Style Innerwears</p>
    </footer>
  );
}

function Index() {
  const [cart, setCart] = useState(0);
  const add = () => setCart((c) => c + 1);
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header cart={cart} />
      <main className="overflow-x-hidden">
        <Hero onAdd={add} />
        <Marquee />
        <Shop onAdd={add} />
        <Collections />
        <Feature />
        <Reviews />
      </main>
      <Footer />
    </MotionConfig>
  );
}
