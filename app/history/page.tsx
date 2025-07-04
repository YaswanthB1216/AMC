"use client"

import { useState } from "react"
import Link from "next/link"
import Layout from "../../components/layout"

interface HistoryItem {
  id: string
  fileName: string
  uploadDate: string
  status: "completed" | "failed" | "processing"
  complianceScore: number
  criticalIssues: number
  minorIssues: number
  warnings: number
  processingTime: string
}

export default function HistoryPage() {
  const [sortBy, setSortBy] = useState<"date" | "score" | "name">("date")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "failed" | "processing">("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const historyData: HistoryItem[] = [
    {
      id: "1",
      fileName: "Mutual_Fund_Scheme_Document.pdf",
      uploadDate: "2024-01-15 14:30:00",
      status: "completed",
      complianceScore: 85,
      criticalIssues: 2,
      minorIssues: 5,
      warnings: 3,
      processingTime: "3m 45s",
    },
    {
      id: "2",
      fileName: "Annual_Report_2023.pdf",
      uploadDate: "2024-01-15 14:25:00",
      status: "completed",
      complianceScore: 92,
      criticalIssues: 0,
      minorIssues: 2,
      warnings: 1,
      processingTime: "2m 15s",
    },
    {
      id: "3",
      fileName: "Risk_Disclosure_Document.pdf",
      uploadDate: "2024-01-15 14:20:00",
      status: "completed",
      complianceScore: 78,
      criticalIssues: 3,
      minorIssues: 4,
      warnings: 2,
      processingTime: "4m 20s",
    },
    {
      id: "4",
      fileName: "Investment_Policy_Statement.pdf",
      uploadDate: "2024-01-14 16:45:00",
      status: "failed",
      complianceScore: 0,
      criticalIssues: 0,
      minorIssues: 0,
      warnings: 0,
      processingTime: "Failed",
    },
    {
      id: "5",
      fileName: "Fund_Factsheet_Q4_2023.pdf",
      uploadDate: "2024-01-14 15:30:00",
      status: "completed",
      complianceScore: 96,
      criticalIssues: 0,
      minorIssues: 1,
      warnings: 0,
      processingTime: "1m 50s",
    },
  ]

  const filteredAndSortedData = historyData
    .filter((item) => {
      const matchesSearch = item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || item.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case "score":
          return b.complianceScore - a.complianceScore
        case "name":
          return a.fileName.localeCompare(b.fileName)
        default:
          return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "var(--cds-support-success)"
      case "processing":
        return "var(--cds-support-info)"
      case "failed":
        return "var(--cds-support-error)"
      default:
        return "var(--cds-text-secondary)"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "var(--cds-support-success)"
    if (score >= 70) return "var(--cds-support-warning)"
    return "var(--cds-support-error)"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      // Handle deletion logic here
      console.log("Deleting item:", id)
    }
  }

  return (
    <Layout>
      <div className="history">
        <div className="history__container">
          <div className="history__header">
            <h1 className="cds-heading-05">Analysis History</h1>
            <p className="cds-body-02 history__subtitle">View and manage your previous document compliance analyses</p>
          </div>

          <div className="history__controls">
            <div className="search-section">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="cds-text-input search-input"
                />
                <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zM13 13l-3-3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-group">
                <label htmlFor="status-filter" className="filter-label">
                  Status:
                </label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="processing">Processing</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-filter" className="filter-label">
                  Sort by:
                </label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="filter-select"
                >
                  <option value="date">Upload Date</option>
                  <option value="score">Compliance Score</option>
                  <option value="name">File Name</option>
                </select>
              </div>
            </div>
          </div>

          <div className="history__stats">
            <div className="stat-item">
              <span className="stat-item__value">{historyData.length}</span>
              <span className="stat-item__label">Total Analyses</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">
                {historyData.filter((item) => item.status === "completed").length}
              </span>
              <span className="stat-item__label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">
                {Math.round(
                  historyData
                    .filter((item) => item.status === "completed")
                    .reduce((sum, item) => sum + item.complianceScore, 0) /
                    historyData.filter((item) => item.status === "completed").length,
                )}
                %
              </span>
              <span className="stat-item__label">Avg. Compliance</span>
            </div>
            <div className="stat-item">
              <span className="stat-item__value">
                {historyData.reduce((sum, item) => sum + item.criticalIssues, 0)}
              </span>
              <span className="stat-item__label">Critical Issues</span>
            </div>
          </div>

          <div className="history__table">
            <div className="table-header">
              <div className="table-header__cell table-header__cell--file">Document</div>
              <div className="table-header__cell table-header__cell--date">Upload Date</div>
              <div className="table-header__cell table-header__cell--status">Status</div>
              <div className="table-header__cell table-header__cell--score">Score</div>
              <div className="table-header__cell table-header__cell--issues">Issues</div>
              <div className="table-header__cell table-header__cell--time">Processing Time</div>
              <div className="table-header__cell table-header__cell--actions">Actions</div>
            </div>

            <div className="table-body">
              {filteredAndSortedData.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="table-cell table-cell--file">
                    <div className="file-info">
                      <div className="file-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                            fill="var(--cds-red-60)"
                          />
                          <path d="M14 2V8H20" fill="var(--cds-background)" />
                        </svg>
                      </div>
                      <div className="file-details">
                        <div className="file-name">{item.fileName}</div>
                      </div>
                    </div>
                  </div>

                  <div className="table-cell table-cell--date">{formatDate(item.uploadDate)}</div>

                  <div className="table-cell table-cell--status">
                    <span className="status-badge" style={{ color: getStatusColor(item.status) }}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>

                  <div className="table-cell table-cell--score">
                    {item.status === "completed" ? (
                      <span className="score-value" style={{ color: getScoreColor(item.complianceScore) }}>
                        {item.complianceScore}%
                      </span>
                    ) : (
                      <span className="score-value score-value--na">N/A</span>
                    )}
                  </div>

                  <div className="table-cell table-cell--issues">
                    {item.status === "completed" ? (
                      <div className="issues-summary">
                        <span className="issue-count issue-count--critical">{item.criticalIssues}C</span>
                        <span className="issue-count issue-count--minor">{item.minorIssues}M</span>
                        <span className="issue-count issue-count--warning">{item.warnings}W</span>
                      </div>
                    ) : (
                      <span className="issues-summary--na">N/A</span>
                    )}
                  </div>

                  <div className="table-cell table-cell--time">{item.processingTime}</div>

                  <div className="table-cell table-cell--actions">
                    <div className="action-buttons">
                      {item.status === "completed" && (
                        <>
                          <Link href="/dashboard" className="action-btn action-btn--view">
                            View
                          </Link>
                          <button className="action-btn action-btn--download">Download</button>
                        </>
                      )}
                      {item.status === "failed" && <button className="action-btn action-btn--retry">Retry</button>}
                      <button className="action-btn action-btn--delete" onClick={() => deleteItem(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path d="M32 8L40 16H36V32H28V16H24L32 8Z" fill="var(--cds-text-placeholder)" />
                  <path
                    d="M16 40V48H48V40H52V48C52 50.2 50.2 52 48 52H16C13.8 52 12 50.2 12 48V40H16Z"
                    fill="var(--cds-text-placeholder)"
                  />
                </svg>
              </div>
              <h3 className="empty-state__title">No documents found</h3>
              <p className="empty-state__text">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Upload your first document to get started with compliance analysis."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Link href="/upload" className="cds-btn cds-btn--primary">
                  Upload Document
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .history {
          min-height: 80vh;
        }

        .history__container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .history__header {
          text-align: center;
          margin-bottom: var(--cds-spacing-08);
        }

        .history__subtitle {
          color: var(--cds-text-secondary);
          max-width: 600px;
          margin: var(--cds-spacing-04) auto 0;
        }

        .history__controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--cds-spacing-06);
          gap: var(--cds-spacing-05);
        }

        .search-section {
          flex: 1;
          max-width: 400px;
        }

        .search-input-wrapper {
          position: relative;
        }

        .search-input {
          padding-right: var(--cds-spacing-09);
        }

        .search-icon {
          position: absolute;
          right: var(--cds-spacing-04);
          top: 50%;
          transform: translateY(-50%);
          color: var(--cds-text-placeholder);
        }

        .filter-section {
          display: flex;
          gap: var(--cds-spacing-05);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--cds-spacing-02);
        }

        .filter-label {
          font-size: 0.875rem;
          color: var(--cds-text-secondary);
          white-space: nowrap;
        }

        .filter-select {
          padding: var(--cds-spacing-02) var(--cds-spacing-03);
          border: 1px solid var(--cds-border-strong-01);
          border-radius: 4px;
          background-color: var(--cds-field-01);
          color: var(--cds-text-primary);
          font-size: 0.875rem;
        }

        .history__stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--cds-spacing-05);
          margin-bottom: var(--cds-spacing-07);
        }

        .stat-item {
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          padding: var(--cds-spacing-05);
          text-align: center;
        }

        .stat-item__value {
          display: block;
          font-size: 2rem;
          font-weight: 600;
          color: var(--cds-blue-60);
          margin-bottom: var(--cds-spacing-02);
        }

        .stat-item__label {
          font-size: 0.875rem;
          color: var(--cds-text-secondary);
        }

        .history__table {
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 1.5fr;
          background-color: var(--cds-layer-01);
          border-bottom: 1px solid var(--cds-border-subtle-01);
        }

        .table-header__cell {
          padding: var(--cds-spacing-04) var(--cds-spacing-03);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--cds-text-primary);
          border-right: 1px solid var(--cds-border-subtle-01);
        }

        .table-header__cell:last-child {
          border-right: none;
        }

        .table-body {
          display: flex;
          flex-direction: column;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 1.5fr;
          border-bottom: 1px solid var(--cds-border-subtle-01);
          transition: background-color 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .table-row:hover {
          background-color: var(--cds-background-hover);
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-cell {
          padding: var(--cds-spacing-04) var(--cds-spacing-03);
          border-right: 1px solid var(--cds-border-subtle-01);
          display: flex;
          align-items: center;
          font-size: 0.875rem;
        }

        .table-cell:last-child {
          border-right: none;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: var(--cds-spacing-03);
        }

        .file-name {
          font-weight: 500;
          color: var(--cds-text-primary);
        }

        .status-badge {
          font-weight: 600;
          text-transform: capitalize;
        }

        .score-value {
          font-weight: 600;
        }

        .score-value--na {
          color: var(--cds-text-placeholder);
        }

        .issues-summary {
          display: flex;
          gap: var(--cds-spacing-02);
        }

        .issues-summary--na {
          color: var(--cds-text-placeholder);
        }

        .issue-count {
          font-size: 0.75rem;
          font-weight: 600;
          padding: var(--cds-spacing-01) var(--cds-spacing-02);
          border-radius: 4px;
        }

        .issue-count--critical {
          background-color: var(--cds-support-error);
          color: var(--cds-text-on-color);
        }

        .issue-count--minor {
          background-color: var(--cds-support-warning);
          color: var(--cds-text-primary);
        }

        .issue-count--warning {
          background-color: var(--cds-support-info);
          color: var(--cds-text-on-color);
        }

        .action-buttons {
          display: flex;
          gap: var(--cds-spacing-02);
          flex-wrap: wrap;
        }

        .action-btn {
          padding: var(--cds-spacing-01) var(--cds-spacing-03);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
          background: var(--cds-background);
        }

        .action-btn--view {
          color: var(--cds-blue-60);
          border-color: var(--cds-blue-60);
        }

        .action-btn--view:hover {
          background-color: var(--cds-blue-60);
          color: var(--cds-text-on-color);
        }

        .action-btn--download {
          color: var(--cds-text-secondary);
        }

        .action-btn--download:hover {
          background-color: var(--cds-background-hover);
          color: var(--cds-text-primary);
        }

        .action-btn--retry {
          color: var(--cds-support-warning);
          border-color: var(--cds-support-warning);
        }

        .action-btn--retry:hover {
          background-color: var(--cds-support-warning);
          color: var(--cds-text-primary);
        }

        .action-btn--delete {
          color: var(--cds-support-error);
          border-color: var(--cds-support-error);
        }

        .action-btn--delete:hover {
          background-color: var(--cds-support-error);
          color: var(--cds-text-on-color);
        }

        .empty-state {
          text-align: center;
          padding: var(--cds-spacing-10) var(--cds-spacing-05);
        }

        .empty-state__icon {
          margin-bottom: var(--cds-spacing-05);
          opacity: 0.6;
        }

        .empty-state__title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--cds-text-primary);
          margin-bottom: var(--cds-spacing-03);
        }

        .empty-state__text {
          color: var(--cds-text-secondary);
          margin-bottom: var(--cds-spacing-06);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 1024px) {
          .history__controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-section {
            max-width: none;
          }

          .filter-section {
            justify-content: center;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
          }

          .table-header__cell,
          .table-cell {
            border-right: none;
            border-bottom: 1px solid var(--cds-border-subtle-01);
          }

          .table-header__cell:last-child,
          .table-cell:last-child {
            border-bottom: none;
          }

          .table-row {
            margin-bottom: var(--cds-spacing-04);
            border: 1px solid var(--cds-border-subtle-01);
            border-radius: 8px;
          }
        }

        @media (max-width: 768px) {
          .history__stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-section {
            flex-direction: column;
            gap: var(--cds-spacing-03);
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  )
}
