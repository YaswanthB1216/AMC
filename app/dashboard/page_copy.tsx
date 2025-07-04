// "use client"

// import { useState } from "react"
// import Layout from "../../components/layout"

// interface ComplianceResult {
//   id: string
//   fileName: string
//   status: "processing" | "completed" | "failed"
//   overallScore: number
//   criticalViolations: number
//   minorViolations: number
//   warnings: number
//   processedAt: string
//   processingTime: string
// }

// interface ViolationDetail {
//   id: string
//   type: "critical" | "minor" | "warning"
//   category: string
//   description: string
//   pageReference: string
//   sebiRegulation: string
//   recommendation: string
// }

// export default function DashboardPage() {
//   const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
//   const [filterType, setFilterType] = useState<"all" | "critical" | "minor" | "warning">("all")

//   // Mock data
//   const results: ComplianceResult[] = [
//     {
//       id: "1",
//       fileName: "Mutual_Fund_Scheme_Document.pdf",
//       status: "completed",
//       overallScore: 85,
//       criticalViolations: 2,
//       minorViolations: 5,
//       warnings: 3,
//       processedAt: "2024-01-15 14:30:00",
//       processingTime: "3m 45s",
//     },
//     {
//       id: "2",
//       fileName: "Annual_Report_2023.pdf",
//       status: "completed",
//       overallScore: 92,
//       criticalViolations: 0,
//       minorViolations: 2,
//       warnings: 1,
//       processedAt: "2024-01-15 14:25:00",
//       processingTime: "2m 15s",
//     },
//     {
//       id: "3",
//       fileName: "Risk_Disclosure_Document.pdf",
//       status: "processing",
//       overallScore: 0,
//       criticalViolations: 0,
//       minorViolations: 0,
//       warnings: 0,
//       processedAt: "2024-01-15 14:35:00",
//       processingTime: "Processing...",
//     },
//   ]

//   const violations: ViolationDetail[] = [
//     {
//       id: "1",
//       type: "critical",
//       category: "Disclosure Requirements",
//       description: "Missing mandatory risk disclosure statement as per SEBI guidelines",
//       pageReference: "Page 5, Section 2.1",
//       sebiRegulation: "SEBI (Mutual Funds) Regulations, 1996 - Regulation 59",
//       recommendation: "Add the required risk disclosure statement in the specified format",
//     },
//     {
//       id: "2",
//       type: "critical",
//       category: "Fee Structure",
//       description: "Expense ratio exceeds the maximum limit prescribed by SEBI",
//       pageReference: "Page 12, Table 3",
//       sebiRegulation: "SEBI (Mutual Funds) Regulations, 1996 - Regulation 52",
//       recommendation: "Revise the expense ratio to comply with SEBI limits",
//     },
//     {
//       id: "3",
//       type: "minor",
//       category: "Format Compliance",
//       description: "Font size in disclaimer section is below recommended minimum",
//       pageReference: "Page 20, Footer",
//       sebiRegulation: "SEBI Circular No. MFD/CIR/4/2013",
//       recommendation: "Increase font size to at least 10pt for better readability",
//     },
//     {
//       id: "4",
//       type: "warning",
//       category: "Best Practices",
//       description: "Consider adding more detailed investment strategy explanation",
//       pageReference: "Page 8, Section 4",
//       sebiRegulation: "SEBI Best Practice Guidelines",
//       recommendation: "Enhance investment strategy section with more detailed explanations",
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "var(--cds-support-success)"
//       case "processing":
//         return "var(--cds-support-info)"
//       case "failed":
//         return "var(--cds-support-error)"
//       default:
//         return "var(--cds-text-secondary)"
//     }
//   }

//   const getScoreColor = (score: number) => {
//     if (score >= 90) return "var(--cds-support-success)"
//     if (score >= 70) return "var(--cds-support-warning)"
//     return "var(--cds-support-error)"
//   }

//   const filteredViolations = violations.filter((violation) => filterType === "all" || violation.type === filterType)

//   return (
//     <Layout>
//       <div className="dashboard">
//         <div className="dashboard__container">
//           <div className="dashboard__header">
//             <h1 className="cds-heading-05">Compliance Analysis Dashboard</h1>
//             <p className="cds-body-02 dashboard__subtitle">
//               Monitor your document compliance status and review detailed analysis results
//             </p>
//           </div>

//           <div className="dashboard__stats">
//             <div className="stat-card">
//               <div className="stat-card__value">3</div>
//               <div className="stat-card__label">Documents Analyzed</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-card__value">89%</div>
//               <div className="stat-card__label">Average Compliance</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-card__value">2</div>
//               <div className="stat-card__label">Critical Issues</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-card__value">7</div>
//               <div className="stat-card__label">Total Violations</div>
//             </div>
//           </div>

//           <div className="dashboard__content">
//             <div className="documents-section">
//               <h2 className="section-title">Document Analysis Results</h2>
//               <div className="documents-list">
//                 {results.map((result) => (
//                   <div
//                     key={result.id}
//                     className={`document-card ${selectedDocument === result.id ? "document-card--selected" : ""}`}
//                     onClick={() => setSelectedDocument(result.id)}
//                   >
//                     <div className="document-card__header">
//                       <div className="document-card__info">
//                         <h3 className="document-card__title">{result.fileName}</h3>
//                         <div className="document-card__meta">
//                           <span className="document-card__time">Processed: {result.processedAt}</span>
//                           <span className="document-card__duration">Duration: {result.processingTime}</span>
//                         </div>
//                       </div>
//                       <div className="document-card__status">
//                         <span className="status-indicator" style={{ color: getStatusColor(result.status) }}>
//                           {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
//                         </span>
//                       </div>
//                     </div>

