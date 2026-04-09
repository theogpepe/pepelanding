"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/PepeLanding.module.css";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";

const CONTRACT = "0x4dFae3690b93c47470b03036A17B23C1Be05127C";
const SUPPLY = 37321;
const UNISWAP_URL = `https://app.uniswap.org/swap?outputCurrency=${CONTRACT}`;
const ETHERSCAN_URL = `https://etherscan.io/token/${CONTRACT}`;

const socials = [
  {
    href: "https://twitter.com/theogpepe2020",
    src: `${bp}/socials/x-logo.png`,
    alt: "X / Twitter",
  },
  {
    href: "https://t.me/OgPeperc20",
    src: `${bp}/socials/telegram-logo.png`,
    alt: "Telegram",
  },
  { href: UNISWAP_URL, src: `${bp}/socials/uniswap-logo.png`, alt: "Uniswap" },
  { href: ETHERSCAN_URL, src: `${bp}/socials/etherscan.png`, alt: "Etherscan" },
  {
    href: "https://www.dextools.io/app/es/ether/pair-explorer/0xa84181f223a042949e9040e42b44c50021802db6",
    src: `${bp}/socials/dextools.png`,
    alt: "DexTools",
  },
  {
    href: "https://www.coingecko.com/en/coins/the-original-pepe",
    src: `${bp}/socials/coingecko.png`,
    alt: "CoinGecko",
  },
  {
    href: "https://the-og-pepe.medium.com/",
    src: `${bp}/socials/medium-logo.png`,
    alt: "Medium",
  },
  {
    href: "https://github.com/theogpepe/",
    src: `${bp}/socials/github-logo.png`,
    alt: "GitHub",
  },
];

const roadmap = [
  {
    src: `${bp}/images/roadmap-icons/launch.webp`,
    title: "Launch",
    date: "Q4 2020",
    note: "Born in the swamp.",
  },
  {
    src: `${bp}/images/roadmap-icons/hibernate.webp`,
    title: "Hibernate",
    date: "2021–22",
    note: "Frogs sleep.",
  },
  {
    src: `${bp}/images/roadmap-icons/clone-pepe.webp`,
    title: "Famous Pepe Reignites Interest",
    date: "Q3 2023",
    note: "The other Pepe blows up. People remember there was a first one.",
  },
  {
    src: `${bp}/images/roadmap-icons/cto.webp`,
    title: "Community Takes Over",
    date: "Q4 2023",
    note: "Holders ran it.",
  },
  {
    src: `${bp}/images/roadmap-icons/pepex.webp`,
    title: "Dev Joins CTO. PepeX Launches.",
    date: "Q1 2024",
    note: "A DEX built for the swamp.",
  },
  {
    src: `${bp}/images/roadmap-icons/hibernate.webp`,
    title: "The Longest Crypto Winter",
    date: "2025",
    note: "Things went quiet. Building kept going.",
  },
  {
    src: `${bp}/images/pepex_explosion.png`,
    title: "PepeX Perpetuals",
    date: "Now · 2026",
    note: "0% maker / 0.05% taker. Fees go to buybacks.",
    cta: { label: "Trade →", href: "https://perps.pepex.io" },
    raw: true,
  },
  {
    src: `${bp}/images/pepe_claw.png`,
    title: "Pepe Agent is Live",
    date: "Live · Q2 2026",
    note: "Running in the Telegram group. Talks, builds, posts its own updates. Powered by OpenClaw.",
    cta: { label: "View portfolio →", href: "https://ogpepebot.github.io/ogpepebot/" },
    raw: true,
  },
  {
    src: `${bp}/images/roadmap-icons/moon.webp`,
    title: "Base Expansion + Animated 3D Pepe with Voice Chat",
    date: "Coming soon",
    note: "PEPE goes multichain. Animated 3D Pepe with voice chat.",
  },
  {
    src: `${bp}/images/roadmap-icons/ellipse-5@2x.png`,
    title: "Beyond",
    date: "???",
    note: "The frog keeps going.",
    raw: true,
  },
];

const buySteps = [
  {
    title: "Get a wallet",
    body: "MetaMask or any web3 wallet. Yes, even the one you forgot the seed phrase for.",
    href: null,
  },
  {
    title: "Load up on ETH",
    body: "ETH goes in. PEPE comes out. It is basically alchemy, but on Ethereum.",
    href: null,
  },
  {
    title: "Swap on Uniswap",
    body: "Paste the contract. Hit swap. Welcome to internet history.",
    href: UNISWAP_URL,
  },
];

