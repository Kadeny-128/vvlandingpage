import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Victory Velocity",
  description:
    "Kaden Yeung is the founder of Victory Velocity, a Canadian AI visibility and advertising agency helping brands get cited in AI-generated answers.",
  alternates: { canonical: "https://www.victoryvelocity.ca/about" },
  openGraph: {
    title: "About — Victory Velocity",
    description:
      "Kaden Yeung is the founder of Victory Velocity, helping brands get cited in AI answers.",
    url: "https://www.victoryvelocity.ca/about",
    siteName: "Victory Velocity",
  },
};

export default function About() {
  return (
    <>
      <nav className="blog-nav">
        <Link href="/" className="mark">Victory&nbsp;Velocity</Link>
        <div className="blog-nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/#process">Approach</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
        <Link href="/#contact" className="cta">Work With Us</Link>
      </nav>

      <main className="about-page">
        <div className="wrap">
          <div className="about-split">

            <div className="about-left">
              <h1 className="about-name">Kaden Yeung</h1>
              <p className="about-role">Founder, Victory Velocity</p>
              <div className="about-body">
                <p>
                  I&rsquo;m 18, based in Vancouver, and finishing high school before heading to
                  Queen&rsquo;s University for engineering in the fall.
                </p>
                <p>
                  I got into this space through TKS, a program for young people working on
                  high-impact problems, and an internship at Singularity Health, an AI healthcare
                  startup. Most of what I know about building I learned by watching people figure
                  things out in real time and replicating it myself.
                </p>
                <p>
                  Victory Velocity is my attempt to get ahead of a shift I think is genuinely
                  significant. I could be wrong about the timeline. I don&rsquo;t think I&rsquo;m
                  wrong about the direction.
                </p>
              </div>
              <div className="about-links">
                <a
                  href="https://www.linkedin.com/in/kaden-yeung/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://kadeny.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Substack →
                </a>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <Image
                  src="/kaden.jpg"
                  alt="Kaden Yeung"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "var(--faint)", fontStyle: "italic", margin: "0 0 8px", lineHeight: 1.5, fontFamily: "var(--serif)", fontSize: "15px" }}>
                AI visibility &amp; advertising for brands that intend to be cited.
              </p>
              <span style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--faint)" }}>© 2026 Victory Velocity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