//                     {result.status === "completed" && (
//                       <div className="document-card__results">
//                         <div className="compliance-score">
//                           <div className="compliance-score__label">Compliance Score</div>
//                           <div
//                             className="compliance-score__value"
//                             style={{ color: getScoreColor(result.overallScore) }}
//                           >
//                             {result.overallScore}%
//                           </div>
//                         </div>
//                         <div className="violations-summary">
//                           <div className="violation-count violation-count--critical">
//                             <span className="violation-count__number">{result.criticalViolations}</span>
//                             <span className="violation-count__label">Critical</span>
//                           </div>
//                           <div className="violation-count violation-count--minor">
//                             <span className="violation-count__number">{result.minorViolations}</span>
//                             <span className="violation-count__label">Minor</span>
//                           </div>
//                           <div className="violation-count violation-count--warning">
//                             <span className="violation-count__number">{result.warnings}</span>
//                             <span className="violation-count__label">Warnings</span>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {result.status === "processing" && (
//                       <div className="document-card__processing">
//                         <div className="processing-indicator">
//                           <div className="processing-spinner"></div>
//                           <span>Analyzing document...</span>
//                         </div>
//                         <div className="cds-progress-bar">
//                           <div className="cds-progress-bar__fill processing-progress"></div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {selectedDocument && (
//               <div className="violations-section">
//                 <div className="violations-header">
//                   <h2 className="section-title">Compliance Issues</h2>
//                   <div className="violations-filter">
//                     <button
//                       className={`filter-btn ${filterType === "all" ? "filter-btn--active" : ""}`}
//                       onClick={() => setFilterType("all")}
//                     >
//                       All ({violations.length})
//                     </button>
//                     <button
//                       className={`filter-btn ${filterType === "critical" ? "filter-btn--active" : ""}`}
//                       onClick={() => setFilterType("critical")}
//                     >
//                       Critical ({violations.filter((v) => v.type === "critical").length})
//                     </button>
//                     <button
//                       className={`filter-btn ${filterType === "minor" ? "filter-btn--active" : ""}`}
//                       onClick={() => setFilterType("minor")}
//                     >
//                       Minor ({violations.filter((v) => v.type === "minor").length})
//                     </button>
//                     <button
//                       className={`filter-btn ${filterType === "warning" ? "filter-btn--active" : ""}`}
//                       onClick={() => setFilterType("warning")}
//                     >
//                       Warnings ({violations.filter((v) => v.type === "warning").length})
//                     </button>
//                   </div>
//                 </div>

//                 <div className="violations-list">
//                   {filteredViolations.map((violation) => (
//                     <div key={violation.id} className={`violation-card violation-card--${violation.type}`}>
//                       <div className="violation-card__header">
//                         <div className="violation-card__type">
//                           <span className={`violation-badge violation-badge--${violation.type}`}>
//                             {violation.type.charAt(0).toUpperCase() + violation.type.slice(1)}
//                           </span>
//                           <span className="violation-card__category">{violation.category}</span>
//                         </div>
//                         <div className="violation-card__reference">{violation.pageReference}</div>
//                       </div>

//                       <div className="violation-card__content">
//                         <h4 className="violation-card__description">{violation.description}</h4>
//                         <div className="violation-card__regulation">
//                           <strong>SEBI Regulation:</strong> {violation.sebiRegulation}
//                         </div>
//                         <div className="violation-card__recommendation">
//                           <strong>Recommendation:</strong> {violation.recommendation}
//                         </div>
//                       </div>

//                       <div className="violation-card__actions">
//                         <button className="cds-btn cds-btn--ghost">View Details</button>
//                         <button className="cds-btn cds-btn--secondary">Get Template</button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="dashboard__actions">
//             <button className="cds-btn cds-btn--primary">Download Report</button>
//             <button className="cds-btn cds-btn--secondary">Export to Excel</button>
//             <button className="cds-btn cds-btn--ghost">Print Summary</button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .dashboard {
//           min-height: 80vh;
//         }

//         .dashboard__container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 var(--cds-spacing-05);
//         }

