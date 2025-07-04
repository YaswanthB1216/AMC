"use client"

import Link from "next/link"
import Layout from "../components/layout"
import Image from "next/image";
import HEROIMAGE from "../hero-image.png"
import KaaraLogo from "../kaara_logo.png"

export default function HomePage() {
  const features = [
    {
      title: "Document Upload",
      description: "Secure multi-file upload with drag-and-drop functionality for PDF documents.",
      icon: "📄",
    },
    {
      title: "SEBI Compliance Check",
      description: "Comprehensive analysis against SEBI guidelines with detailed violation reports.",
      icon: "✅",
    },
    {
      title: "Corrective Recommendations",
      description: "Actionable guidance with specific steps to fix compliance issues.",
      icon: "🔧",
    },
    {
      title: "Real-time Analysis",
      description: "Get instant feedback with processing status and completion estimates.",
      icon: "⚡",
    },
  ]

  const stats = [
    { label: "Documents Analyzed", value: "10,000+" },
    { label: "Compliance Rate", value: "95%" },
    { label: "Processing Time", value: "<5 min" },
    { label: "SEBI Guidelines", value: "100%" },
  ]

  return (
    <Layout>
      <div className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">Mutual Funds Catalog Compliance Solution</h1>
            <p className="hero__subtitle">
              Ensure your mutual fund documents comply with SEBI guidelines. Upload, analyze, and get actionable
              recommendations in minutes.
            </p>
            <div className="hero__actions">
              <Link href="/upload" className="cds-btn cds-btn--primary hero__cta" style={{ backgroundColor: 'var(--cds-text-primary)', color: 'white' }}>
                Start Analysis
              </Link>
              <Link href="/dashboard" className="cds-btn cds-btn--secondary" style={{ backgroundColor: 'var(--cds-text-primary)', color: 'white' }}>
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__chart">
              {/* <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: "60%" }}></div>
                <div className="chart-bar" style={{ height: "80%" }}></div>
                <div className="chart-bar" style={{ height: "45%" }}></div>
                <div className="chart-bar" style={{ height: "90%" }}></div>
                <div className="chart-bar" style={{ height: "70%" }}></div>
              </div> */}
            <Image
                src={HEROIMAGE} // Path relative to the `public` directory
                alt="Hero Logo"
                width={400} // Specify the width of the image
                height={300} // Specify the height of the image
                priority // Optional: prioritize loading for above-the-fold images
              />
            </div>
          </div>
        </div>
      </div>

      <section className="stats">
        <div className="stats__container">
          <div className="stats__grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats__item">
                <div className="stats__value">{stat.value}</div>
                <div className="stats__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <div className="features__header">
            <h2 className="features__title">Comprehensive Compliance Analysis</h2>
            <p className="features__subtitle">
              Our solution provides end-to-end compliance checking for mutual fund documents
            </p>
          </div>
          <div className="features__grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-card__icon">{feature.icon}</div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section__container">
          <div className="cta-section__content">
            <h2 className="cta-section__title">Ready to ensure compliance?</h2>
            <p className="cta-section__subtitle">
              Upload your mutual fund documents and get detailed compliance analysis in minutes.
            </p>
            <Link href="/upload" className="cds-btn cds-btn--primary cta-section__button">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background:#FFF5f5;
          color: #525252
          padding: var(--cds-spacing-10) 0;
        }

        .hero__container {
          max-width: 1584px;
          margin: 0 auto;
          padding: 10px 20px 10px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--cds-spacing-09);
          align-items: center;
        }

        .hero__title {
          font-size: 3rem;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: var(--cds-spacing-05);
        }

        .hero__subtitle {
          font-size: 1.25rem;
          line-height: 1.5;
          margin-bottom: var(--cds-spacing-07);
          opacity: 0.9;
        }

        .hero__actions {
          display: flex;
          gap: var(--cds-spacing-04);
          flex-wrap: wrap;
        }

        .hero__cta {
          background-color: var(--cds-text-on-color);
          color: var(--cds-blue-60);
        }

        .hero__cta:hover {
          background-color: var(--cds-background-hover);
        }

        .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero__chart {
          // background-color: rgba(255, 255, 255, 0.1);
          // border-radius: 8px;
          // padding: var(--cds-spacing-06);
          // backdrop-filter: blur(10px);
        }

        .chart-placeholder {
          display: flex;
          align-items: end;
          gap: var(--cds-spacing-03);
          height: 200px;
        }

        .chart-bar {
          width: 40px;
          background-color: red;
          border-radius: 4px 4px 0 0;
          opacity: 0.8;
        }

        .stats {
          background-color: var(--cds-layer-01);
          padding: var(--cds-spacing-08) 0;
        }

        .stats__container {
          max-width: 1584px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .stats__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--cds-spacing-06);
        }

        .stats__item {
          text-align: center;
        }

        .stats__value {
          font-size: 2.5rem;
          font-weight: 600;
          color:rgb(103, 240, 140);
          margin-bottom: var(--cds-spacing-02);
        }

        .stats__label {
          font-size: 1rem;
          color: var(--cds-text-secondary);
        }

        .features {
          padding: var(--cds-spacing-10) 0;
        }

        .features__container {
          max-width: 1584px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .features__header {
          text-align: center;
          margin-bottom: var(--cds-spacing-09);
        }

        .features__title {
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: var(--cds-spacing-04);
          color: var(--cds-text-primary);
        }

        .features__subtitle {
          font-size: 1.25rem;
          color: var(--cds-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--cds-spacing-06);
        }

        .feature-card {
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          padding: var(--cds-spacing-06);
          border-radius: 8px;
          text-align: center;
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .feature-card__icon {
          font-size: 3rem;
          margin-bottom: var(--cds-spacing-04);
        }

        .feature-card__title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-03);
          color: var(--cds-text-primary);
        }

        .feature-card__description {
          color: var(--cds-text-secondary);
          line-height: 1.5;
        }

        .cta-section {
          background-color: var(--cds-layer-01);
          padding: var(--cds-spacing-10) 0;
        }

        .cta-section__container {
          max-width: 1584px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .cta-section__content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-section__title {
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: var(--cds-spacing-04);
          color: var(--cds-text-primary);
        }

        .cta-section__subtitle {
          font-size: 1.25rem;
          color: var(--cds-text-secondary);
          margin-bottom: var(--cds-spacing-07);
        }

        .cta-section__button {
          font-size: 1.125rem;
          padding: var(--cds-spacing-04) var(--cds-spacing-07);
        }

        @media (max-width: 768px) {
          .hero__container {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero__title {
            font-size: 2rem;
          }

          .hero__subtitle {
            font-size: 1.125rem;
          }

          .features__title,
          .cta-section__title {
            font-size: 2rem;
          }

          .features__subtitle,
          .cta-section__subtitle {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </Layout>
  )
}
