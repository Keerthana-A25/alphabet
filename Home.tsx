import React from "react";
import "./App.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Alpha", href: "#alpha" },
  { label: "Beta", href: "#beta" },
  { label: "Gamma", href: "#gamma" },
  { label: "Purchase", href: "#purchase" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Lexend, Noto Sans, sans-serif",
        background: "var(--background-color, #020617)",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15,23,42,0.8)",
          borderBottom: "1px solid #475569",
          padding: "1rem 2.5rem",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              color: "#2563eb",
              width: 24,
              height: 24,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <svg fill="none" viewBox="0 0 48 48" width={24} height={24}>
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span
            style={{
              color: "#f8fafc",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.01em",
            }}
          >
            Alphabet
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: "#94a3b8",
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
                marginRight: 0,
                padding: "0 2px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/login"
            style={{
              minWidth: 100,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 8,
              padding: "0 20px",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.1s",
              boxShadow: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#3b82f6")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
          >
            Login
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            'linear-gradient(rgba(15,23,42,0.7) 0%, rgba(2,6,23,0.9) 100%), url("home-hero-background.png") center/cover no-repeat',
          textAlign: "center",
          padding: "64px 24px",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: 48,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Unlock Your Typing Superpower. Master the Keyboard.
          </h1>
          <p
            style={{
              marginTop: 24,
              color: "#cbd5e1",
              fontSize: 20,
              fontWeight: 300,
            }}
          >
            Keyboard course for all (students, professionals, institutions)
          </p>
          <a
            href="/edition"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
              height: 48,
              padding: "0 32px",
              background: "#2563eb",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 10,
              textDecoration: "none",
              transition: "background 0.2s, transform 0.1s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#3b82f6")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
          >
            Sign Up Now
          </a>
        </div>
      </section>

      {/* Alpha Section */}
      <section
        id="alpha"
        style={{ background: "#1e293b", padding: "64px 24px" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 32,
                marginBottom: 12,
              }}
            >
              Alpha Phase: The Foundation
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 32 }}>
              Master the alphabet with our comprehensive 40-lesson course. Build
              accuracy and familiarity with every key, setting the stage for
              lightning-fast typing.
            </p>
            <button
              style={{
                marginTop: 16,
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 8,
                padding: "10px 32px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.1s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#3b82f6")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
            >
              Try Alpha!
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg67OwhFg1hpCAVgbzptsxnv4NAWJFNavEX_Xe7K92ktXUaepO6bGqsbkC2jHRSq8JE0QhofMJyCMfmQfGOcecW3cXLjgBHzbbKK2uevxVOzWMYJfLWq9AdFrr0mWERcRWtA3CIg7yUYLAaNr2aLr-Qp5IVrluJP5mE8OdUW1OfWT_3TSb1ZLUQR-XDBGzXyYxbHMH3i_AE5-p6WlpH1wJ-G31V7Azuzd3Qe8363pV0gXu0LfyLUt1mx85q1Q9TY52386igD1SGNfT"
              alt="Alpha Phase Illustration"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 32px #0004",
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* Beta Section */}
      <section
        id="beta"
        style={{ background: "#0f172a", padding: "64px 24px" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div style={{ order: 2 }}>
            <h2
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 32,
                marginBottom: 12,
              }}
            >
              Beta Phase: Word Power
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 32 }}>
              Transition from individual letters to real words. This phase
              focuses on building muscle memory and improving your typing flow
              by practicing common word patterns.
            </p>
            <button
              style={{
                marginTop: 16,
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 8,
                padding: "10px 32px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.1s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#3b82f6")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
            >
              Try Beta!
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", order: 1 }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC47QTtPdazUXwtteUohzxvjCRpECVsQZ2Az9Rrvab5i9m_KHAcihpFzn_sVgt0YTAQcni5iOlKQ-PCPLxNO4yG0u_TCod6jC3T0WKm_Ig8jAfs2PTEoWhxUt5oi8RSqYtcoQcj1xHDLwzk_B2PtOKlBhjtLCJY_tPs5PvDiUnmu-TgDw_KrIMGNF7JNXXreOZcO9TADp-5FG5FxUdALKCzkQEjjH9eu4UIJGd2ecGP7IccFzaG7l12fIHz5JtvqIYraBV5J2yW16rw"
              alt="Beta Phase Illustration"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 32px #0004",
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* Gamma Section */}
      <section
        id="gamma"
        style={{ background: "#334155", padding: "64px 24px" }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 32,
                marginBottom: 12,
              }}
            >
              Gamma Phase: Sentence Mastery
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 32 }}>
              Elevate your skills by typing full sentences. This phase
              incorporates punctuation and grammar, preparing you for real-world
              typing tasks with speed and precision.
            </p>
            <button
              style={{
                marginTop: 16,
                background: "#2563eb",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 8,
                padding: "10px 32px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.1s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#3b82f6")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
            >
              Try Gamma!
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsRKlBJeJhWugEJ917LVdW1tDQ9gjqtDRrgKJmWO62HkzbqPFgb9xfyanKBfM6O3ROhTZQzH5RfDzDLZDHsI3flQCQMNT07sTTxhIGcdDdeo-1mjucOtNDK2mpoCJJ1St02l1MFx_dZsOkNbrfyujnOhhQnNb-eOSLrMES8YA7kaYffY8H6ixmMtCBgvvNo_bKN7Kk2YOmDf44m2KqsmWf08yQ0tQUbGoDPY5gbvV8Z9zo35IzeUI48gsIdz1iCbDk5ADR6xFXBr-_"
              alt="Gamma Phase Illustration"
              style={{
                borderRadius: 16,
                boxShadow: "0 8px 32px #0004",
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section
        id="purchase"
        style={{ background: "#020617", padding: "64px 24px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#f8fafc", fontWeight: 700, fontSize: 32 }}>
            Get Full Access
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 18,
              margin: "16px auto 0",
              maxWidth: 600,
            }}
          >
            Choose the plan that's right for you and unlock your full typing
            potential.
          </p>
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gap: 32,
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {/* Individual/Student */}
            <div
              style={{
                background: "#1e293b",
                border: "1px solid #475569",
                borderRadius: 16,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 4px 24px #0002",
              }}
            >
              <div style={{ color: "#2563eb", fontSize: 32 }}>
                <svg
                  fill="currentColor"
                  height="1em"
                  viewBox="0 0 256 256"
                  width="1em"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
              <h3 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 20 }}>
                Individual/Student
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 15 }}>
                Perfect for personal growth and academic success. Access all
                lessons and features with our affordable yearly subscription.
              </p>
              <button
                style={{
                  marginTop: "auto",
                  width: "100%",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 8,
                  padding: "10px 0",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#3b82f6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#2563eb")
                }
              >
                Buy Now
              </button>
            </div>
            {/* Bulk Licenses */}
            <div
              style={{
                background: "#1e293b",
                border: "1px solid #475569",
                borderRadius: 16,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 4px 24px #0002",
              }}
            >
              <div style={{ color: "#2563eb", fontSize: 32 }}>
                <svg
                  fill="currentColor"
                  height="1em"
                  viewBox="0 0 256 256"
                  width="1em"
                >
                  <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
                </svg>
              </div>
              <h3 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 20 }}>
                Bulk Licenses
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 15 }}>
                Ideal for teams and organizations of 10+ users. Equip your
                members with essential typing skills for enhanced productivity.
              </p>
              <button
                style={{
                  marginTop: "auto",
                  width: "100%",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 8,
                  padding: "10px 0",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#3b82f6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#2563eb")
                }
              >
                Contact for Pricing
              </button>
            </div>
            {/* Institutional Contracts */}
            <div
              style={{
                background: "#1e293b",
                border: "1px solid #475569",
                borderRadius: 16,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 4px 24px #0002",
              }}
            >
              <div style={{ color: "#2563eb", fontSize: 32 }}>
                <svg
                  fill="currentColor"
                  height="1em"
                  viewBox="0 0 256 256"
                  width="1em"
                >
                  <path d="M240,208H224V96a16,16,0,0,0-16-16H144V32a16,16,0,0,0-24.88-13.32L39.12,72A16,16,0,0,0,32,85.34V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM208,96V208H144V96ZM48,85.34,128,32V208H48ZM112,112v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm-32,0v16a8,8,0,0,1-16,0V112a8,8,0,1,1,16,0Zm0,56v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm32,0v16a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Z"></path>
                </svg>
              </div>
              <h3 style={{ color: "#f8fafc", fontWeight: 600, fontSize: 20 }}>
                Institutional Contracts
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 15 }}>
                Tailored solutions for schools and colleges. Includes an admin
                dashboard and progress tracking for effective learning
                management.
              </p>
              <button
                style={{
                  marginTop: "auto",
                  width: "100%",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 8,
                  padding: "10px 0",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#3b82f6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#2563eb")
                }
              >
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{ background: "#0f172a", padding: "64px 24px" }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              color: "#f8fafc",
              fontWeight: 700,
              fontSize: 32,
              textAlign: "center",
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 18,
              margin: "16px 0 0",
              textAlign: "center",
            }}
          >
            Have questions or need a custom solution? We're here to help.
          </p>
          <form
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  color: "#f8fafc",
                  fontSize: 15,
                  fontWeight: 500,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #475569",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 16,
                  padding: "12px",
                  outline: "none",
                  marginBottom: 0,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  color: "#f8fafc",
                  fontSize: 15,
                  fontWeight: 500,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #475569",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 16,
                  padding: "12px",
                  outline: "none",
                  marginBottom: 0,
                }}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                style={{
                  color: "#f8fafc",
                  fontSize: 15,
                  fontWeight: 500,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows={4}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  border: "1px solid #475569",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 16,
                  padding: "12px",
                  outline: "none",
                  marginBottom: 0,
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 8,
                  padding: "12px 32px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#3b82f6")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#2563eb")
                }
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1e293b", color: "#94a3b8", marginTop: 0 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: "#2563eb",
                  width: 20,
                  height: 20,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <svg fill="none" viewBox="0 0 48 48" width={20} height={20}>
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span style={{ color: "#f8fafc", fontWeight: 600, fontSize: 18 }}>
                Alphabet
              </span>
            </div>
            <nav
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <a
                href="#home"
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Home
              </a>
              <a
                href="#"
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                About
              </a>
              <a
                href="#"
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Terms
              </a>
              <a
                href="#"
                style={{
                  color: "#94a3b8",
                  fontSize: 15,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                Privacy
              </a>
            </nav>
          </div>
          <p
            style={{
              marginTop: 32,
              borderTop: "1px solid #334155",
              paddingTop: 32,
              color: "#64748b",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            © 2024 Alphabet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
