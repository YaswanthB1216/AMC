"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import kaaraLogo from "../kaara_logo.png"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Upload", href: "/upload" },
    { name: "Dashboard", href: "/dashboard" },
    // { name: "History", href: "/history" },
  ]

  return (
    <div className="layout">
      <header className="header">
        <div className="header__container">
          <div className="header__brand">
            <Link href="/" className="header__brand-link" style={{ textDecoration: 'none' }}>
              <div className="header__logo-amc" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
                  <Image src={kaaraLogo} alt="Kaara Logo" width={52} height={32} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                {/* <span className="header__brand-text" style={{ fontWeight: 700, fontSize: '1.0rem', letterSpacing: '0.05em', color: 'var(--cds-text-primary)', lineHeight: 1 }}>AMC</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 400, fontSize: '0.4rem', color: 'var(--cds-text-secondary)' }}>
                  by
                </span> */}
              </div>
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {navigation.map((item) => (
                <li key={item.name} className="header__nav-item">
                  <Link
                    href={item.href}
                    className={`header__nav-link ${pathname === item.href ? "header__nav-link--active" : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className="header__menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="header__mobile-menu">
            <nav className="header__mobile-nav">
              <ul className="header__mobile-nav-list">
                {navigation.map((item) => (
                  <li key={item.name} className="header__mobile-nav-item">
                    <Link
                      href={item.href}
                      className={`header__mobile-nav-link ${pathname === item.href ? "header__mobile-nav-link--active" : ""}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__section">
              <h3 className="footer__title">MF Compliance Solution</h3>
              <p className="footer__text">Ensuring your mutual fund documents comply with SEBI guidelines.</p>
            </div>
            <div className="footer__section">
              <h4 className="footer__subtitle">Resources</h4>
              <ul className="footer__links">
                <li>
                  <a href="#" className="footer__link">
                    SEBI Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__section">
              <h4 className="footer__subtitle">Contact</h4>
              <ul className="footer__links">
                <li>
                  <a href="#" className="footer__link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="footer__link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">© 2024 MF Compliance Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>

<style jsx>{`
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background-color: var(--cds-background);
    border-bottom: 1px solid var(--cds-border-subtle-01);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header__container {
    max-width: 1584px;
    margin: 0 auto;
    padding: 0 var(--cds-spacing-05);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 4rem;
    gap: 4rem;
  }

  .header__brand {
    display: flex;
    align-items: center;
  }

  .header__brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--cds-text-primary);
  }

  .header__logo {
    margin-right: var(--cds-spacing-03);
  }

  .header__brand-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--cds-text-primary);
  }

  .header__nav {
    display: none;
  }


  .header__nav-list {
    display: flex;
    list-style: none;
    gap: var(--cds-spacing-06);
  }

  .header__nav-link {
    text-decoration: none;
    color: black;
    font-weight: 400;
    padding: var(--cds-spacing-03) var(--cds-spacing-04);
    border-radius: 4px;
    transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
    position:relative;
    display:inline-block;
  }

  .header__nav-link:not(:last-child)::after {
    content: "|";
    margin-left: 1rem;
    color: #6b7280;
    position:absolute;
    display:inline;
  }

  .header__nav-link:hover {
    background-color: var(--cds-background-hover);
    color: var(--cds-text-primary);
  }

  .header__nav-link--active {
    background-color: var(--cds-blue-60);
    color: var(--cds-text-on-color);
  }

  .header__menu-button {
    display: block;
    background: none;
    border: none;
    color: var(--cds-text-primary);
    cursor: pointer;
    padding: var(--cds-spacing-02);
  }

  .header__mobile-menu {
    background-color: var(--cds-background);
    border-top: 1px solid var(--cds-border-subtle-01);
  }

  .header__mobile-nav-list {
    list-style: none;
    padding: var(--cds-spacing-04);
  }

  .header__mobile-nav-item {
    margin-bottom: var(--cds-spacing-02);
  }

  .header__mobile-nav-link {
    display: block;
    text-decoration: none;
    color: var(--cds-text-secondary);
    padding: var(--cds-spacing-03) var(--cds-spacing-04);
    border-radius: 4px;
    transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .header__mobile-nav-link:not(:last-child)::after {
    content: "|";
    margin-left: var(--cds-spacing-04);
    color: var(--cds-text-secondary);
  }

  .header__mobile-nav-link:hover {
    background-color: var(--cds-background-hover);
    color: var(--cds-text-primary);
  }

  .header__mobile-nav-link--active {
    background-color: var(--cds-blue-60);
    color: var(--cds-text-on-color);
  }

  .main {
    flex: 1;
  }

  .footer {
    background-color: var(--cds-layer-01);
    border-top: 1px solid var(--cds-border-subtle-01);
    margin-top: auto;
  }

  .footer__container {
    max-width: 1584px;
    margin: 0 auto;
    padding: var(--cds-spacing-07) var(--cds-spacing-05);
  }

  .footer__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--cds-spacing-07);
    margin-bottom: var(--cds-spacing-07);
  }

  .footer__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--cds-spacing-04);
    color: var(--cds-text-primary);
  }

  .footer__subtitle {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: var(--cds-spacing-04);
    color: var(--cds-text-primary);
  }

  .footer__text {
    color: var(--cds-text-secondary);
    line-height: 1.5;
  }

  .footer__links {
    list-style: none;
  }

  .footer__links li {
    margin-bottom: var(--cds-spacing-02);
  }

  .footer__link {
    color: var(--cds-text-secondary);
    text-decoration: none;
    transition: color 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .footer__link:hover {
    color: var(--cds-blue-60);
  }

  .footer__bottom {
    border-top: 1px solid var(--cds-border-subtle-01);
    padding-top: var(--cds-spacing-05);
  }

  .footer__copyright {
    color: var(--cds-text-secondary);
    font-size: 0.875rem;
    text-align: center;
  }

  @media (min-width: 768px) {
    .header__nav {
      display: block;
    }

    .header__menu-button {
      display: none;
    }
  }
`}</style>
    </div>
  )
}
