"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";

import styles from "./home.module.css";
import useTheme from "@/hooks/useTheme";
import { Colors } from "@/utils/colors";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);




const stages = [
  {
    index: "01",
    title: "Trigger",
    lede: "Something happens somewhere in your stack.",
    body: "A form is submitted, a row changes in Airtable, a webhook fires from Stripe. ForgetzStudio listens for the event and hands it to the agent with full context, not just a payload.",
    tag: "on: form.submitted",
  },
  {
    index: "02",
    title: "Agent",
    lede: "It reads the situation before it acts.",
    body: "The agent decides what the event actually calls for. No fixed if/then tree to maintain — it reasons over the data, your instructions, and what happened last time.",
    tag: "reasoning: gpt-oss-120b",
  },
  {
    index: "03",
    title: "Tools",
    lede: "It reaches into the apps you've connected.",
    body: "Slack, Notion, Linear, your own internal API — each one exposed to the agent as a callable tool with a plain description, not a wall of config.",
    tag: "tool: slack.send_message",
  },
  {
    index: "04",
    title: "Guardrails",
    lede: "It asks before anything risky ships.",
    body: "Refunds, deletions, anything above a threshold you set — routed to a human for one tap of approval. The agent waits, it doesn't guess.",
    tag: "require_approval: true",
  },
  {
    index: "05",
    title: "Memory",
    lede: "It's sharper the next time it runs.",
    body: "Outcomes get written back into the agent's memory, so a correction you make today changes how it handles the same situation next week.",
    tag: "memory.write(outcome)",
  },
];

const PEEK = 42;
const SCALE_STEP = 0.045;