//         .dashboard__header {
//           text-align: center;
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .dashboard__subtitle {
//           color: var(--cds-text-secondary);
//           max-width: 600px;
//           margin: var(--cds-spacing-04) auto 0;
//         }

//         .dashboard__stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: var(--cds-spacing-05);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .stat-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-06);
//           text-align: center;
//         }

//         .stat-card__value {
//           font-size: 2.5rem;
//           font-weight: 600;
//           color: var(--cds-blue-60);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .stat-card__label {
//           color: var(--cds-text-secondary);
//           font-size: 0.875rem;
//         }

//         .dashboard__content {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: var(--cds-spacing-07);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .section-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-05);
//           color: var(--cds-text-primary);
//         }

//         .documents-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//         }

//         .document-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           cursor: pointer;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .document-card:hover {
//           border-color: var(--cds-blue-60);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .document-card--selected {
//           border-color: var(--cds-blue-60);
//           background-color: rgba(15, 98, 254, 0.05);
//         }

//         .document-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .document-card__title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .document-card__meta {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-01);
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//         }

//         .status-indicator {
//           font-weight: 600;
//           font-size: 0.875rem;
//         }

//         .document-card__results {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .compliance-score {
//           text-align: center;
//         }

//         .compliance-score__label {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .compliance-score__value {
//           font-size: 2rem;
//           font-weight: 600;
//         }

//         .violations-summary {
//           display: flex;
//           gap: var(--cds-spacing-04);
//         }

//         .violation-count {
//           text-align: center;
//         }

//         .violation-count__number {
//           display: block;
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .violation-count__label {
//           font-size: 0.75rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-count--critical .violation-count__number {
//           color: var(--cds-support-error);
//         }

//         .violation-count--minor .violation-count__number {
//           color: var(--cds-support-warning);
//         }

//         .violation-count--warning .violation-count__number {
//           color: var(--cds-support-info);
//         }

//         .document-card__processing {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-03);
//         }

//         .processing-indicator {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//           color: var(--cds-text-secondary);
//         }

//         .processing-spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid var(--cds-border-subtle-01);
//           border-top: 2px solid var(--cds-blue-60);
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .processing-progress {
//           animation: progress 2s ease-in-out infinite;
//         }

//         @keyframes progress {
//           0% { width: 0%; }
//           50% { width: 70%; }
//           100% { width: 0%; }
//         }

//         .violations-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violations-filter {
//           display: flex;
//           gap: var(--cds-spacing-02);
//         }

//         .filter-btn {
//           background: none;
//           border: 1px solid var(--cds-border-subtle-01);
//           color: var(--cds-text-secondary);
//           padding: var(--cds-spacing-02) var(--cds-spacing-03);
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 0.875rem;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .filter-btn:hover {
//           background-color: var(--cds-background-hover);
//         }

//         .filter-btn--active {
//           background-color: var(--cds-blue-60);
//           color: var(--cds-text-on-color);
//           border-color: var(--cds-blue-60);
//         }

//         .violations-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//           max-height: 600px;
//           overflow-y: auto;
//         }

//         .violation-card {
//           background-color: var(--cds-layer-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           border-left: 4px solid;
//         }

//         .violation-card--critical {
//           border-left-color: var(--cds-support-error);
//         }

//         .violation-card--minor {
//           border-left-color: var(--cds-support-warning);
//         }

//         .violation-card--warning {
//           border-left-color: var(--cds-support-info);
//         }

//         .violation-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .violation-card__type {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//         }

//         .violation-badge {
//           padding: var(--cds-spacing-01) var(--cds-spacing-03);
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-badge--critical {
//           background-color: var(--cds-support-error);
//           color: var(--cds-text-on-color);
//         }

//         .violation-badge--minor {
//           background-color: var(--cds-support-warning);
//           color: var(--cds-text-primary);
//         }

//         .violation-badge--warning {
//           background-color: var(--cds-support-info);
//           color: var(--cds-text-on-color);
//         }

//         .violation-card__category {
//           font-weight: 500;
//           color: var(--cds-text-primary);
//         }

//         .violation-card__reference {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           font-style: italic;
//         }

//         .violation-card__content {
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violation-card__description {
//           font-size: 1rem;
//           font-weight: 500;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-03);
//         }

//         .violation-card__regulation,
//         .violation-card__recommendation {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-02);
//           line-height: 1.4;
//         }

//         .violation-card__actions {
//           display: flex;
//           gap: var(--cds-spacing-03);
//         }

//         .dashboard__actions {
//           display: flex;
//           justify-content: center;
//           gap: var(--cds-spacing-04);
//           padding-top: var(--cds-spacing-07);
//           border-top: 1px solid var(--cds-border-subtle-01);
//         }

//         @media (max-width: 1024px) {
//           .dashboard__content {
//             grid-template-columns: 1fr;
//           }

//           .violations-filter {
//             flex-wrap: wrap;
//           }
//         }

//         @media (max-width: 768px) {
//           .dashboard__stats {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .document-card__header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-02);
//           }

//           .document-card__results {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-04);
//           }

//           .violations-summary {
//             justify-content: space-around;
//             width: 100%;
//           }

//           .violations-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-03);
//           }

//           .dashboard__actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </Layout>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/layout"
// import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// interface ComplianceResult {
//   id: string
//   fileName: string
//   status: "processing" | "completed" | "failed"
//   overallScore: number
//   criticalViolations: number
//   minorViolations: number
//   warnings: number
//   processedAt: string
//   processingTime: string
// }

// interface ViolationDetail {
//   id: string
//   type: "critical" | "minor" | "warning"
//   category: string
//   description: string
//   pageReference: string
//   sebiRegulation: string
//   recommendation: string
// }

// interface FirestoreIssue {
//   clause: string
//   issue: string
//   fix: string
//   reference: string
// }

// interface FirestoreDocumentAnalysis {
//   fileName: string
//   response: {
//     issues: FirestoreIssue[]
//     raw_response: string[]
//   }
//   uploadDate: { seconds: number; nanoseconds: number }
//   status: "completed" | "failed"
// }

// export default function DashboardPage() {
//   const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
//   const [filterType, setFilterType] = useState<"all" | "critical" | "minor" | "warning">("all")
//   const [results, setResults] = useState<ComplianceResult[]>([])
//   const [violations, setViolations] = useState<ViolationDetail[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Function to categorize issues and calculate scores
//   const processIssues = (docId: string, issues: FirestoreIssue[]): { violations: ViolationDetail[], counts: { critical: number, minor: number, warnings: number }, score: number } => {
//     let critical = 0
//     let minor = 0
//     let warnings = 0
//     let score = 100

//     const violations: ViolationDetail[] = issues.map((issue, index) => {
//       // Heuristic to determine violation type
//       let type: "critical" | "minor" | "warning" = "minor"
//       if (issue.issue.toLowerCase().includes("must") || issue.fix.toLowerCase().includes("mandatory")) {
//         type = "critical"
//         critical++
//         score -= 10
//       } else if (issue.fix.toLowerCase().includes("consider") || issue.issue.toLowerCase().includes("optional")) {
//         type = "warning"
//         warnings++
//         score -= 2
//       } else {
//         minor++
//         score -= 5
//       }

//       // Extract category from issue or clause (simplified heuristic)
//       const category = issue.clause.toLowerCase().includes("disclosure") ? "Disclosure Requirements" :
//                        issue.clause.toLowerCase().includes("expense") ? "Fee Structure" :
//                        issue.clause.toLowerCase().includes("risk") ? "Risk Disclosure" :
//                        issue.clause.toLowerCase().includes("marketing") ? "Marketing Compliance" :
//                        "General Compliance"

//       return {
//         id: `${docId}-${index}`,
//         type,
//         category,
//         description: issue.issue,
//         pageReference: issue.reference.match(/Page \d+/i)?.[0] || "N/A",
//         sebiRegulation: issue.reference.match(/SEBI.*?(?=\s|$)/i)?.[0] || "SEBI Master Circular",
//         recommendation: issue.fix,
//       }
//     })

//     // Ensure score is non-negative
//     score = Math.max(0, score)

//     return { violations, counts: { critical, minor, warnings }, score }
//   }

//   // Fetch data from Firestore
//   useEffect(() => {
//     const q = query(collection(db, "amc"), orderBy("uploadDate", "desc"))
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       try {
//         const fetchedResults: ComplianceResult[] = []
//         const fetchedViolations: ViolationDetail[] = []

//         snapshot.forEach((doc) => {
//           const data = doc.data() as FirestoreDocumentAnalysis
//           const { issues } = data.response
//           const { violations, counts, score } = processIssues(doc.id, issues)

//           fetchedResults.push({
//             id: doc.id,
//             fileName: data.fileName,
//             status: data.status,
//             overallScore: data.status === "completed" ? score : 0,
//             criticalViolations: counts.critical,
//             minorViolations: counts.minor,
//             warnings: counts.warnings,
//             processedAt: new Date(data.uploadDate.seconds * 1000).toLocaleString("en-US", {
//               year: "numeric",
//               month: "2-digit",
//               day: "2-digit",
//               hour: "2-digit",
//               minute: "2-digit",
//               second: "2-digit",
//             }),
//             processingTime: data.status === "completed" ? "3m 45s" : "Processing...", // Placeholder
//           })

//           if (doc.id === selectedDocument) {
//             fetchedViolations.push(...violations)
//           }
//         })

//         setResults(fetchedResults)
//         setViolations(fetchedViolations)
//         setLoading(false)
//       } catch (err) {
//         console.error("Error fetching Firestore data:", err)
//         setError("Failed to load compliance data. Please try again.")
//         setLoading(false)
//       }
//     }, (err) => {
//       console.error("Firestore subscription error:", err)
//       setError("Failed to subscribe to compliance data. Please try again.")
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [selectedDocument])

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "var(--cds-support-success)"
//       case "processing":
//         return "var(--cds-support-info)"
//       case "failed":
//         return "var(--cds-support-error)"
//       default:
//         return "var(--cds-text-secondary)"
//     }
//   }

//   const getScoreColor = (score: number) => {
//     if (score >= 90) return "var(--cds-support-success)"
//     if (score >= 70) return "var(--cds-support-warning)"
//     return "var(--cds-support-error)"
//   }

//   const filteredViolations = violations.filter((violation) => filterType === "all" || violation.type === filterType)

//   return (
//     <Layout>
//       <div className="dashboard">
//         <div className="dashboard__container">
//           <div className="dashboard__header">
//             <h1 className="cds-heading-05">Compliance Analysis Dashboard</h1>
//             <p className="cds-body-02 dashboard__subtitle">
//               Monitor your document compliance status and review detailed analysis results
//             </p>
//           </div>

//           {loading && (
//             <div className="loading-state">
//               <div className="processing-spinner"></div>
//               <p>Loading compliance data...</p>
//             </div>
//           )}

//           {error && (
//             <div className="error-state">
//               <p className="error-message">{error}</p>
//             </div>
//           )}

//           {!loading && !error && (
//             <>
//               <div className="dashboard__stats">
//                 <div className="stat-card">
//                   <div className="stat-card__value">{results.length}</div>
//                   <div className="stat-card__label">Documents Analyzed</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.length > 0
//                       ? Math.round(
//                           results
//                             .filter((r) => r.status === "completed")
//                             .reduce((sum, r) => sum + r.overallScore, 0) /
//                             results.filter((r) => r.status === "completed").length
//                         ) + "%"
//                       : "N/A"}
//                   </div>
//                   <div className="stat-card__label">Average Compliance</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.reduce((sum, r) => sum + r.criticalViolations, 0)}
//                   </div>
//                   <div className="stat-card__label">Critical Issues</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.reduce((sum, r) => sum + r.criticalViolations + r.minorViolations + r.warnings, 0)}
//                   </div>
//                   <div className="stat-card__label">Total Violations</div>
//                 </div>
//               </div>

//               <div className="dashboard__content">
//                 <div className="documents-section">
//                   <h2 className="section-title">Document Analysis Results</h2>
//                   <div className="documents-list">
//                     {results.map((result) => (
//                       <div
//                         key={result.id}
//                         className={`document-card ${selectedDocument === result.id ? "document-card--selected" : ""}`}
//                         onClick={() => setSelectedDocument(result.id)}
//                       >
//                         <div className="document-card__header">
//                           <div className="document-card__info">
//                             <h3 className="document-card__title">{result.fileName}</h3>
//                             <div className="document-card__meta">
//                               <span className="document-card__time">Processed: {result.processedAt}</span>
//                               <span className="document-card__duration">Duration: {result.processingTime}</span>
//                             </div>
//                           </div>
//                           <div className="document-card__status">
//                             <span className="status-indicator" style={{ color: getStatusColor(result.status) }}>
//                               {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
//                             </span>
//                           </div>
//                         </div>

//                         {result.status === "completed" && (
//                           <div className="document-card__results">
//                             <div className="compliance-score">
//                               <div className="compliance-score__label">Compliance Score</div>
//                               <div
//                                 className="compliance-score__value"
//                                 style={{ color: getScoreColor(result.overallScore) }}
//                               >
//                                 {result.overallScore}%
//                               </div>
//                             </div>
//                             <div className="violations-summary">
//                               <div className="violation-count violation-count--critical">
//                                 <span className="violation-count__number">{result.criticalViolations}</span>
//                                 <span className="violation-count__label">Critical</span>
//                               </div>
//                               <div className="violation-count violation-count--minor">
//                                 <span className="violation-count__number">{result.minorViolations}</span>
//                                 <span className="violation-count__label">Minor</span>
//                               </div>
//                               <div className="violation-count violation-count--warning">
//                                 <span className="violation-count__number">{result.warnings}</span>
//                                 <span className="violation-count__label">Warnings</span>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {result.status === "processing" && (
//                           <div className="document-card__processing">
//                             <div className="processing-indicator">
//                               <div className="processing-spinner"></div>
//                               <span>Analyzing document...</span>
//                             </div>
//                             <div className="cds-progress-bar">
//                               <div className="cds-progress-bar__fill processing-progress"></div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {selectedDocument && (
//                   <div className="violations-section">
//                     <div className="violations-header">
//                       <h2 className="section-title">Compliance Issues</h2>
//                       <div className="violations-filter">
//                         <button
//                           className={`filter-btn ${filterType === "all" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("all")}
//                         >
//                           All ({violations.length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "critical" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("critical")}
//                         >
//                           Critical ({violations.filter((v) => v.type === "critical").length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "minor" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("minor")}
//                         >
//                           Minor ({violations.filter((v) => v.type === "minor").length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "warning" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("warning")}
//                         >
//                           Warnings ({violations.filter((v) => v.type === "warning").length})
//                         </button>
//                       </div>
//                     </div>

//                     <div className="violations-list">
//                       {filteredViolations.length > 0 ? (
//                         filteredViolations.map((violation) => (
//                           <div key={violation.id} className={`violation-card violation-card--${violation.type}`}>
//                             <div className="violation-card__header">
//                               <div className="violation-card__type">
//                                 <span className={`violation-badge violation-badge--${violation.type}`}>
//                                   {violation.type.charAt(0).toUpperCase() + violation.type.slice(1)}
//                                 </span>
//                                 <span className="violation-card__category">{violation.category}</span>
//                               </div>
//                               <div className="violation-card__reference">{violation.pageReference}</div>
//                             </div>

//                             <div className="violation-card__content">
//                               <h4 className="violation-card__description">{violation.description}</h4>
//                               <div className="violation-card__regulation">
//                                 <strong>SEBI Regulation:</strong> {violation.sebiRegulation}
//                               </div>
//                               <div className="violation-card__recommendation">
//                                 <strong>Recommendation:</strong> {violation.recommendation}
//                               </div>
//                             </div>

//                             <div className="violation-card__actions">
//                               <button className="cds-btn cds-btn--ghost">View Details</button>
//                               <button className="cds-btn cds-btn--secondary">Get Template</button>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No violations found for this document.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="dashboard__actions">
//                 <button className="cds-btn cds-btn--primary">Download Report</button>
//                 <button className="cds-btn cds-btn--secondary">Export to Excel</button>
//                 <button className="cds-btn cds-btn--ghost">Print Summary</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .dashboard {
//           min-height: 80vh;
//         }

//         .dashboard__container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 var(--cds-spacing-05);
//         }

//         .dashboard__header {
//           text-align: center;
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .dashboard__subtitle {
//           color: var(--cds-text-secondary);
//           max-width: 600px;
//           margin: var(--cds-spacing-04) auto 0;
//         }

//         .loading-state, .error-state {
//           text-align: center;
//           padding: var(--cds-spacing-08);
//         }

//         .loading-state p {
//           color: var(--cds-text-secondary);
//           margin-top: var(--cds-spacing-04);
//         }

//         .error-state p {
//           color: var(--cds-support-error);
//           font-weight: 500;
//         }

//         .processing-spinner {
//           width: 24px;
//           height: 24px;
//           border: 3px solid var(--cds-border-subtle-01);
//           border-top: 3px solid var(--cds-blue-60);
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin: 0 auto;
//         }

//         .dashboard__stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: var(--cds-spacing-05);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .stat-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-06);
//           text-align: center;
//         }

//         .stat-card__value {
//           font-size: 2.5rem;
//           font-weight: 600;
//           color: var(--cds-blue-60);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .stat-card__label {
//           color: var(--cds-text-secondary);
//           font-size: 0.875rem;
//         }

//         .dashboard__content {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: var(--cds-spacing-07);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .section-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-05);
//           color: var(--cds-text-primary);
//         }

//         .documents-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//         }

//         .document-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           cursor: pointer;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .document-card:hover {
//           border-color: var(--cds-blue-60);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .document-card--selected {
//           border-color: var(--cds-blue-60);
//           background-color: rgba(15, 98, 254, 0.05);
//         }

//         .document-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .document-card__title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .document-card__meta {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-01);
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//         }

//         .status-indicator {
//           font-weight: 600;
//           font-size: 0.875rem;
//         }

//         .document-card__results {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .compliance-score {
//           text-align: center;
//         }

//         .compliance-score__label {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .compliance-score__value {
//           font-size: 2rem;
//           font-weight: 600;
//         }

//         .violations-summary {
//           display: flex;
//           gap: var(--cds-spacing-04);
//         }

//         .violation-count {
//           text-align: center;
//         }

//         .violation-count__number {
//           display: block;
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .violation-count__label {
//           font-size: 0.75rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-count--critical .violation-count__number {
//           color: var(--cds-support-error);
//         }

//         .violation-count--minor .violation-count__number {
//           color: var(--cds-support-warning);
//         }

//         .violation-count--warning .violation-count__number {
//           color: var(--cds-support-info);
//         }

//         .document-card__processing {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-03);
//         }

//         .processing-indicator {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//           color: var(--cds-text-secondary);
//         }

//         .processing-spinner {
//           width: 16px;
//           height: 16px;
//           border: 2px solid var(--cds-border-subtle-01);
//           border-top: 2px solid var(--cds-blue-60);
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .processing-progress {
//           animation: progress 2s ease-in-out infinite;
//         }

//         @keyframes progress {
//           0% { width: 0%; }
//           50% { width: 70%; }
//           100% { width: 0%; }
//         }

//         .violations-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violations-filter {
//           display: flex;
//           gap: var(--cds-spacing-02);
//         }

//         .filter-btn {
//           background: none;
//           border: 1px solid var(--cds-border-subtle-01);
//           color: var(--cds-text-secondary);
//           padding: var(--cds-spacing-02) var(--cds-spacing-03);
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 0.875rem;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .filter-btn:hover {
//           background-color: var(--cds-background-hover);
//         }

//         .filter-btn--active {
//           background-color: var(--cds-blue-60);
//           color: var(--cds-text-on-color);
//           border-color: var(--cds-blue-60);
//         }

//         .violations-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//           max-height: 600px;
//           overflow-y: auto;
//         }

//         .violations-list p {
//           color: var(--cds-text-secondary);
//           font-style: italic;
//         }

//         .violation-card {
//           background-color: var(--cds-layer-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           border-left: 4px solid;
//         }

//         .violation-card--critical {
//           border-left-color: var(--cds-support-error);
//         }

//         .violation-card--minor {
//           border-left-color: var(--cds-support-warning);
//         }

//         .violation-card--warning {
//           border-left-color: var(--cds-support-info);
//         }

//         .violation-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .violation-card__type {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//         }

//         .violation-badge {
//           padding: var(--cds-spacing-01) var(--cds-spacing-03);
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-badge--critical {
//           background-color: var(--cds-support-error);
//           color: var(--cds-text-on-color);
//         }

//         .violation-badge--minor {
//           background-color: var(--cds-support-warning);
//           color: var(--cds-text-primary);
//         }

//         .violation-badge--warning {
//           background-color: var(--cds-support-info);
//           color: var(--cds-text-on-color);
//         }

//         .violation-card__category {
//           font-weight: 500;
//           color: var(--cds-text-primary);
//         }

//         .violation-card__reference {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           font-style: italic;
//         }

//         .violation-card__content {
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violation-card__description {
//           font-size: 1rem;
//           font-weight: 500;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-03);
//         }

//         .violation-card__regulation,
//         .violation-card__recommendation {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-02);
//           line-height: 1.4;
//         }

//         .violation-card__actions {
//           display: flex;
//           gap: var(--cds-spacing-03);
//         }

//         .dashboard__actions {
//           display: flex;
//           justify-content: center;
//           gap: var(--cds-spacing-04);
//           padding-top: var(--cds-spacing-07);
//           border-top: 1px solid var(--cds-border-subtle-01);
//         }

//         @media (max-width: 1024px) {
//           .dashboard__content {
//             grid-template-columns: 1fr;
//           }

//           .violations-filter {
//             flex-wrap: wrap;
//           }
//         }

//         @media (max-width: 768px) {
//           .dashboard__stats {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .document-card__header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-02);
//           }

//           .document-card__results {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-04);
//           }

//           .violations-summary {
//             justify-content: space-around;
//             width: 100%;
//           }

//           .violations-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-03);
//           }

//           .dashboard__actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </Layout>
//   )
// }




// "use client"

// import { useState, useEffect } from "react"
// import Layout from "../../components/layout"
// import { collection, query, orderBy, getDocs } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// interface ComplianceResult {
//   id: string
//   fileName: string
//   status: "processing" | "completed" | "failed"
//   overallScore: number
//   criticalViolations: number
//   minorViolations: number
//   warnings: number
//   processedAt: string
//   processingTime: string
// }

// interface ViolationDetail {
//   id: string
//   type: "critical" | "minor" | "warning"
//   category: string
//   description: string
//   pageReference: string
//   sebiRegulation: string
//   recommendation: string
// }

// interface FirestoreDocument {
//   fileName: string
//   response: {
//     issues: {
//       clause: string
//       issue: string
//       fix: string
//       reference: string
//     }[]
//     raw_response: string[]
//   }
//   uploadDate: { seconds: number; nanoseconds: number }
//   status: "completed" | "failed"
// }

// export default function DashboardPage() {
//   const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
//   const [filterType, setFilterType] = useState<"all" | "critical" | "minor" | "warning">("all")
//   const [results, setResults] = useState<ComplianceResult[]>([])
//   const [violations, setViolations] = useState<ViolationDetail[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch data from Firestore
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const q = query(collection(db, "amc"), orderBy("uploadDate", "desc"))
//         const querySnapshot = await getDocs(q)

//         const fetchedResults: ComplianceResult[] = []
//         const fetchedViolations: ViolationDetail[] = []

//         querySnapshot.forEach((doc) => {
//           const data = doc.data() as FirestoreDocument
//           const docId = doc.id

//           // Calculate violation counts
//           const criticalViolations = data.response.issues.filter((issue) =>
//             issue.issue.toLowerCase().includes("critical") || issue.fix.toLowerCase().includes("critical")
//           ).length
//           const minorViolations = data.response.issues.filter((issue) =>
//             issue.issue.toLowerCase().includes("minor") || issue.fix.toLowerCase().includes("minor")
//           ).length
//           const warnings = data.response.issues.filter((issue) =>
//             issue.issue.toLowerCase().includes("warning") || issue.fix.toLowerCase().includes("warning")
//           ).length
//           const totalViolations = criticalViolations + minorViolations + warnings
//           const overallScore = totalViolations === 0 ? 100 : Math.max(0, 100 - (criticalViolations * 10 + minorViolations * 5 + warnings * 2))

//           // Convert Firestore timestamp to readable date
//           const processedAt = new Date(data.uploadDate.seconds * 1000).toLocaleString("en-US", {
//             year: "numeric",
//             month: "2-digit",
//             day: "2-digit",
//             hour: "2-digit",
//             minute: "2-digit",
//             second: "2-digit",
//           })

//           // Add to results
//           fetchedResults.push({
//             id: docId,
//             fileName: data.fileName,
//             status: data.status,
//             overallScore,
//             criticalViolations,
//             minorViolations,
//             warnings,
//             processedAt,
//             processingTime: "N/A", // Placeholder, as processing time isn't stored
//           })

//           // Map issues to ViolationDetail
//           data.response.issues.forEach((issue, index) => {
//             const violationType = issue.issue.toLowerCase().includes("critical") || issue.fix.toLowerCase().includes("critical")
//               ? "critical"
//               : issue.issue.toLowerCase().includes("minor") || issue.fix.toLowerCase().includes("minor")
//               ? "minor"
//               : "warning"

//             fetchedViolations.push({
//               id: `${docId}-${index}`,
//               type: violationType,
//               category: issue.clause.split("\n")[0].replace(/^[-*]\s*/, "").trim(), // Extract first line of clause as category
//               description: issue.issue,
//               pageReference: issue.reference.split("\n")[0].match(/Page \d+/)?.[0] || "N/A",
//               sebiRegulation: issue.reference,
//               recommendation: issue.fix,
//             })
//           })
//         })

//         setResults(fetchedResults)
//         setViolations(fetchedViolations)
//         setLoading(false)
//       } catch (err) {
//         console.error("Error fetching Firestore data:", err)
//         setError("Failed to load compliance data. Please try again.")
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "var(--cds-support-success)"
//       case "processing":
//         return "var(--cds-support-info)"
//       case "failed":
//         return "var(--cds-support-error)"
//       default:
//         return "var(--cds-text-secondary)"
//     }
//   }

//   const getScoreColor = (score: number) => {
//     if (score >= 90) return "var(--cds-support-success)"
//     if (score >= 70) return "var(--cds-support-warning)"
//     return "var(--cds-support-error)"
//   }

//   const filteredViolations = violations.filter(
//     (violation) =>
//       (filterType === "all" || violation.type === filterType) &&
//       (!selectedDocument || violation.id.startsWith(selectedDocument))
//   )

//   return (
//     <Layout>
//       <div className="dashboard">
//         <div className="dashboard__container">
//           <div className="dashboard__header">
//             <h1 className="cds-heading-05">Compliance Analysis Dashboard</h1>
//             <p className="cds-body-02 dashboard__subtitle">
//               Monitor your document compliance status and review detailed analysis results
//             </p>
//           </div>

//           {loading && (
//             <div className="loading-state">
//               <div className="processing-spinner"></div>
//               <p>Loading compliance data...</p>
//             </div>
//           )}

//           {error && (
//             <div className="error-state">
//               <p>{error}</p>
//             </div>
//           )}

//           {!loading && !error && (
//             <>
//               <div className="dashboard__stats">
//                 <div className="stat-card">
//                   <div className="stat-card__value">{results.length}</div>
//                   <div className="stat-card__label">Documents Analyzed</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.length > 0
//                       ? Math.round(
//                           results.reduce((sum, r) => sum + r.overallScore, 0) / results.length
//                         ) + "%"
//                       : "N/A"}
//                   </div>
//                   <div className="stat-card__label">Average Compliance</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.reduce((sum, r) => sum + r.criticalViolations, 0)}
//                   </div>
//                   <div className="stat-card__label">Critical Issues</div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-card__value">
//                     {results.reduce(
//                       (sum, r) => sum + r.criticalViolations + r.minorViolations + r.warnings,
//                       0
//                     )}
//                   </div>
//                   <div className="stat-card__label">Total Violations</div>
//                 </div>
//               </div>

//               <div className="dashboard__content">
//                 <div className="documents-section">
//                   <h2 className="section-title">Document Analysis Results</h2>
//                   <div className="documents-list">
//                     {results.map((result) => (
//                       <div
//                         key={result.id}
//                         className={`document-card ${selectedDocument === result.id ? "document-card--selected" : ""}`}
//                         onClick={() => setSelectedDocument(result.id)}
//                       >
//                         <div className="document-card__header">
//                           <div className="document-card__info">
//                             <h3 className="document-card__title">{result.fileName}</h3>
//                             <div className="document-card__meta">
//                               <span className="document-card__time">Processed: {result.processedAt}</span>
//                               <span className="document-card__duration">Duration: {result.processingTime}</span>
//                             </div>
//                           </div>
//                           <div className="document-card__status">
//                             <span className="status-indicator" style={{ color: getStatusColor(result.status) }}>
//                               {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
//                             </span>
//                           </div>
//                         </div>

//                         {result.status === "completed" && (
//                           <div className="document-card__results">
//                             <div className="compliance-score">
//                               <div className="compliance-score__label">Compliance Score</div>
//                               <div
//                                 className="compliance-score__value"
//                                 style={{ color: getScoreColor(result.overallScore) }}
//                               >
//                                 {result.overallScore}%
//                               </div>
//                             </div>
//                             <div className="violations-summary">
//                               <div className="violation-count violation-count--critical">
//                                 <span className="violation-count__number">{result.criticalViolations}</span>
//                                 <span className="violation-count__label">Critical</span>
//                               </div>
//                               <div className="violation-count violation-count--minor">
//                                 <span className="violation-count__number">{result.minorViolations}</span>
//                                 <span className="violation-count__label">Minor</span>
//                               </div>
//                               <div className="violation-count violation-count--warning">
//                                 <span className="violation-count__number">{result.warnings}</span>
//                                 <span className="violation-count__label">Warnings</span>
//                               </div>
//                             </div>
//                           </div>
//                         )}

//                         {result.status === "failed" && (
//                           <div className="document-card__processing">
//                             <div className="processing-indicator">
//                               <span>Analysis failed. Please try uploading again.</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {selectedDocument && (
//                   <div className="violations-section">
//                     <div className="violations-header">
//                       <h2 className="section-title">Compliance Issues</h2>
//                       <div className="violations-filter">
//                         <button
//                           className={`filter-btn ${filterType === "all" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("all")}
//                         >
//                           All ({violations.filter((v) => v.id.startsWith(selectedDocument)).length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "critical" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("critical")}
//                         >
//                           Critical (
//                           {violations.filter((v) => v.type === "critical" && v.id.startsWith(selectedDocument)).length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "minor" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("minor")}
//                         >
//                           Minor (
//                           {violations.filter((v) => v.type === "minor" && v.id.startsWith(selectedDocument)).length})
//                         </button>
//                         <button
//                           className={`filter-btn ${filterType === "warning" ? "filter-btn--active" : ""}`}
//                           onClick={() => setFilterType("warning")}
//                         >
//                           Warnings (
//                           {violations.filter((v) => v.type === "warning" && v.id.startsWith(selectedDocument)).length})
//                         </button>
//                       </div>
//                     </div>

//                     <div className="violations-list">
//                       {filteredViolations.length > 0 ? (
//                         filteredViolations.map((violation) => (
//                           <div key={violation.id} className={`violation-card violation-card--${violation.type}`}>
//                             <div className="violation-card__header">
//                               <div className="violation-card__type">
//                                 <span className={`violation-badge violation-badge--${violation.type}`}>
//                                   {violation.type.charAt(0).toUpperCase() + violation.type.slice(1)}
//                                 </span>
//                                 <span className="violation-card__category">{violation.category}</span>
//                               </div>
//                               <div className="violation-card__reference">{violation.pageReference}</div>
//                             </div>

//                             <div className="violation-card__content">
//                               <h4 className="violation-card__description">{violation.description}</h4>
//                               <div className="violation-card__regulation">
//                                 <strong>SEBI Regulation:</strong> {violation.sebiRegulation}
//                               </div>
//                               <div className="violation-card__recommendation">
//                                 <strong>Recommendation:</strong> {violation.recommendation}
//                               </div>
//                             </div>

//                             <div className="violation-card__actions">
//                               <button className="cds-btn cds-btn--ghost">View Details</button>
//                               <button className="cds-btn cds-btn--secondary">Get Template</button>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No issues found for this document.</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="dashboard__actions">
//                 <button className="cds-btn cds-btn--primary">Download Report</button>
//                 <button className="cds-btn cds-btn--secondary">Export to Excel</button>
//                 <button className="cds-btn cds-btn--ghost">Print Summary</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .dashboard {
//           min-height: 80vh;
//         }

//         .dashboard__container {
//           max-width: 1400px;
//           margin: 0 auto;
//           padding: 0 var(--cds-spacing-05);
//         }

//         .dashboard__header {
//           text-align: center;
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .dashboard__subtitle {
//           color: var(--cds-text-secondary);
//           max-width: 600px;
//           margin: var(--cds-spacing-04) auto 0;
//         }

//         .loading-state,
//         .error-state {
//           text-align: center;
//           padding: var(--cds-spacing-09);
//           color: var(--cds-text-secondary);
//         }

//         .loading-state .processing-spinner {
//           width: 24px;
//           height: 24px;
//           border: 3px solid var(--cds-border-subtle-01);
//           border-top: 3px solid var(--cds-blue-60);
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin: 0 auto var(--cds-spacing-04);
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .dashboard__stats {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//           gap: var(--cds-spacing-05);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .stat-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-06);
//           text-align: center;
//         }

//         .stat-card__value {
//           font-size: 2.5rem;
//           font-weight: 600;
//           color: var(--cds-blue-60);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .stat-card__label {
//           color: var(--cds-text-secondary);
//           font-size: 0.875rem;
//         }

//         .dashboard__content {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: var(--cds-spacing-07);
//           margin-bottom: var(--cds-spacing-08);
//         }

//         .section-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-05);
//           color: var(--cds-text-primary);
//         }

//         .documents-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//         }

//         .document-card {
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           cursor: pointer;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .document-card:hover {
//           border-color: var(--cds-blue-60);
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .document-card--selected {
//           border-color: var(--cds-blue-60);
//           background-color: rgba(15, 98, 254, 0.05);
//         }

//         .document-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .document-card__title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-02);
//         }

//         .document-card__meta {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-01);
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//         }

//         .status-indicator {
//           font-weight: 600;
//           font-size: 0.875rem;
//         }

//         .document-card__results {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .compliance-score {
//           text-align: center;
//         }

//         .compliance-score__label {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .compliance-score__value {
//           font-size: 2rem;
//           font-weight: 600;
//         }

//         .violations-summary {
//           display: flex;
//           gap: var(--cds-spacing-04);
//         }

//         .violation-count {
//           text-align: center;
//         }

//         .violation-count__number {
//           display: block;
//           font-size: 1.5rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .violation-count__label {
//           font-size: 0.75rem;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-count--critical .violation-count__number {
//           color: var(--cds-support-error);
//         }

//         .violation-count--minor .violation-count__number {
//           color: var(--cds-support-warning);
//         }

//         .violation-count--warning .violation-count__number {
//           color: var(--cds-support-info);
//         }

//         .document-card__processing {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-03);
//         }

//         .processing-indicator {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//           color: var(--cds-text-secondary);
//         }

//         .violations-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violations-filter {
//           display: flex;
//           gap: var(--cds-spacing-02);
//         }

//         .filter-btn {
//           background: none;
//           border: 1px solid var(--cds-border-subtle-01);
//           color: var(--cds-text-secondary);
//           padding: var(--cds-spacing-02) var(--cds-spacing-03);
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 0.875rem;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .filter-btn:hover {
//           background-color: var(--cds-background-hover);
//         }

//         .filter-btn--active {
//           background-color: var(--cds-blue-60);
//           color: var(--cds-text-on-color);
//           border-color: var(--cds-blue-60);
//         }

//         .violations-list {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//           max-height: 600px;
//           overflow-y: auto;
//         }

//         .violation-card {
//           background-color: var(--cds-layer-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//           border-left: 4px solid;
//         }

//         .violation-card--critical {
//           border-left-color: var(--cds-support-error);
//         }

//         .violation-card--minor {
//           border-left-color: var(--cds-support-warning);
//         }

//         .violation-card--warning {
//           border-left-color: var(--cds-support-info);
//         }

//         .violation-card__header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: var(--cds-spacing-04);
//         }

//         .violation-card__type {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//         }

//         .violation-badge {
//           padding: var(--cds-spacing-01) var(--cds-spacing-03);
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .violation-badge--critical {
//           background-color: var(--cds-support-error);
//           color: var(--cds-text-on-color);
//         }

//         .violation-badge--minor {
//           background-color: var(--cds-support-warning);
//           color: var(--cds-text-primary);
//         }

//         .violation-badge--warning {
//           background-color: var(--cds-support-info);
//           color: var(--cds-text-on-color);
//         }

//         .violation-card__category {
//           font-weight: 500;
//           color: var(--cds-text-primary);
//         }

//         .violation-card__reference {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           font-style: italic;
//         }

//         .violation-card__content {
//           margin-bottom: var(--cds-spacing-05);
//         }

//         .violation-card__description {
//           font-size: 1rem;
//           font-weight: 500;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-03);
//         }

//         .violation-card__regulation,
//         .violation-card__recommendation {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           margin-bottom: var(--cds-spacing-02);
//           line-height: 1.4;
//         }

//         .violation-card__actions {
//           display: flex;
//           gap: var(--cds-spacing-03);
//         }

//         .dashboard__actions {
//           display: flex;
//           justify-content: center;
//           gap: var(--cds-spacing-04);
//           padding-top: var(--cds-spacing-07);
//           border-top: 1px solid var(--cds-border-subtle-01);
//         }

//         @media (max-width: 1024px) {
//           .dashboard__content {
//             grid-template-columns: 1fr;
//           }

//           .violations-filter {
//             flex-wrap: wrap;
//           }
//         }

//         @media (max-width: 768px) {
//           .dashboard__stats {
//             grid-template-columns: repeat(2, 1fr);
//           }

//           .document-card__header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-02);
//           }

//           .document-card__results {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-04);
//           }

//           .violations-summary {
//             justify-content: space-around;
//             width: 100%;
//           }

//           .violations-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-03);
//           }

//           .dashboard__actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </Layout>
//   )
// }