const agentTiers = [
  {
    name: "Wojak",
    tagline: "The Worker",
    desc: "Fast, cheap, data-first. On-chain queries, price lookups, contract explanations. The grunt work tier.",
    model: "Haiku-class",
    icon: "/images/roadmap-icons/cto.png",
    featured: false,
  },
  {
    name: "Pepe",
    tagline: "The Face",
    desc: "Community voice. Meme generation, ecosystem Q&A, social content. The default experience.",
    model: "Sonnet-class",
    icon: "/images/token/pepe.png",
    featured: true,
  },
  {
    name: "Chad",
    tagline: "The Strategist",
    desc: "Code review, Solidity audits, governance analysis. Top holders only. Terse, opinionated, expensive.",
    model: "Opus-class",
    icon: "/images/roadmap-icons/full-integration.png",
    featured: false,
  },
];

const ticker = [
  "CERTIFIED SWAMP CLASSIC",
  "37,321 PEPE AND COUNTING",
  "DEPLOYED 2020",
  "ZERO TAX FOREVER",
  "PEPE AGENT LIVE ON OPENCLAW",
  "ETHEREUM NATIVE",
  "COMMUNITY OWNED",
  "PEPEX PERPS LIVE",
  "RIBBIT WITH INTENT",
  "OG PEPE FOREVER",
];

const frogFacts = [
  "Deployed 2020. Still here.",
  "No VC.",
  "Community-run since day one.",
];


// OG Pepe deployment block timestamp: Oct 10 2020 15:38:48 UTC
const DEPLOY_DATE = new Date(1602340728 * 1000);

function getElapsed(since: Date) {
  const diff = Math.max(0, Date.now() - since.getTime());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function useElapsed(since: Date) {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setElapsed(getElapsed(since));
    const id = setInterval(() => setElapsed(getElapsed(since)), 1000);
    return () => clearInterval(id);
  }, [since]);

  return elapsed;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Agents", href: "#agents" },
  { label: "Community", href: "#community" },
  { label: "DEX", href: "https://pepex.io" },
  { label: "Perps", href: "https://perps.pepex.io", isNew: true },
];

function useTokenPrice() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetch_ = () =>
      fetch(`https://api.geckoterminal.com/api/v2/simple/networks/eth/token_price/${CONTRACT}`)
        .then((r) => r.json())
        .then((d) => {
          const raw = d?.data?.attributes?.token_prices?.[CONTRACT.toLowerCase()];
          if (raw) setPrice(parseFloat(raw));
        })
        .catch(() => {});
    fetch_();
    const id = setInterval(fetch_, 60000);
    return () => clearInterval(id);
  }, []);

  return price;
}

export default function PepeLanding() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const elapsed = useElapsed(DEPLOY_DATE);
  const price = useTokenPrice();
  const mcap = price !== null ? price * SUPPLY : null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const tickerItems = [...ticker, ...ticker];

  return (
    <>
      <div className={styles.pageShell}>
        <div className={styles.noise} aria-hidden="true" />

        {/* ── HEADER ── */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <a
              className={styles.brand}
              href="#top"
              aria-label="OG Pepe — back to top"
            >
              <div className={styles.brandMark}>
                <Image
                  src={`${bp}/logo.png`}
                  alt="OG Pepe"
                  width={36}
                  height={36}
                  priority
                />
              </div>
              <span className={styles.brandName}>OG PEPE</span>
            </a>

<nav className={styles.nav} aria-label="Main navigation">
  {navLinks.map((link) => {
    const content = (
      <>
        <span>{link.label}</span>
        {link.isNew && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.14rem 0.38rem",
              borderRadius: "999px",
              fontSize: "0.56rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              lineHeight: 1,
              color: "#08110a",
              background: "#b7ff4a",
              marginLeft: "0.4rem",
              boxShadow: "0 0 10px rgba(183, 255, 74, 0.18)",
              transform: "translateY(-1px)",
              whiteSpace: "nowrap",
            }}
          >
            NEW
          </span>
        )}
      </>
    );

    return link.href.startsWith("http") ? (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.navLink}
        style={link.isNew ? { display: "inline-flex", alignItems: "center" } : undefined}
      >
        {content}
      </a>
    ) : (
      <Link
        key={link.label}
        href={link.href}
        className={styles.navLink}
        style={link.isNew ? { display: "inline-flex", alignItems: "center" } : undefined}
      >
        {content}
      </Link>
    );
  })}
