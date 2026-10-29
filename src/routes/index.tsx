import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type Variants,
} from "framer-motion";
import { Check, Phone, Menu, X, ArrowUpRight, Star, Plus, Instagram, Facebook, Youtube, Wind, Feather, ShieldCheck } from "lucide-react";
import { Magnet } from "@/components/ui/magnetic";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import vest from "@/assets/c-vest.png";
import trunk from "@/assets/c-trunk.png";
import bra from "@/assets/c-bra.png";
import brief from "@/assets/c-brief.png";
import panty from "@/assets/c-panty.png";
import fabric from "@/assets/fabric.jpg";
import logo from "@/assets/ridoz-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ridoz Style" },
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
        <span key={li} className={l.className ?? ""}>
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
        <a href="#drop" aria-label="Ridoz Style, back to top" className="group flex items-center gap-2.5">
          <motion.span initial={{ scale: 0, rotate: -25, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.3 }} whileHover={{ rotate: [0, -10, 10, 0], scale: 1.12 }} className="block">
            <motion.img animate={{ y: [0, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} src={logo} alt="" width={428} height={560} className="h-10 w-auto" />
          </motion.span>
          <span className="font-display text-3xl font-bold leading-none tracking-tight text-primary">RIDOZ<span className="text-gold">.</span></span>
        </a>
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
          <Magnet className="hidden sm:inline-flex" strength={0.25}>
            <a href={TEL} className="btn-sweep inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:text-accent-foreground">{PHONE}</a>
          </Magnet>
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
          <motion.div variants={rise} className="mt-7">
            <Magnet strength={0.35}>
              <a href="#shop" className="btn-sweep group inline-flex min-h-12 items-center gap-2 rounded-full border border-primary px-6 text-sm font-semibold uppercase tracking-widest text-primary transition-colors duration-300 [--btn-sweep:var(--primary)] hover:text-primary-foreground">
                Explore the drop <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </Magnet>
          </motion.div>
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
          <Magnet strength={0.35}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={onAdd} className="btn-sweep group inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:text-accent-foreground">
              Add to bag <Plus className="h-4 w-4 transition duration-300 group-hover:rotate-90" />
            </motion.button>
          </Magnet>
          <div className="flex gap-2" role="group" aria-label="Choose product">
            {products.map((q, k) => (
              <Magnet key={q.name} strength={0.4}>
                <motion.button whileTap={{ scale: 0.9 }} aria-label={q.name} aria-pressed={k === i} onClick={() => setI(k)} style={{ backgroundColor: q.sw }} className={`h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 p-1 transition duration-200 ${k === i ? "scale-110 border-primary" : "border-transparent opacity-75 hover:opacity-100"}`}>
                  <img src={q.img} alt="" className="h-full w-full object-contain" />
                </motion.button>
              </Magnet>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Ticker that drifts left and speeds up (or reverses) with scroll velocity. */
function Marquee() {
  const items = ["Welcome to RIDOZ", "Everyday Comfort", "Made for You", "Move Freely", "Seamless Support"];
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${v}%`);
  const dir = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * 1.6 * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * move * b;
    base.set(wrap(-25, 0, base.get() - move));
  });
  return (
    <div aria-hidden className="bg-secondary py-3.5 text-secondary-foreground [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.4em] sm:text-xs">
        {[0, 1, 2, 3].map((set) => (
          <div key={set} className="flex shrink-0 items-center">
            {items.map((t) => (
              <span key={t} className="flex items-center">
                <span>{t}</span>
                <span className="mx-10 h-1 w-1 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ProductCard({ p, i, onAdd }: { p: P; i: number; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);
  return (
    <motion.article layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.6, delay: i * 0.08, ease }} whileHover="hover" className="group flex w-[68vw] max-w-[260px] shrink-0 snap-start flex-col sm:w-[44vw] lg:w-[calc((100%-4rem)/5)] lg:max-w-none">
      <motion.div variants={{ hover: { y: -6 } }} transition={{ duration: 0.3, ease }} className="relative overflow-hidden rounded-[1.75rem] border border-border" style={{ backgroundColor: `color-mix(in oklab, ${p.sw} 22%, var(--card))` }}>
        <span aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 transition duration-700 group-hover:scale-110" style={{ backgroundColor: p.sw }} />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">{p.tag}</span>
        <motion.img variants={{ hover: { scale: 1.08, rotate: -4 } }} transition={{ type: "spring", stiffness: 200, damping: 18 }} src={p.img} alt={p.name} loading="lazy" width={800} height={1000} className="drop-product relative mx-auto aspect-[4/5] w-[78%] object-contain py-6" />
      </motion.div>
      <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
        <h3 className="min-w-0 truncate text-sm font-semibold">{p.name}</h3>
        <p className="font-display text-2xl font-bold text-primary [font-variant-numeric:lining-nums]">₹{p.price}</p>
      </div>
      <Magnet className="mt-3 flex" strength={0.15}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => { onAdd(); setAdded(true); }}
        aria-label={`Add ${p.name} to bag`}
        className={`btn-sweep flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors duration-300 [--btn-sweep:var(--primary)] ${added ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary hover:text-primary-foreground"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={added ? "added" : "add"} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-2">
            {added ? <><Check className="h-4 w-4" /> Added to bag</> : <><Plus className="h-4 w-4" /> Add to bag</>}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      </Magnet>
    </motion.article>
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
          <SplitHeading className="mt-3 whitespace-nowrap font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl" lines={[{ text: "New" }, { text: "arrivals", className: "italic font-semibold text-primary" }]} />
        </div>
        <div className="flex gap-2" role="group" aria-label="Filter products">
          {["All", "Men", "Women"].map((f) => (
            <Magnet key={f} strength={0.3}>
              <motion.button whileTap={{ scale: 0.94 }} aria-pressed={filter === f} onClick={() => setFilter(f)} className="relative min-h-11 cursor-pointer rounded-full border border-border px-6 text-sm font-semibold transition-colors duration-200 hover:border-primary">
                {filter === f && <motion.span layoutId="filter-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} className="absolute inset-0 rounded-full bg-primary" />}
                <span className={`relative ${filter === f ? "text-primary-foreground" : ""}`}>{f}</span>
              </motion.button>
            </Magnet>
          ))}
        </div>
      </div>
      <motion.div layout className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:px-0">
        <AnimatePresence mode="popLayout">
          {list.map((p, k) => <ProductCard key={p.name} p={p} i={k} onAdd={onAdd} />)}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

type Col = { t: string; s: string; n: string; items: string; tint: string; pics: { src: string; alt: string }[] };

/** Fanned stack of cut-out products; spreads on hover and follows the pointer in layers. */
function CollectionCard({ c, i }: { c: Col; i: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const move = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const mid = (c.pics.length - 1) / 2;
  return (
    <motion.a
      href="#shop"
      aria-label={`Shop ${c.t}'s collection`}
      onMouseMove={move}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      initial="rest"
      whileInView="show"
      whileHover="hover"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ rest: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 }, hover: { opacity: 1, y: -6 } }}
      transition={{ duration: 0.8, delay: i * 0.15, ease }}
      className="group relative flex min-h-[340px] overflow-hidden rounded-[2rem] border border-border p-7 sm:min-h-[380px] sm:p-9"
      style={{ backgroundColor: `color-mix(in oklab, ${c.tint} 24%, var(--card))` }}
    >
      <motion.span aria-hidden variants={{ rest: { scale: 0.6, opacity: 0 }, show: { scale: 1, opacity: 1 }, hover: { scale: 1.08, opacity: 1 } }} transition={{ duration: 0.9, ease }} className="absolute -right-16 top-1/2 aspect-square w-[78%] -translate-y-1/2 rounded-full opacity-40" style={{ backgroundColor: c.tint }} />
      <div className="relative z-10 flex flex-col justify-between">
        <div>
          <span className="font-display text-xl font-semibold text-primary [font-variant-numeric:lining-nums]">{c.n}</span>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{c.items}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{c.s}</p>
          <h3 className="mt-1 font-display text-5xl font-bold leading-none sm:text-6xl">{c.t}</h3>
          <Magnet strength={0.4} className="mt-5">
            <span className="btn-sweep inline-flex min-h-11 items-center gap-2 rounded-full border border-primary px-5 text-sm font-semibold text-primary transition-colors duration-300 [--btn-sweep:var(--primary)] group-hover:text-primary-foreground">
              Shop {c.t} <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:rotate-45" />
            </span>
          </Magnet>
        </div>
      </div>
      <motion.div style={{ x: px, y: py }} className="pointer-events-none absolute inset-y-0 right-0 w-[62%]">
        {c.pics.map((pic, k) => {
          const o = k - mid;
          return (
            <motion.img
              key={pic.alt}
              src={pic.src}
              alt={pic.alt}
              loading="lazy"
              width={800}
              height={1000}
              variants={{
                rest: { opacity: 0, y: 50, rotate: 0, x: 0 },
                show: { opacity: 1, y: 0, rotate: o * 9, x: o * 38 },
                hover: { opacity: 1, y: -10, rotate: o * 15, x: o * 62 },
              }}
              transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.25 + k * 0.1 }}
              style={{ zIndex: 10 - Math.abs(Math.round(o * 2)) }}
              className="drop-product absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          );
        })}
      </motion.div>
    </motion.a>
  );
}

function Collections() {
  const cols: Col[] = [
    { t: "Men", s: "Comfort meets confidence", n: "01", items: "Trunks · Briefs · Vests", tint: "var(--swatch-wine)", pics: [{ src: brief, alt: "Navy classic brief" }, { src: trunk, alt: "Wine trunk boxer" }, { src: vest, alt: "Ribbed cotton vest" }] },
    { t: "Women", s: "Soft, seamless & breathable", n: "02", items: "Bras · Panties", tint: "var(--swatch-sand)", pics: [{ src: bra, alt: "Caramel comfort bra" }, { src: panty, alt: "Teal high-waist panty" }] },
  ];
  return (
    <section id="collections" className="mx-auto max-w-6xl px-5 pb-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Two worlds</Eyebrow>
          <SplitHeading className="mt-3 whitespace-nowrap font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl" lines={[{ text: "Shop by" }, { text: "collection", className: "italic font-semibold text-primary" }]} />
        </div>
        <Reveal><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Two worlds of everyday comfort — pick yours and never look back.</p></Reveal>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cols.map((c, i) => <CollectionCard key={c.t} c={c} i={i} />)}
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
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <section ref={ref} className="mx-auto max-w-6xl px-5 pb-24">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease }} className="relative overflow-hidden rounded-[2.5rem] bg-secondary text-secondary-foreground">
        <img src={fabric} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay" />
        <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={rise} className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Boxer Briefs</motion.p>
            <motion.h2 variants={rise} className="mt-3 font-display text-4xl font-bold leading-[0.95] sm:text-5xl">Comfort made for <em className="font-semibold text-accent">every move.</em></motion.h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {feats.map((f) => (
                <motion.div variants={rise} whileHover="hover" key={f.t} className="rounded-2xl border border-secondary-foreground/15 bg-background/10 p-4 backdrop-blur transition-colors duration-300 hover:bg-background/20">
                  <motion.span variants={{ hover: { rotate: [0, -12, 12, 0], scale: 1.1 } }} transition={{ duration: 0.5 }} className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"><f.i aria-hidden className="h-5 w-5" /></motion.span>
                  <p className="mt-3 font-semibold">{f.t}</p>
                  <p className="text-sm opacity-80">{f.d}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={rise} className="mt-7">
              <Magnet strength={0.35}>
                <a href="#shop" className="btn-sweep group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-colors duration-300 [--btn-sweep:var(--background)]">
                  Shop boxers <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnet>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto aspect-square w-full max-w-[360px]">
            <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-accent/50" />
            <motion.div aria-hidden animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute inset-8 rounded-full border border-secondary-foreground/20" />
            <div aria-hidden className="absolute inset-14 rounded-full bg-primary/50 blur-2xl" />
            <motion.img style={{ rotate, y }} src={trunk} alt="Wine trunk boxer" loading="lazy" className="drop-product absolute inset-0 m-auto w-[68%]" />
            {[
              { l: "Micro-modal", c: "left-0 top-[14%]", d: 0 },
              { l: "Anti-roll band", c: "bottom-[12%] right-0", d: 1.2 },
            ].map((b) => (
              <motion.span key={b.l} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + b.d * 0.3, type: "spring", stiffness: 260, damping: 16 }} className={`absolute ${b.c}`}>
                <motion.span animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, delay: b.d, repeat: Infinity, ease: "easeInOut" }} className="block rounded-full bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-soft">{b.l}</motion.span>
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-5 pb-28">
      <Eyebrow>Loved by customers</Eyebrow>
      <SplitHeading className="mt-3 whitespace-nowrap font-display text-4xl font-bold leading-none sm:text-5xl lg:text-6xl" lines={[{ text: "Real talk", className: "italic font-semibold text-primary" }]} />
      <Reveal className="mt-10 overflow-hidden rounded-[2rem] border border-border">
        <StaggerTestimonials testimonials={reviews.map((r) => ({ testimonial: r.q, by: `${r.n}, ${r.t}` }))} />
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border">
      <motion.p aria-hidden initial={{ y: "35%", opacity: 0 }} whileInView={{ y: "10%", opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center font-display text-[26vw] font-bold leading-[0.75] tracking-tight text-muted">RIDOZ</motion.p>
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="text-sm">
          <p className="font-semibold uppercase tracking-widest text-primary">Contact</p>
          <p className="mt-3 text-muted-foreground">RIDOZ Innerwear Services, India</p>
          <a href={TEL} className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold"><Phone className="h-4 w-4" />{PHONE}</a>
          <div className="mt-4 flex gap-2">
            {[
              { I: Instagram, l: "Instagram" },
              { I: Facebook, l: "Facebook" },
              { I: Youtube, l: "YouTube" },
            ].map(({ I, l }) => <Magnet key={l} strength={0.4}><a href="#" aria-label={l} className="btn-sweep flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 transition-colors duration-300 [--btn-sweep:var(--primary)] hover:text-primary-foreground"><I className="h-4 w-4" /></a></Magnet>)}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-2 text-sm text-muted-foreground">
          {["Terms & Conditions", "Privacy Policy", "Returns & Exchanges", "Shipping & Delivery", "Contact Us", "Customer Care"].map((l) => <a key={l} href="#" className="flex min-h-11 items-center transition-colors duration-200 hover:text-foreground">{l}</a>)}
        </div>
        <div className="flex flex-wrap content-start gap-2">
          {["UPI", "VISA", "Mastercard", "RuPay", "COD"].map((p) => <span key={p} className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold">{p}</span>)}
        </div>
      </div>
      <p className="relative z-10 py-5 text-center text-xs text-muted-foreground">© 2026 RIDOZ Style Innerwears</p>
    </footer>
  );
}

const LOADER_MIN_MS = 2200;

/** Full-screen intro: the logo pops in inside a drawing ring, then the screen wipes upward. */
function Loader() {
  return (
    <motion.div
      role="status"
      aria-label="Loading Ridoz Style"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.9, ease } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-background"
    >
      <div className="grain absolute inset-0 opacity-60" />
      <div className="relative flex h-56 w-56 items-center justify-center">
        <motion.svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.circle cx="50" cy="50" r="47" fill="none" stroke="var(--border)" strokeWidth="0.6" />
          <motion.circle cx="50" cy="50" r="47" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: LOADER_MIN_MS / 1000 - 0.3, ease: "easeInOut" }} />
        </motion.svg>
        <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-dashed border-primary/25" />
        <motion.div aria-hidden initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [1, 1.12, 1], opacity: 0.5 }} transition={{ scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.8 } }} className="absolute inset-10 rounded-full bg-accent/50 blur-2xl" />
        <motion.img src={logo} alt="" width={428} height={560} initial={{ scale: 0.3, opacity: 0, rotate: -20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.2 }} className="relative z-10 h-32 w-auto drop-shadow-lg" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.p className="flex font-display text-4xl font-bold tracking-tight text-primary" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } } }}>
          {"RIDOZ STYLE".split("").map((ch, k) => (
            <motion.span key={k} variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5, ease } } }} className="inline-block whitespace-pre">{ch}</motion.span>
          ))}
        </motion.p>
        <div className="h-0.5 w-40 overflow-hidden rounded-full bg-border">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: LOADER_MIN_MS / 1000, ease: "easeInOut" }} className="h-full origin-left bg-primary" />
        </div>
      </div>
    </motion.div>
  );
}

function Index() {
  const [cart, setCart] = useState(0);
  const add = () => setCart((c) => c + 1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let live = true;
    const minimum = new Promise((r) => setTimeout(r, LOADER_MIN_MS));
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
    });
    Promise.all([minimum, loaded]).then(() => live && setLoading(false));
    return () => { live = false; };
  }, []);
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
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