export default function Home() {
  const stackRef = useRef<HTMLElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter()
  const { isDark } = useTheme()
  const theme = isDark ? "text-white" : "text-black"
  console.log(isDark)

  const goToDashboard = () => {
    router.replace("/home")
  }



  useEffect(() => {
    if (!heroRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const root = heroRef.current;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-node]")
    );
    const lines = Array.from(
      root.querySelectorAll<SVGPathElement>("[data-line]")
    );
    const packets = Array.from(
      root.querySelectorAll<SVGCircleElement>("[data-packet]")
    );

    if (reduceMotion) {
      gsap.set(nodes, { opacity: 1, y: 0, scale: 1 });
      gsap.set(lines, { opacity: 1 });
      gsap.set(packets, { opacity: 0 });
      return;
    }

    lines.forEach((line) => {
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(nodes[0], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" })
      .to(lines[0], { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "-=0.1")
      .to(nodes[1], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, "-=0.15")
      .to([lines[1], lines[2]], { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "-=0.1")
      .to([nodes[2], nodes[3]], { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }, "-=0.15")
      .add(() => {
        packets.forEach((packet, i) => {
          const path = lines[i % lines.length];
          if (!path) return;

          gsap.set(packet, { opacity: 0 });

          gsap.to(packet, {
            opacity: 1,
            duration: 0.2,
            repeat: -1,
            repeatDelay: 1.6,
            delay: i * 0.9,
            onRepeat: () => gsap.set(packet, { opacity: 1 }),
          });

          gsap.to(packet, {
            motionPath: {
              path,
              align: path,
              alignOrigin: [0.5, 0.5],
            },
            duration: 1.4,
            repeat: -1,
            repeatDelay: 1.6,
            delay: i * 0.9,
            ease: "power1.inOut",
            onRepeat: () => gsap.set(packet, { opacity: 1 }),
            onComplete: () => gsap.set(packet, { opacity: 0 }),
          });
        });
      });

    return () => {
      tl.kill();
    };
  }, []);


  useEffect(() => {
    if (!stackRef.current || !deckRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const stack = stackRef.current;
    const deck = deckRef.current;

    const cardElements = Array.from(
      deck.querySelectorAll<HTMLElement>("[data-stack-card]")
    );

    if (reduceMotion) {
      gsap.set(cardElements, { clearProps: "all" });
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const stackPose = (index: number) => ({
      y: index * PEEK,
      scale: 1 - index * SCALE_STEP,
    });

    const handleLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleLenisScroll);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    cardElements.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cardElements.length - index,
        y: window.innerHeight * 0.72 + index * PEEK,
        scale: stackPose(index).scale * 0.9,
        rotate: 0,
        transformOrigin: "50% 0%",
      });
    });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: "top top",
          end: () => `+=${cardElements.length * window.innerHeight}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      cardElements.forEach((card, index) => {
        timeline.to(
          card,
          { ...stackPose(index), ease: "power3.out", duration: 1.35 },
          index * 0.06
        );
      });

      timeline.to({}, { duration: 0.35 });

      const flyAt = timeline.duration();
      const flyingCards = cardElements.slice(0, -1);

      flyingCards.forEach((card, index) => {
        const time = flyAt + index;
        const behind = cardElements.slice(index + 1);

        timeline.to(
          card,
          {
            y: () => -window.innerHeight * 1.15,
            rotate: -25,
            scale: 0.94,
            ease: "none",
            duration: 1,
          },
          time
        );

        timeline.to(
          behind,
          {
            y: (behindIndex) => stackPose(index + 1 + behindIndex).y,
            scale: (behindIndex) => stackPose(index + 1 + behindIndex).scale,
            ease: "none",
            duration: 1,
          },
          time
        );
      });

      timeline.to({}, { duration: 0.4 });
    }, stack);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      lenis.off("scroll", handleLenisScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      {/* =================================================
          NAV
      ================================================= */}
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#top" className={styles.navMark}>
            Forgetz<span>Studio</span>
          </a>

          <nav className={styles.navLinks} aria-label="Primary">
            <a href="#pipeline">Pipeline</a>
            <a href="#configure">Config</a>
          </nav>

          <button
            onClick={goToDashboard}
            className={cn(
              "neu-button",
              "active:neu-button-active",

              // responsive size
              "w-full",
              "px-1 py-1",
              "text-sm",

              // desktop
              "sm:w-auto",
              "sm:px-5 sm:py-2",
              "sm:text-base"
            )}
          >
            Start Build
          </button>

        </div>
      </header>

      {/* =================================================
          HERO
      ================================================= */}
      <section className={styles.hero} id="top" aria-label="Intro">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.heroStatus}>
              <span className={styles.heroDot} />
              Agent runtime online
            </div>

            <h1 className={`${styles.heroTitle} ${theme}`}>
              Automations that make their own decisions.
            </h1>

            <p className={styles.heroBody}>
              ForgetzStudio connects the tools you already run and lets an
              agent decide what happens next. No brittle if/then chains to
              babysit — just a graph that reasons, asks when it's unsure,
              and gets better every time it runs.
            </p>

            <div className={styles.heroActions}>
              <button  onClick={goToDashboard} className={styles.btnPrimary}>
                Build an agent
              </button>
              <a href="#pipeline" className={styles.btnGhost}>
                See how it runs
              </a>
            </div>
          </div>

          <div className={styles.heroDiagram} ref={heroRef}>
            <svg
              className={styles.diagramSvg}
              viewBox="0 0 800 600"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                data-line
                className={styles.diagramLine}
                d="M240,304 C280,304 260,260 300,260"
                fill="none"
              />
              <path
                data-line
                className={styles.diagramLine}
                d="M500,260 C540,260 520,180 560,180"
                fill="none"
              />
              <path
                data-line
                className={styles.diagramLine}
                d="M500,260 C540,260 520,420 560,420"
                fill="none"
              />
              <circle data-packet r="4.5" className={styles.diagramPacket} />
              <circle data-packet r="4.5" className={styles.diagramPacket} />
            </svg>

            <div
              data-node
              className={`${styles.node} ${styles.nodeTrigger}`}
              style={{ left: "5%", top: "43.3%", width: "25%", height: "14.7%" }}
            >
              <span className={styles.nodeKicker}>trigger</span>
              <span className={styles.nodeLabel}>Form submitted</span>
            </div>

            <div
              data-node
              className={`${styles.node} ${styles.nodeAgent}`}
              style={{ left: "37.5%", top: "36%", width: "25%", height: "14.7%" }}
            >
              <span className={styles.nodeKicker}>agent</span>
              <span className={styles.nodeLabel}>Deciding next step</span>
              <span className={styles.nodePulse} aria-hidden="true" />
            </div>

            <div
              data-node
              className={`${styles.node} ${styles.nodeAction}`}
              style={{ left: "70%", top: "23.3%", width: "25%", height: "13.3%" }}
            >
              <span className={styles.nodeKicker}>action</span>
              <span className={styles.nodeLabel}>Message #support</span>
            </div>

            <div
              data-node
              className={`${styles.node} ${styles.nodeAction}`}
              style={{ left: "70%", top: "63.3%", width: "25%", height: "13.3%" }}
            >
              <span className={styles.nodeKicker}>action</span>
              <span className={styles.nodeLabel}>Create Linear ticket</span>
            </div>
          </div>
        </div>

      </section>

      {/* =================================================
          PIPELINE STACK
      ================================================= */}
      <section
        ref={stackRef}
        className={styles.stack}
        id="pipeline"
        aria-label="How a run works"
      >
        <div className={styles.stackHeader}>
          <h2>What happens on every run</h2>
        </div>

        <div className={styles.stackStage}>
          <div ref={deckRef} className={styles.stackDeck}>
            {stages.map((stage) => (
              <article
                key={stage.index}
                data-stack-card
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{stage.title}</h3>
                    <span className={styles.cardIndex}>{stage.index}</span>
                  </div>

                  <p className={styles.cardLede}>{stage.lede}</p>
                  <p className={styles.cardBody}>{stage.body}</p>

                  <code className={styles.cardTag}>{stage.tag}</code>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          CONFIG PREVIEW
      ================================================= */}
      <section className={styles.config} id="configure" aria-label="Configuration">
        <div className={styles.configInner}>
          <div className={styles.configCopy}>
            <h2 className={styles.configTitle}>Every node is plain config.</h2>
            <p className={styles.configBody}>
              No hidden state, no proprietary DSL. An agent is a file you can
              read, diff, and put in version control next to the rest of your
              codebase.
            </p>
            <a href="#top" className={styles.btnPrimary}>
              Start building
            </a>
          </div>

          <pre className={styles.codeBlock}>
            <code>
              {`agent: support-triage
on:
  event: form.submitted
  source: intercom

reasoning:
  model: gpt-oss-120b
  instructions: >
    Triage the ticket. Route billing
    issues to #billing, bugs to Linear.

tools:
  - slack.send_message
  - linear.create_issue

guardrails:
  require_approval: refund_amount > 50`}
            </code>
          </pre>
        </div>
      </section>

      {/* =================================================
          OUTRO
      ================================================= */}
      <footer className={styles.outro} aria-label="Get started">
        <div className={styles.outroInner}>
          <p className={styles.outroLabel}>ForgetzStudio</p>
          <h2 className={styles.outroTitle}>Let it run.</h2>
          <p className={styles.outroBody}>
            Connect a tool, describe the job, and give it a trigger.
            The agent takes it from there.
          </p>
          <a href="#configure" className={styles.btnPrimary}>
            Build your first agent
          </a>

          <div className={styles.outroFoot}>
            <span>© {new Date().getFullYear()} ForgetzStudio</span>
            <div className={styles.outroLinks}>
              <a href="#pipeline">Pipeline</a>
              <a href="#configure">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}