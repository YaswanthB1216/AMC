"use client"

import { useState } from "react"
import Layout from "../../components/layout"

interface Recommendation {
  id: string
  violationId: string
  type: "critical" | "minor" | "warning"
  title: string
  currentText: string
  recommendedText: string
  explanation: string
  sebiReference: string
  templateAvailable: boolean
}

export default function RecommendationsPage() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const recommendations: Recommendation[] = [
    {
      id: "1",
      violationId: "1",
      type: "critical",
      title: "Add Mandatory Risk Disclosure Statement",
      currentText: "Investment in mutual funds is subject to market risks.",
      recommendedText:
        "Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future results. Please consider your specific investment requirements before choosing a fund, or designing a portfolio that suits your needs.",
      explanation:
        "SEBI requires a comprehensive risk disclosure statement that clearly communicates the risks associated with mutual fund investments. The current statement is too brief and does not meet regulatory requirements.",
      sebiReference: "SEBI (Mutual Funds) Regulations, 1996 - Regulation 59",
      templateAvailable: true,
    },
    {
      id: "2",
      violationId: "2",
      type: "critical",
      title: "Correct Expense Ratio Disclosure",
      currentText: "Total Expense Ratio: 2.75% per annum",
      recommendedText: "Total Expense Ratio: 2.25% per annum (within SEBI prescribed limits)",
      explanation:
        "The disclosed expense ratio exceeds SEBI limits for equity funds (2.25% for regular plans). This needs to be corrected to ensure compliance.",
      sebiReference: "SEBI (Mutual Funds) Regulations, 1996 - Regulation 52",
      templateAvailable: false,
    },
    {
      id: "3",
      violationId: "3",
      type: "minor",
      title: "Improve Disclaimer Font Size",
      currentText: "Current font size: 8pt",
      recommendedText: "Recommended font size: 10pt or larger",
      explanation:
        "Disclaimer text should be easily readable. SEBI guidelines recommend a minimum font size of 10pt for important disclosures.",
      sebiReference: "SEBI Circular No. MFD/CIR/4/2013",
      templateAvailable: false,
    },
  ]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(id)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadTemplate = (recommendationId: string) => {
    // Simulate template download
    const element = document.createElement("a")
    const file = new Blob(["Template content for recommendation " + recommendationId], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `template_${recommendationId}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Layout>
      <div className="recommendations">
        <div className="recommendations__container">
          <div className="recommendations__header">
            <h1 className="cds-heading-05">Corrective Recommendations</h1>
            <p className="cds-body-02 recommendations__subtitle">
              Detailed guidance to fix compliance issues with side-by-side comparisons and actionable steps
            </p>
          </div>

          <div className="recommendations__content">
            <div className="recommendations-list">
              <h2 className="section-title">Compliance Issues & Solutions</h2>
              {recommendations.map((recommendation) => (
                <div
                  key={recommendation.id}
                  className={`recommendation-card recommendation-card--${recommendation.type}`}
                >
                  <div className="recommendation-card__header">
                    <div className="recommendation-card__title-section">
                      <span className={`priority-badge priority-badge--${recommendation.type}`}>
                        {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
                      </span>
                      <h3 className="recommendation-card__title">{recommendation.title}</h3>
                    </div>
                    <button
                      className="expand-btn"
                      onClick={() =>
                        setSelectedRecommendation(
                          selectedRecommendation === recommendation.id ? null : recommendation.id,
                        )
                      }
                      aria-label={selectedRecommendation === recommendation.id ? "Collapse" : "Expand"}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        style={{
                          transform: selectedRecommendation === recommendation.id ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </button>
                  </div>

                  {selectedRecommendation === recommendation.id && (
                    <div className="recommendation-card__content">
                      <div className="recommendation-explanation">
                        <h4 className="recommendation-explanation__title">Issue Explanation</h4>
                        <p className="recommendation-explanation__text">{recommendation.explanation}</p>
                        <div className="recommendation-explanation__reference">
                          <strong>SEBI Reference:</strong> {recommendation.sebiReference}
                        </div>
                      </div>

                      <div className="comparison-section">
                        <div className="comparison-panel comparison-panel--current">
                          <div className="comparison-panel__header">
                            <h4 className="comparison-panel__title">Current Text</h4>
                            <span className="comparison-panel__status comparison-panel__status--error">
                              Non-Compliant
                            </span>
                          </div>
                          <div className="comparison-panel__content">
                            <pre className="comparison-text">{recommendation.currentText}</pre>
                          </div>
                        </div>

                        <div className="comparison-panel comparison-panel--recommended">
                          <div className="comparison-panel__header">
                            <h4 className="comparison-panel__title">Recommended Text</h4>
                            <span className="comparison-panel__status comparison-panel__status--success">
                              Compliant
                            </span>
                          </div>
                          <div className="comparison-panel__content">
                            <pre className="comparison-text">{recommendation.recommendedText}</pre>
                            <button
                              className="copy-btn"
                              onClick={() => copyToClipboard(recommendation.recommendedText, recommendation.id)}
                              title="Copy to clipboard"
                            >
                              {copiedText === recommendation.id ? (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M13.5 3.5L6 11l-3.5-3.5L1 9l5 5 9-9-1.5-1.5z" />
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                  <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                                  <path d="M2 5a1 1 0 0 1 1-1h1v1H3v7h7v-1h1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="recommendation-actions">
                        <button className="cds-btn cds-btn--primary">Mark as Implemented</button>
                        {recommendation.templateAvailable && (
                          <button
                            className="cds-btn cds-btn--secondary"
                            onClick={() => downloadTemplate(recommendation.id)}
                          >
                            Download Template
                          </button>
                        )}
                        <button className="cds-btn cds-btn--ghost">View SEBI Guidelines</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="recommendations-sidebar">
              <div className="action-summary">
                <h3 className="action-summary__title">Action Summary</h3>
                <div className="action-summary__stats">
                  <div className="action-stat">
                    <span className="action-stat__number">2</span>
                    <span className="action-stat__label">Critical Issues</span>
                  </div>
                  <div className="action-stat">
                    <span className="action-stat__number">1</span>
                    <span className="action-stat__label">Minor Issues</span>
                  </div>
                  <div className="action-stat">
                    <span className="action-stat__number">0</span>
                    <span className="action-stat__label">Completed</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3 className="quick-actions__title">Quick Actions</h3>
                <div className="quick-actions__buttons">
                  <button className="cds-btn cds-btn--primary quick-action-btn">Download All Templates</button>
                  <button className="cds-btn cds-btn--secondary quick-action-btn">Export Action Plan</button>
                  <button className="cds-btn cds-btn--ghost quick-action-btn">Print Recommendations</button>
                </div>
              </div>

              <div className="compliance-tips">
                <h3 className="compliance-tips__title">Compliance Tips</h3>
                <ul className="compliance-tips__list">
                  <li>Always review SEBI circulars for latest updates</li>
                  <li>Maintain consistent formatting across documents</li>
                  <li>Use clear, jargon-free language for disclosures</li>
                  <li>Ensure all mandatory sections are included</li>
                  <li>Regular compliance audits prevent issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .recommendations {
          min-height: 80vh;
        }

        .recommendations__container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .recommendations__header {
          text-align: center;
          margin-bottom: var(--cds-spacing-08);
        }

        .recommendations__subtitle {
          color: var(--cds-text-secondary);
          max-width: 700px;
          margin: var(--cds-spacing-04) auto 0;
        }

        .recommendations__content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--cds-spacing-07);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-06);
          color: var(--cds-text-primary);
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: var(--cds-spacing-05);
        }

        .recommendation-card {
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          border-left: 4px solid;
          overflow: hidden;
        }

        .recommendation-card--critical {
          border-left-color: var(--cds-support-error);
        }

        .recommendation-card--minor {
          border-left-color: var(--cds-support-warning);
        }

        .recommendation-card--warning {
          border-left-color: var(--cds-support-info);
        }

        .recommendation-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--cds-spacing-05);
          cursor: pointer;
          transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .recommendation-card__header:hover {
          background-color: var(--cds-background-hover);
        }

        .recommendation-card__title-section {
          display: flex;
          align-items: center;
          gap: var(--cds-spacing-03);
        }

        .priority-badge {
          padding: var(--cds-spacing-01) var(--cds-spacing-03);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .priority-badge--critical {
          background-color: var(--cds-support-error);
          color: var(--cds-text-on-color);
        }

        .priority-badge--minor {
          background-color: var(--cds-support-warning);
          color: var(--cds-text-primary);
        }

        .priority-badge--warning {
          background-color: var(--cds-support-info);
          color: var(--cds-text-on-color);
        }

        .recommendation-card__title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--cds-text-primary);
        }

        .expand-btn {
          background: none;
          border: none;
          color: var(--cds-text-secondary);
          cursor: pointer;
          padding: var(--cds-spacing-02);
          border-radius: 4px;
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .expand-btn:hover {
          background-color: var(--cds-background-hover);
          color: var(--cds-text-primary);
        }

        .recommendation-card__content {
          padding: 0 var(--cds-spacing-05) var(--cds-spacing-05);
          border-top: 1px solid var(--cds-border-subtle-01);
        }

        .recommendation-explanation {
          margin-bottom: var(--cds-spacing-06);
          padding-top: var(--cds-spacing-05);
        }

        .recommendation-explanation__title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-03);
          color: var(--cds-text-primary);
        }

        .recommendation-explanation__text {
          color: var(--cds-text-secondary);
          line-height: 1.5;
          margin-bottom: var(--cds-spacing-03);
        }

        .recommendation-explanation__reference {
          font-size: 0.875rem;
          color: var(--cds-blue-60);
          font-style: italic;
        }

        .comparison-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--cds-spacing-05);
          margin-bottom: var(--cds-spacing-06);
        }

        .comparison-panel {
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          overflow: hidden;
        }

        .comparison-panel--current {
          border-left: 4px solid var(--cds-support-error);
        }

        .comparison-panel--recommended {
          border-left: 4px solid var(--cds-support-success);
        }

        .comparison-panel__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--cds-spacing-03) var(--cds-spacing-04);
          background-color: var(--cds-layer-01);
          border-bottom: 1px solid var(--cds-border-subtle-01);
        }

        .comparison-panel__title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--cds-text-primary);
        }

        .comparison-panel__status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: var(--cds-spacing-01) var(--cds-spacing-02);
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .comparison-panel__status--error {
          background-color: var(--cds-support-error);
          color: var(--cds-text-on-color);
        }

        .comparison-panel__status--success {
          background-color: var(--cds-support-success);
          color: var(--cds-text-on-color);
        }

        .comparison-panel__content {
          position: relative;
          padding: var(--cds-spacing-04);
          background-color: var(--cds-background);
        }

        .comparison-text {
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.4;
          color: var(--cds-text-primary);
          white-space: pre-wrap;
          word-wrap: break-word;
          margin: 0;
        }

        .copy-btn {
          position: absolute;
          top: var(--cds-spacing-02);
          right: var(--cds-spacing-02);
          background: var(--cds-background-hover);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 4px;
          padding: var(--cds-spacing-02);
          cursor: pointer;
          color: var(--cds-text-secondary);
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .copy-btn:hover {
          background-color: var(--cds-blue-60);
          color: var(--cds-text-on-color);
          border-color: var(--cds-blue-60);
        }

        .recommendation-actions {
          display: flex;
          gap: var(--cds-spacing-03);
          flex-wrap: wrap;
        }

        .recommendations-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--cds-spacing-06);
        }

        .action-summary,
        .quick-actions,
        .compliance-tips {
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          padding: var(--cds-spacing-05);
        }

        .action-summary__title,
        .quick-actions__title,
        .compliance-tips__title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-04);
          color: var(--cds-text-primary);
        }

        .action-summary__stats {
          display: flex;
          flex-direction: column;
          gap: var(--cds-spacing-03);
        }

        .action-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--cds-spacing-02) 0;
        }

        .action-stat__number {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--cds-blue-60);
        }

        .action-stat__label {
          color: var(--cds-text-secondary);
          font-size: 0.875rem;
        }

        .quick-actions__buttons {
          display: flex;
          flex-direction: column;
          gap: var(--cds-spacing-03);
        }

        .quick-action-btn {
          width: 100%;
          justify-content: center;
        }

        .compliance-tips__list {
          list-style: none;
          padding: 0;
        }

        .compliance-tips__list li {
          padding: var(--cds-spacing-02) 0;
          color: var(--cds-text-secondary);
          font-size: 0.875rem;
          line-height: 1.4;
          position: relative;
          padding-left: var(--cds-spacing-04);
        }

        .compliance-tips__list li::before {
          content: '•';
          color: var(--cds-blue-60);
          position: absolute;
          left: 0;
        }

        @media (max-width: 1024px) {
          .recommendations__content {
            grid-template-columns: 1fr;
          }

          .comparison-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .recommendation-card__header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--cds-spacing-03);
          }

          .recommendation-actions {
            flex-direction: column;
          }

          .action-summary__stats {
            flex-direction: row;
            justify-content: space-around;
          }

          .action-stat {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  )
}