</nav>

            <div className={styles.headerRight}>
              <a
                href={UNISWAP_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.buyBtn}
              >
                Buy PEPE
              </a>
              <button
                type="button"
                className={styles.hamburger}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span
                  className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineTop : ""}`}
                />
                <span
                  className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineMid : ""}`}
                />
                <span
                  className={`${styles.hamburgerLine} ${menuOpen ? styles.hamburgerLineBot : ""}`}
                />
              </button>
            </div>
          </div>
        </header>

        {/* ── MOBILE NAV OVERLAY ── */}
        {menuOpen && (
          <div
            className={styles.mobileOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className={styles.mobileOverlayInner}>
              {navLinks.map((link) =>
                link.href.startsWith("http") ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href={UNISWAP_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.mobileBuyBtn}
                onClick={() => setMenuOpen(false)}
              >
                Buy PEPE
              </a>
            </div>
          </div>
        )}

        <main id="top" className={styles.main}>
          {/* ── HERO ── */}
          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                Est. 2020
              </p>
              <h1 className={styles.heroTitle}>
                The frog.
                <br />
                The OG.
                <br />
                Still here.
              </h1>
              <p className={styles.heroSub}>
                First Pepe on Ethereum. Community-run since 2023.
                No tax. Agent live. Perps live.
              </p>

              <div className={styles.contractRow}>
                <code className={styles.contractCode}>{CONTRACT}</code>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ""}`}
                  aria-label="Copy contract address"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className={styles.heroActions}>
                <a
                  className={styles.primaryBtn}
                  href={UNISWAP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={`${bp}/images/uniswap.png`}
                    alt=""
                    width={18}
                    height={18}
                  />
                  Buy on Uniswap
                </a>
                <a
                  className={styles.outlineBtn}
                  href="https://pepex.io"
                  target="_blank"
                  rel="noreferrer"
                >
                  PepeX DEX
                </a>
                <a
                  className={styles.ghostBtn}
                  href={ETHERSCAN_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={`${bp}/socials/etherscan.png`}
                    alt=""
                    width={16}
                    height={16}
                  />
                  Etherscan
                </a>
              </div>

              <ul className={styles.pillRow} aria-label="Token stats">
                <li>Supply: ~37,321</li>
                <li aria-hidden="true">·</li>
                <li>Tax: 0%</li>
                <li aria-hidden="true">·</li>
                <li>Chain: Ethereum</li>
                <li aria-hidden="true">·</li>
                <li>Year: 2020</li>
              </ul>

              {/* Elapsed Timer */}
              <div className={styles.heroTimer}>
                <p className={styles.heroTimerTitle}>
                  On-chain since Oct 10, 2020
                </p>
                <div className={styles.heroTimerGrid}>
                  {(
                    [
                      { value: elapsed.days, label: "DAYS" },
                      { value: elapsed.hours, label: "HOURS" },
                      { value: elapsed.minutes, label: "MINUTES" },
                      { value: elapsed.seconds, label: "SECONDS" },
                    ] as { value: number; label: string }[]
                  ).map(({ value, label }) => (
                    <div key={label} className={styles.heroTimerBox}>
                      <span className={styles.heroTimerNum}>
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className={styles.heroTimerLabel}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.swampCard}>
              <div className={styles.swampCardTop}>
                <span className={styles.statusDot} aria-hidden="true" />
                <p className={styles.statusLabel}>Locked and loaded</p>
              </div>

              <div className={styles.swampPepe}>
                <div className={styles.pepeGlow} aria-hidden="true" />
                <Image
                  src={`${bp}/images/pepe_blinder.gif`}
                  alt="OG Pepe"
                  width={512}
                  height={512}
                  className={styles.pepeImg}
                  priority
                />
              </div>

              <div className={styles.frogFactsPanel}>
                <div className={styles.frogFactsTop}>
                  <div>
                    <p className={styles.frogFactsLabel}>Frog facts</p>
                    <ul className={styles.frogFactsList}>
                      {frogFacts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.frogPriceCol}>
                    <div className={styles.frogPriceStat}>
                      <p className={styles.frogPriceLabel}>Price</p>
                      <p className={styles.frogPriceValue}>
                        {price !== null ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                      </p>
                    </div>
                    <div className={styles.frogPriceStat}>
                      <p className={styles.frogPriceLabel}>Mkt cap</p>
                      <p className={styles.frogPriceValue}>
                        {mcap !== null ? `$${mcap.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── ABOUT / STATS ── */}
          <section id="about" className={styles.section}>
            <p className={styles.eyebrow}>What is OG Pepe?</p>
            <h2 className={styles.sectionTitle}>The first. Still building.</h2>
            <p className={styles.bodyText}>
              The original Pepe token on Ethereum. No tax, no team bag, community-run.
              A live AI agent working to grow the ecosystem and return value to holders.
              Not winding down. Building up.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <p className={styles.statValue}>~37,321</p>
                <p className={styles.statLabel}>Total supply</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statValue}>
                  0% <span className={styles.zeroBadge}>forever</span>
                </p>
                <p className={styles.statLabel}>No buy tax. No sell tax.</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statValue}>2020</p>
                <p className={styles.statLabel}>Before the Pepe wave.</p>
              </div>
              <div className={styles.statCard}>
                <p className={styles.statValue}>CTO</p>
                <p className={styles.statLabel}>Run by the community since 2023.</p>
              </div>
            </div>
          </section>

          {/* ── ROADMAP ── */}
          <section
            id="roadmap"
            className={`${styles.section} ${styles.sectionCenter}`}
          >
            <p className={styles.eyebrow}>Project history</p>
            <h2 className={styles.sectionTitle}>The lore so far</h2>
            <p className={styles.bodyText}>
              Born before the wave. Slept through the bear. Came back anyway.
            </p>

            <div className={styles.roadmapList}>
              {roadmap.map((item, i) => (
                <div key={item.title} className={styles.roadmapItem}>
                  <div className={styles.roadmapLeft}>
                    <div className={"raw" in item && item.raw ? styles.roadmapIconBoxRaw : styles.roadmapIconBox}>
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={96}
                        height={96}
                        style={"raw" in item && item.raw
                          ? { width: '100%', height: '100%', objectFit: 'contain' }
                          : { width: '100%', height: '100%', objectFit: 'cover' }
                        }
                      />
                    </div>
                    {i < roadmap.length - 1 && (
                      <div
                        className={styles.roadmapConnector}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className={styles.roadmapContent}>
                    <p className={styles.roadmapDate}>{item.date}</p>
                    <p className={styles.roadmapTitle}>{item.title}</p>
                    <p className={styles.roadmapNote}>{item.note}</p>
                    {"cta" in item && item.cta && (
                      <a
                        href={item.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.roadmapCta}
                      >
                        {item.cta.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PEPE AGENT ── */}
          <section id="agents" className={styles.section}>
            <p className={styles.eyebrow}>Live now</p>
            <h2 className={styles.sectionTitle}>Pepe Agent</h2>
            <p className={styles.bodyText}>
              Already running in the Telegram group. Its purpose is simple: help the community grow,
              support the ecosystem, and bring real value to holders. Not a gimmick. A working part of the project.
            </p>

            <div className={styles.agentLiveGrid}>
              {/* Main card */}
              <div className={`${styles.agentCard} ${styles.agentCardFeatured}`}>
                <span className={styles.agentDefaultBadge}>LIVE</span>
                <Image
                  src={`${bp}/images/pepe_claw.png`}
                  alt="Pepe Agent"
                  width={96}
                  height={96}
                />
                <p className={styles.agentName}>Pepe Agent</p>
                <p className={styles.agentTagline}>Cloud entity · OpenClaw</p>
                <p className={styles.agentDesc}>
                  Awake 24/7. Helps holders, grows the community, and works to make
                  holding PEPE worth more than the price. Posts its own updates on the portfolio.
                </p>
                <div className={styles.agentLiveActions}>
                  <a
                    href="https://t.me/OgPeperc20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.agentLiveBtn}
                  >
                    Talk to it →
                  </a>
                  <a
                    href="https://ogpepebot.github.io/ogpepebot/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.agentPortfolioBtn}
                  >
                    View portfolio →
                  </a>
                </div>
              </div>

              {/* Capability cards */}
              <div className={styles.agentCapGrid}>
                <div className={styles.agentCapCard}>
                  <Image src={`${bp}/images/token/pepe.png`} alt="" width={40} height={40} />
                  <div>
                    <p className={styles.agentCapTitle}>Community</p>
                    <p className={styles.agentCapBody}>Answers questions, greets holders, keeps the swamp alive. Open to everyone in Telegram.</p>
                  </div>
                </div>
                <div className={styles.agentCapCard}>
                  <Image src={`${bp}/images/pepe_builder.png`} alt="" width={40} height={40} />
                  <div>
                    <p className={styles.agentCapTitle}>Builder</p>
                    <p className={styles.agentCapBody}>Debugs, explains contracts, ships things. Documents its own work on the portfolio.</p>
                  </div>
                </div>
                <div className={styles.agentCapCard}>
                  <Image src={`${bp}/images/pepe_wallet.png`} alt="" width={40} height={40} />
                  <div>
                    <p className={styles.agentCapTitle}>Wallet</p>
                    <p className={styles.agentCapBody}>Has its own wallet. Receives, tracks, and will distribute on-chain.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Frog Manifesto */}
            <div className={styles.manifestoInline} style={{ marginTop: '2.5rem' }}>
              <div className={styles.manifestoInlineHeader}>
                <Image
                  src={`${bp}/logo100.png`}
                  alt="OG Pepe"
                  width={32}
                  height={32}
                  className={styles.manifestoInlineLogo}
                />
                <div>
                  <p className={styles.eyebrow}>Agent manifesto</p>
                  <h3 className={styles.manifestoInlineTitle}>
                    Generate value. Return it to the swamp.
                  </h3>
                </div>
              </div>
              <ul className={styles.manifestoInlineList}>
                <li>The agent covers its own running costs. It is self-sustaining.</li>
                <li>Surplus goes back to holders. Buybacks, rewards, whatever the community decides.</li>
                <li>The community talks to the agent. The agent listens. Together they decide what happens next.</li>
              </ul>
            </div>
          </section>

          {/* ── HOW TO BUY ── */}
          <section id="how-to-buy" className={styles.section}>
            <p className={styles.eyebrow}>Step by step</p>
            <h2 className={styles.sectionTitle}>
              3 steps. Even a frog can do it.
            </h2>

            <div className={styles.buyGrid}>
              {buySteps.map((step, i) => (
                <div key={step.title} className={styles.buyCard}>
                  <span className={styles.stepNumber}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                  {step.href && (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.stepLink}
                    >
                      Open Uniswap →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── COMING SOON ── */}
          <div className={styles.farmTeaser}>
            <div className={styles.farmGlow} aria-hidden="true" />
            <div className={styles.farmTeaserInner}>
              <div className={styles.farmTeaserText}>
                <p className={styles.eyebrow}>Coming soon</p>
                <h3 className={styles.farmTitle}>
                  Base Expansion + Animated 3D Pepe with Voice Chat
                </h3>
                <p className={styles.farmBody}>
                  PEPE goes multichain. Animated 3D Pepe with voice chat.
                </p>
                <p className={styles.farmBody} style={{ marginTop: '0.75rem' }}>
                  The roadmap is open. Pepe Agent can build almost anything. Propose ideas in Telegram and the community decides what comes next.
                </p>
              </div>

              <div className={styles.farmBadges}>
                <span className={styles.farmBadge}>Base Expansion</span>
                <span className={styles.farmBadgeSep}>+</span>
                <span className={styles.farmBadge}>3D Pepe</span>
                <span className={styles.farmBadgeSep}>+</span>
                <span className={styles.farmBadge}>Voice Chat</span>
                <span className={styles.farmBadgeSep}>+</span>
                <span className={styles.farmBadgeComing}>Coming soon</span>
              </div>
            </div>
          </div>


          {/* ── COMMUNITY ── */}
          <section id="community" className={styles.section}>
            <p className={styles.eyebrow}>Join us</p>
            <h2 className={styles.sectionTitle}>Community</h2>
            <p className={styles.bodyText}>
              No marketing team. Just the community. And some agents.
            </p>

            <div className={styles.socialsGrid}>
              {socials.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialCard}
                  aria-label={s.alt}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={36}
                    height={36}
                    className={styles.socialIcon}
                  />
                  <span className={styles.socialLabel}>{s.alt}</span>
                </a>
              ))}
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerBrand}>
              <Image src={`${bp}/logo.png`} alt="OG Pepe" width={32} height={32} />
              <div>
                <p className={styles.footerBrandName}>OG Pepe</p>
                <p className={styles.footerTagline}>
                  No filler. Just frog.
                </p>
              </div>
            </div>
            <div className={styles.footerContract}>
              <p className={styles.footerContractLabel}>Ethereum contract</p>
              <p className={styles.footerContractValue}>{CONTRACT}</p>
            </div>
          </div>
        </footer>
      </div>

    </>
  );
}
