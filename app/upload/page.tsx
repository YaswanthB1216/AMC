// "use client"

// import type React from "react"
// import { useState, useCallback } from "react"
// import { useRouter } from "next/navigation"
// import Layout from "../../components/layout"
// import { doc, setDoc, Timestamp } from "firebase/firestore"
// import { db } from "../../lib/firebase"

// interface UploadedFile {
//   id: string
//   file: File
//   progress: number
//   status: "pending" | "uploading" | "completed" | "error"
//   error?: string
// }

// interface Issue {
//   clause: string
//   issue: string
//   fix: string
//   reference?: string // Made optional to handle missing reference
// }

// interface DocumentAnalysis {
//   fileName: string
//   response: {
//     issues: Issue[]
//     raw_response: string[]
//   }
//   uploadDate: Timestamp
//   status: "completed" | "failed"
//   processingTime: string
// }

// export default function UploadPage() {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
//   const [isDragOver, setIsDragOver] = useState(false)
//   const [isUploading, setIsUploading] = useState(false)
//   const router = useRouter()

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragOver(true)
//   }, [])

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragOver(false)
//   }, [])

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragOver(false)

//     const files = Array.from(e.dataTransfer.files)
//     handleFiles(files)
//   }, [])

//   const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files)
//       handleFiles(files)
//     }
//   }, [])

//   const handleFiles = (files: File[]) => {
//     const validFiles = files.filter((file) => {
//       if (file.type !== "application/pdf") {
//         alert(`${file.name} is not a PDF file. Only PDF files are allowed.`)
//         return false
//       }
//       if (file.size > 10 * 1024 * 1024) {
//         alert(`${file.name} is too large. Maximum file size is 10MB.`)
//         return false
//       }
//       return true
//     })

//     if (uploadedFiles.length + validFiles.length > 5) {
//       alert("Maximum 5 files allowed per upload.")
//       return
//     }

//     const newFiles: UploadedFile[] = validFiles.map((file) => ({
//       id: Math.random().toString(36).substr(2, 9),
//       file,
//       progress: 0,
//       status: "pending",
//     }))

//     setUploadedFiles((prev) => [...prev, ...newFiles])
//   }

//   const removeFile = (id: string) => {
//     setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
//   }

//   const sanitizeFileName = (fileName: string) => {
//     // Remove invalid Firestore document ID characters, trim, and append unique timestamp
//     const baseName = fileName
//       .replace(/[^a-zA-Z0-9.-]/g, "_")
//       .replace(/\.\./g, "_")
//       .replace(/^\.+|\.+$/g, "") // Remove leading/trailing dots
//       .slice(0, 90)
//     const timestamp = Date.now()
//     return `${baseName}_${timestamp}_${Math.random().toString(36).substr(2, 4)}`
//   }

//   const handleApiCall = async (file: File) => {
//     try {
//       const formData = new FormData()
//       formData.append("file", file)

//       const startTime = Date.now()
//       const response = await fetch("http://localhost:8000/check_compliance", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         throw new Error(`API call failed for ${file.name}: ${response.statusText}`)
//       }

//       const data = await response.json()
//       console.log("API response for", file.name, JSON.stringify(data, null, 2))

//       // Validate API response structure
//       if (!data || !Array.isArray(data.issues) || !Array.isArray(data.raw_response)) {
//         console.error("Invalid API response structure:", data)
//         throw new Error(`Invalid API response format for ${file.name}: Missing or invalid issues/raw_response arrays`)
//       }

//       // Validate each issue object
//       const invalidIssues = data.issues.map((issue: any, index: number) => {
//         if (!issue ||
//             typeof issue.clause !== "string" ||
//             typeof issue.issue !== "string" ||
//             typeof issue.fix !== "string" ||
//             (issue.reference !== undefined && typeof issue.reference !== "string")) {
//           return { index, issue };
//         }
//         return null;
//       }).filter(Boolean);

//       if (invalidIssues.length > 0) {
//         console.error("Invalid issues in API response:", invalidIssues);
//         throw new Error(`Invalid API response format for ${file.name}: Issues array contains invalid objects at indices ${invalidIssues.map(i => i.index).join(", ")}`);
//       }

//       // Validate raw_response contains strings
//       const invalidRawResponses = data.raw_response.map((item: any, index: number) => {
//         if (typeof item !== "string") {
//           return { index, item };
//         }
//         return null;
//       }).filter(Boolean);

//       if (invalidRawResponses.length > 0) {
//         console.error("Invalid raw_response in API response:", invalidRawResponses);
//         throw new Error(`Invalid API response format for ${file.name}: raw_response contains non-string items at indices ${invalidRawResponses.map(i => i.index).join(", ")}`);
//       }

//       const processingTime = ((Date.now() - startTime) / 1000).toFixed(2) + "s"
//       return { fileName: file.name, response: data, processingTime }
//     } catch (error) {
//       console.error("API call failed for file:", file.name, error);
//       throw error
//     }
//   }

//   const handleUploadAll = async () => {
//     if (uploadedFiles.length === 0) return

//     setIsUploading(true)

//     try {
//       for (const uploadedFile of uploadedFiles.filter((f) => f.status === "pending")) {
//         setUploadedFiles((prev) =>
//           prev.map((file) =>
//             file.id === uploadedFile.id
//               ? { ...file, status: "uploading" as const, progress: 0 }
//               : file
//           )
//         )

//         try {
//           // Make API call
//           const { fileName, response, processingTime } = await handleApiCall(uploadedFile.file)

//           // Simulate progress for UI
//           for (let progress = 0; progress <= 100; progress += 10) {
//             await new Promise((resolve) => setTimeout(resolve, 200))
//             setUploadedFiles((prev) =>
//               prev.map((file) =>
//                 file.id === uploadedFile.id ? { ...file, progress } : file
//               )
//             )
//           }

//           // Store API response in Firestore
//           const sanitizedFileName = sanitizeFileName(fileName)
//           const analysis: DocumentAnalysis = {
//             fileName,
//             response: {
//               issues: response.issues,
//               raw_response: response.raw_response,
//             },
//             uploadDate: Timestamp.now(),
//             status: "completed",
//             processingTime,
//           }

//           try {
//             await setDoc(doc(db, "amc", sanitizedFileName), analysis)
//             console.log("Successfully stored document in Firestore:", sanitizedFileName);
//           } catch (firestoreError) {
//             console.error("Firestore write failed for:", fileName, firestoreError)
//             throw new Error(`Failed to store document for ${fileName} in Firestore`)
//           }

//           setUploadedFiles((prev) =>
//             prev.map((file) =>
//               file.id === uploadedFile.id
//                 ? { ...file, status: "completed" as const, progress: 100 }
//                 : file
//             )
//           )
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error"
//           console.error("Error processing file:", uploadedFile.file.name, errorMessage)
//           setUploadedFiles((prev) =>
//             prev.map((file) =>
//               file.id === uploadedFile.id
//                 ? { ...file, status: "error" as const, error: errorMessage }
//                 : file
//             )
//           )

//           // Store error in Firestore
//           const sanitizedFileName = sanitizeFileName(uploadedFile.file.name)
//           const analysis: DocumentAnalysis = {
//             fileName: uploadedFile.file.name,
//             response: { issues: [], raw_response: [] },
//             uploadDate: Timestamp.now(),
//             status: "failed",
//             processingTime: "0s",
//           }

//           try {
//             await setDoc(doc(db, "amc", sanitizedFileName), analysis)
//             console.log("Stored error document in Firestore:", sanitizedFileName);
//           } catch (firestoreError) {
//             console.error("Firestore write failed for error document:", uploadedFile.file.name, firestoreError)
//           }
//         }
//       }

//       setTimeout(() => {
//         router.push("/dashboard")
//       }, 1000)
//     } catch (error) {
//       console.error("Upload process error:", error)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return "0 Bytes"
//     const k = 1024
//     const sizes = ["Bytes", "KB", "MB", "GB"]
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
//   }

//   return (
//     <Layout>
//       <div className="upload-page">
//         <div className="upload-page__container">
//           <div className="upload-page__header">
//             <h1 className="cds-heading-05">Upload Documents</h1>
//             <p className="cds-body-02 upload-page__subtitle">
//               Upload your mutual fund documents for SEBI compliance analysis. Only PDF files are accepted (max 10MB per
//               file, 5 files total).
//             </p>
//           </div>

//           <div className="upload-section">
//             <div
//               className={`upload-dropzone ${isDragOver ? "upload-dropzone--active" : ""}`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               <div className="upload-dropzone__content">
//                 <div className="upload-dropzone__icon">
//                   <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
//                     <path d="M24 8L32 16H28V28H20V16H16L24 8Z" fill="var(--cds-blue-60)" />
//                     <path
//                       d="M8 32V40H40V32H44V40C44 42.2 42.2 44 40 44H8C5.8 44 4 42.2 4 40V32H8Z"
//                       fill="var(--cds-blue-60)"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="upload-dropzone__title">Drag and drop your PDF files here</h3>
//                 <p className="upload-dropzone__subtitle">or click to browse files</p>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf"
//                   onChange={handleFileInput}
//                   className="upload-dropzone__input"
//                   id="file-input"
//                 />
//                 <label htmlFor="file-input" className="cds-btn cds-btn--primary">
//                   Choose Files
//                 </label>
//               </div>
//             </div>

//             {uploadedFiles.length > 0 && (
//               <div className="file-list">
//                 <h3 className="file-list__title">Uploaded Files ({uploadedFiles.length}/5)</h3>
//                 <div className="file-list__items">
//                   {uploadedFiles.map((uploadedFile) => (
//                     <div key={uploadedFile.id} className="file-item">
//                       <div className="file-item__info">
//                         <div className="file-item__icon">
//                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                             <path
//                               d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
//                               fill="var(--cds-red-60)"
//                             />
//                             <path d="M14 2V8H20" fill="var(--cds-background)" />
//                           </svg>
//                         </div>
//                         <div className="file-item__details">
//                           <div className="file-item__name">{uploadedFile.file.name}</div>
//                           <div className="file-item__size">{formatFileSize(uploadedFile.file.size)}</div>
//                           {uploadedFile.status === "error" && uploadedFile.error && (
//                             <div className="file-item__error" style={{ color: "var(--cds-red-60)" }}>
//                               {uploadedFile.error}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="file-item__status">
//                         {uploadedFile.status === "pending" && (
//                           <span className="status-badge status-badge--pending">Pending</span>
//                         )}
//                         {uploadedFile.status === "uploading" && (
//                           <div className="file-item__progress">
//                             <div className="cds-progress-bar">
//                               <div
//                                 className="cds-progress-bar__fill"
//                                 style={{ width: `${uploadedFile.progress}%` }}
//                               ></div>
//                             </div>
//                             <span className="file-item__progress-text">{uploadedFile.progress}%</span>
//                           </div>
//                         )}
//                         {uploadedFile.status === "completed" && (
//                           <span className="status-badge status-badge--success">Completed</span>
//                         )}
//                         {uploadedFile.status === "error" && (
//                           <span className="status-badge status-badge--error">Error</span>
//                         )}
//                       </div>

//                       <button
//                         className="file-item__remove"
//                         onClick={() => removeFile(uploadedFile.id)}
//                         aria-label="Remove file"
//                         disabled={uploadedFile.status === "uploading"}
//                       >
//                         <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
//                           <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                         </svg>
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="upload-actions">
//                   <button
//                     className="cds-btn cds-btn--primary"
//                     onClick={handleUploadAll}
//                     disabled={isUploading || uploadedFiles.every((f) => f.status === "completed")}
//                   >
//                     {isUploading ? "Analyzing..." : "Start Analysis"}
//                   </button>
//                   <button
//                     className="cds-btn cds-btn--ghost"
//                     onClick={() => setUploadedFiles([])}
//                     disabled={isUploading}
//                   >
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="upload-info">
//             <h3 className="upload-info__title">Upload Guidelines</h3>
//             <ul className="upload-info__list">
//               <li>Only PDF files are accepted</li>
//               {/* <li>Maximum file size: 10MB per file</li> */}
//               <li>Maximum 5 files per upload session</li>
//               <li>Files will be analyzed against current SEBI guidelines</li>
//               <li>Analysis typically takes 1-2 minutes per document</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .upload-page {
//           min-height: 80vh;
//         }

//         .upload-page__container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 var(--cds-spacing-05);
//         }

//         .upload-page__header {
//           text-align: center;
//           margin-bottom: var(--cds-spacing-09);
//         }

//         .upload-page__subtitle {
//           color: var(--cds-text-secondary);
//           max-width: 600px;
//           margin: var(--cds-spacing-04) auto 0;
//         }

//         .upload-section {
//           margin-bottom: var(--cds-spacing-09);
//         }

//         .upload-dropzone {
//           border: 2px dashed var(--cds-border-subtle-02);
//           border-radius: 8px;
//           padding: var(--cds-spacing-09);
//           text-align: center;
//           background-color: var(--cds-layer-01);
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//           position: relative;
//         }

//         .upload-dropzone--active {
//           border-color: var(--cds-blue-60);
//           background-color: rgba(15, 98, 254, 0.05);
//         }

//         .upload-dropzone__content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: var(--cds-spacing-04);
//         }

//         .upload-dropzone__icon {
//           opacity: 0.6;
//         }

//         .upload-dropzone__title {
//           font-size: 1.25rem;
//           font-weight: 500;
//           color: var(--cds-text-primary);
//         }

//         .upload-dropzone__subtitle {
//           color: var(--cds-text-secondary);
//         }

//         .upload-dropzone__input {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//           cursor: pointer;
//         }

//         .file-list {
//           margin-top: var(--cds-spacing-07);
//           background-color: var(--cds-layer-02);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-05);
//         }

//         .file-list__title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-05);
//           color: var(--cds-text-primary);
//         }

//         .file-list__items {
//           display: flex;
//           flex-direction: column;
//           gap: var(--cds-spacing-04);
//           margin-bottom: var(--cds-spacing-06);
//         }

//         .file-item {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: var(--cds-spacing-04);
//           background-color: var(--cds-layer-01);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 4px;
//         }

//         .file-item__info {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//           flex: 1;
//         }

//         .file-item__details {
//           flex: 1;
//         }

//         .file-item__name {
//           font-weight: 500;
//           color: var(--cds-text-primary);
//           margin-bottom: var(--cds-spacing-01);
//         }

//         .file-item__size {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//         }

//         .file-item__error {
//           font-size: 0.75rem;
//           margin-top: var(--cds-spacing-01);
//         }

//         .file-item__status {
//           margin-right: var(--cds-spacing-04);
//         }

//         .file-item__progress {
//           display: flex;
//           align-items: center;
//           gap: var(--cds-spacing-03);
//           min-width: 120px;
//         }

//         .file-item__progress-text {
//           font-size: 0.875rem;
//           color: var(--cds-text-secondary);
//           min-width: 35px;
//         }

//         .file-item__remove {
//           background: none;
//           border: none;
//           color: var(--cds-text-secondary);
//           cursor: pointer;
//           padding: var(--cds-spacing-02);
//           border-radius: 4px;
//           transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
//         }

//         .file-item__remove:hover {
//           background-color: var(--cds-background-hover);
//           color: var(--cds-red-60);
//         }

//         .file-item__remove:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .status-badge {
//           padding: var(--cds-spacing-01) var(--cds-spacing-03);
//           border-radius: 12px;
//           font-size: 0.75rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .status-badge--pending {
//           background-color: var(--cds-yellow-30);
//           color: var(--cds-text-primary);
//         }

//         .status-badge--success {
//           background-color: var(--cds-green-60);
//           color: var(--cds-text-on-color);
//         }

//         .status-badge--error {
//           background-color: var(--cds-red-60);
//           color: var(--cds-text-on-color);
//         }

//         .upload-actions {
//           display: flex;
//           gap: var(--cds-spacing-04);
//           justify-content: center;
//         }

//         .upload-info {
//           background-color: var(--cds-layer-01);
//           border: 1px solid var(--cds-border-subtle-01);
//           border-radius: 8px;
//           padding: var(--cds-spacing-06);
//         }

//         .upload-info__title {
//           font-size: 1.125rem;
//           font-weight: 600;
//           margin-bottom: var(--cds-spacing-04);
//           color: var(--cds-text-primary);
//         }

//         .upload-info__list {
//           list-style: none;
//           padding: 0;
//         }

//         .upload-info__list li {
//           padding: var(--cds-spacing-02) 0;
//           color: var(--cds-text-secondary);
//           position: relative;
//           padding-left: var(--cds-spacing-05);
//         }

//         .upload-info__list li::before {
//           content: '•';
//           color: var(--cds-blue-60);
//           position: absolute;
//           left: 0;
//         }

//         @media (max-width: 768px) {
//           .upload-dropzone {
//             padding: var(--cds-spacing-06);
//           }

//           .file-item {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: var(--cds-spacing-03);
//           }

//           .file-item__status {
//             margin-right: 0;
//             align-self: stretch;
//           }

//           .upload-actions {
//             flex-direction: column;
//           }
//         }
//       `}</style>
//     </Layout>
//   )
// }

"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Layout from "../../components/layout"
import { doc, setDoc, Timestamp } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { jsPDF } from "jspdf"

interface UploadedFile {
  id: string
  file: File
  progress: number
  status: "pending" | "uploading" | "completed" | "error"
  error?: string
  isText?: boolean
}

interface Issue {
  clause: string
  issue: string
  fix: string
  reference?: string
}

interface DocumentAnalysis {
  fileName: string
  response: {
    issues: Issue[]
    raw_response: string[]
  }
  uploadDate: Timestamp
  status: "completed" | "failed"
  processingTime: string
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [pastedText, setPastedText] = useState("")
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }, [])

  const createPdfFromText = (text: string): File => {
    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.text(text, 10, 10)
    const pdfBlob = doc.output("blob")
    return new File([pdfBlob], `pasted_text_${Date.now()}.pdf`, { type: "application/pdf" })
  }

  const handleFiles = (files: File[], isText: boolean = false) => {
    const validFiles = files.filter((file) => {
      if (file.type !== "application/pdf") {
        alert(`${file.name} is not a PDF file. Only PDF files are allowed.`)
        return false
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`)
        return false
      }
      return true
    })

    if (uploadedFiles.length + validFiles.length > 5) {
      alert("Maximum 5 files allowed per upload.")
      return
    }

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "pending",
      isText,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handlePasteText = () => {
    if (!pastedText.trim()) {
      alert("Please enter some text to analyze.")
      return
    }

    if (pastedText.length > 10000) {
      alert("Pasted text is too long. Maximum 10,000 characters allowed.")
      return
    }

    const pdfFile = createPdfFromText(pastedText)
    handleFiles([pdfFile], true)
    setPastedText("")
  }

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const sanitizeFileName = (fileName: string) => {
    const baseName = fileName
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.\./g, "_")
      .replace(/^\.+|\.+$/g, "")
      .slice(0, 90)
    const timestamp = Date.now()
    return `${baseName}_${timestamp}_${Math.random().toString(36).substr(2, 4)}`
  }

  const handleApiCall = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const startTime = Date.now()
      const response = await fetch("http://localhost:8000/check_compliance", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API call failed for ${file.name}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("API response for", file.name, JSON.stringify(data, null, 2))

      if (!data || !Array.isArray(data.issues) || !Array.isArray(data.raw_response)) {
        console.error("Invalid API response structure:", data)
        throw new Error(`Invalid API response format for ${file.name}: Missing or invalid issues/raw_response arrays`)
      }

      const invalidIssues = data.issues.map((issue: any, index: number) => {
        if (
          !issue ||
          typeof issue.clause !== "string" ||
          typeof issue.issue !== "string" ||
          typeof issue.fix !== "string" ||
          (issue.reference !== undefined && typeof issue.reference !== "string")
        ) {
          return { index, issue }
        }
        return null
      }).filter(Boolean)

      if (invalidIssues.length > 0) {
        console.error("Invalid issues in API response:", invalidIssues)
        throw new Error(`Invalid API response format for ${file.name}: Issues array contains invalid objects at indices ${invalidIssues.map((i) => i.index).join(", ")}`)
      }

      const invalidRawResponses = data.raw_response.map((item: any, index: number) => {
        if (typeof item !== "string") {
          return { index, item }
        }
        return null
      }).filter(Boolean)

      if (invalidRawResponses.length > 0) {
        console.error("Invalid raw_response in API response:", invalidRawResponses)
        throw new Error(`Invalid API response format for ${file.name}: raw_response contains non-string items at indices ${invalidRawResponses.map((i) => i.index).join(", ")}`)
      }

      const processingTime = ((Date.now() - startTime) / 1000).toFixed(2) + "s"
      return { fileName: file.name, response: data, processingTime }
    } catch (error) {
      console.error("API call failed for file:", file.name, error)
      throw error
    }
  }

  const handleUploadAll = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)

    try {
      for (const uploadedFile of uploadedFiles.filter((f) => f.status === "pending")) {
        setUploadedFiles((prev) =>
          prev.map((file) =>
            file.id === uploadedFile.id
              ? { ...file, status: "uploading" as const, progress: 0 }
              : file
          )
        )

        try {
          const { fileName, response, processingTime } = await handleApiCall(uploadedFile.file)

          for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 200))
            setUploadedFiles((prev) =>
              prev.map((file) =>
                file.id === uploadedFile.id ? { ...file, progress } : file
              )
            )
          }

          const sanitizedFileName = sanitizeFileName(fileName)
          const analysis: DocumentAnalysis = {
            fileName,
            response: {
              issues: response.issues,
              raw_response: response.raw_response,
            },
            uploadDate: Timestamp.now(),
            status: "completed",
            processingTime,
          }

          try {
            await setDoc(doc(db, "amc", sanitizedFileName), analysis)
            console.log("Successfully stored document in Firestore:", sanitizedFileName)
          } catch (firestoreError) {
            console.error("Firestore write failed for:", fileName, firestoreError)
            throw new Error(`Failed to store document for ${fileName} in Firestore`)
          }

          setUploadedFiles((prev) =>
            prev.map((file) =>
              file.id === uploadedFile.id
                ? { ...file, status: "completed" as const, progress: 100 }
                : file
            )
          )
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error"
          console.error("Error processing file:", uploadedFile.file.name, errorMessage)
          setUploadedFiles((prev) =>
            prev.map((file) =>
              file.id === uploadedFile.id
                ? { ...file, status: "error" as const, error: errorMessage }
                : file
            )
          )

          const sanitizedFileName = sanitizeFileName(uploadedFile.file.name)
          const analysis: DocumentAnalysis = {
            fileName: uploadedFile.file.name,
            response: { issues: [], raw_response: [] },
            uploadDate: Timestamp.now(),
            status: "failed",
            processingTime: "0s",
          }

          try {
            await setDoc(doc(db, "amc", sanitizedFileName), analysis)
            console.log("Stored error document in Firestore:", sanitizedFileName)
          } catch (firestoreError) {
            console.error("Firestore write failed for error document:", uploadedFile.file.name, firestoreError)
          }
        }
      }

      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      console.error("Upload process error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Layout>
      <div className="upload-page">
        <div className="upload-page__container">
          <div className="upload-page__header">
            <h1 className="cds-heading-05">Upload Documents</h1>
            <p className="cds-body-02 upload-page__subtitle">
              Upload your mutual fund documents or paste text for SEBI compliance analysis. Only PDF files are accepted for uploads (max 10MB per file, 5 items total).
            </p>
          </div>

          <div className="upload-section">
            <div
              className={`upload-dropzone ${isDragOver ? "upload-dropzone--active" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-dropzone__content">
                <div className="upload-dropzone__icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8L32 16H28V28H20V16H16L24 8Z" fill="var(--cds-blue-60)" />
                    <path
                      d="M8 32V40H40V32H44V40C44 42.2 42.2 44 40 44H8C5.8 44 4 42.2 4 40V32H8Z"
                      fill="var(--cds-blue-60)"
                    />
                  </svg>
                </div>
                <h3 className="upload-dropzone__title">Drag and drop your PDF files here</h3>
                <p className="upload-dropzone__subtitle">or click to browse files</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="upload-dropzone__input"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cds-btn cds-btn--primary">
                  Choose Files
                </label>
              </div>
            </div>

            <div className="or-separation">
              <h1>OR</h1>
            </div>

            <div className="text-input-section">
              <h3 className="text-input__title">Paste Document Text</h3>
              <textarea
                className="text-input__textarea"
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your document text here for analysis..."
                rows={6}
              />
              <div className="text-input__actions">
                <button
                  className="cds-btn cds-btn--primary"
                  onClick={handlePasteText}
                  disabled={isUploading || pastedText.trim().length === 0}
                >
                  Analyze Text
                </button>
                <button
                  className="cds-btn cds-btn--ghost"
                  onClick={() => setPastedText("")}
                  disabled={isUploading || pastedText.length === 0}
                >
                  Clear Text
                </button>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="file-list">
                <h3 className="file-list__title">Uploaded Items ({uploadedFiles.length}/5)</h3>
                <div className="file-list__items">
                  {uploadedFiles.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="file-item">
                      <div className="file-item__info">
                        <div className="file-item__icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                              fill="var(--cds-red-60)"
                            />
                            <path d="M14 2V8H20" fill="var(--cds-background)" />
                          </svg>
                        </div>
                        <div className="file-item__details">
                          <div className="file-item__name">
                            {uploadedFile.isText ? "Pasted Text Document" : uploadedFile.file.name}
                          </div>
                          <div className="file-item__size">{formatFileSize(uploadedFile.file.size)}</div>
                          {uploadedFile.status === "error" && uploadedFile.error && (
                            <div className="file-item__error" style={{ color: "var(--cds-red-60)" }}>
                              {uploadedFile.error}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="file-item__status">
                        {uploadedFile.status === "pending" && (
                          <span className="status-badge status-badge--pending">Pending</span>
                        )}
                        {uploadedFile.status === "uploading" && (
                          <div className="file-item__progress">
                            <div className="cds-progress-bar">
                              <div
                                className="cds-progress-bar__fill"
                                style={{ width: `${uploadedFile.progress}%` }}
                              ></div>
                            </div>
                            <span className="file-item__progress-text">{uploadedFile.progress}%</span>
                          </div>
                        )}
                        {uploadedFile.status === "completed" && (
                          <span className="status-badge status-badge--success">Completed</span>
                        )}
                        {uploadedFile.status === "error" && (
                          <span className="status-badge status-badge--error">Error</span>
                        )}
                      </div>

                      <button
                        className="file-item__remove"
                        onClick={() => removeFile(uploadedFile.id)}
                        aria-label="Remove item"
                        disabled={uploadedFile.status === "uploading"}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="upload-actions">
                  <button
                    className="cds-btn cds-btn--primary"
                    onClick={handleUploadAll}
                    disabled={isUploading || uploadedFiles.every((f) => f.status === "completed")}
                  >
                    {isUploading ? "Analyzing..." : "Start Analysis"}
                  </button>
                  <button
                    className="cds-btn cds-btn--ghost"
                    onClick={() => setUploadedFiles([])}
                    disabled={isUploading}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="upload-info">
            <h3 className="upload-info__title">Upload Guidelines</h3>
            <ul className="upload-info__list">
              <li>Only PDF files are accepted for uploads</li>
              <li>Pasted text must be under 10,000 characters</li>
              <li>Maximum 5 items (files or pasted text) per upload session</li>
              <li>Files will be analyzed against current SEBI guidelines</li>
              <li>Analysis typically takes 1-2 minutes per item</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .upload-page {
          min-height: 80vh;
        }

        .upload-page__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--cds-spacing-05);
        }

        .upload-page__header {
          text-align: center;
          margin-bottom: var(--cds-spacing-09);
        }

        .upload-page__subtitle {
          color: var(--cds-text-secondary);
          max-width: 600px;
          margin: var(--cds-spacing-04) auto 0;
        }

        .upload-section {
          margin-bottom: var(--cds-spacing-09);
        }

        .upload-dropzone {
          border: 2px dashed var(--cds-border-subtle-02);
          border-radius: 8px;
          padding: var(--cds-spacing-09);
          text-align: center;
          background-color: var(--cds-layer-01);
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
          position: relative;
          margin-bottom: var(--cds-spacing-06);
        }

        .upload-dropzone--active {
          border-color: var(--cds-blue-60);
          background-color: rgba(15, 98, 254, 0.05);
        }

        .upload-dropzone__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--cds-spacing-04);
        }

        .upload-dropzone__icon {
          opacity: 0.6;
        }

        .upload-dropzone__title {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--cds-text-primary);
        }

        .upload-dropzone__subtitle {
          color: var(--cds-text-secondary);
        }

        .upload-dropzone__input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .text-input-section {
          background-color: var(--cds-layer-01);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          padding: var(--cds-spacing-06);
          margin-bottom: var(--cds-spacing-06);
        }

        .text-input__title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-04);
          color: var(--cds-text-primary);
        }

        .text-input__textarea {
          width: 100%;
          padding: var(--cds-spacing-04);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
          font-size: 0.875rem;
          color: var(--cds-text-primary);
          background-color: var(--cds-layer-02);
        }

        .text-input__textarea:focus {
          outline: 2px solid var(--cds-blue-60);
          outline-offset: 2px;
        }

        .text-input__actions {
          display: flex;
          gap: var(--cds-spacing-04);
          margin-top: var(--cds-spacing-04);
          justify-content: center;
        }

        .file-list {
          margin-top: var(--cds-spacing-07);
          background-color: var(--cds-layer-02);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          padding: var(--cds-spacing-05);
        }

        .file-list__title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-05);
          color: var(--cds-text-primary);
        }

        .file-list__items {
          display: flex;
          flex-direction: column;
          gap: var(--cds-spacing-04);
          margin-bottom: var(--cds-spacing-06);
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--cds-spacing-04);
          background-color: var(--cds-layer-01);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 4px;
        }

        .file-item__info {
          display: flex;
          align-items: center;
          gap: var(--cds-spacing-03);
          flex: 1;
        }

        .file-item__details {
          flex: 1;
        }

        .file-item__name {
          font-weight: 500;
          color: var(--cds-text-primary);
          margin-bottom: var(--cds-spacing-01);
        }

        .file-item__size {
          font-size: 0.875rem;
          color: var(--cds-text-secondary);
        }

        .file-item__error {
          font-size: 0.75rem;
          margin-top: var(--cds-spacing-01);
        }

        .file-item__status {
          margin-right: var(--cds-spacing-04);
        }

        .file-item__progress {
          display: flex;
          align-items: center;
          gap: var(--cds-spacing-03);
          min-width: 120px;
        }

        .file-item__progress-text {
          font-size: 0.875rem;
          color: var(--cds-text-secondary);
          min-width: 35px;
        }

        .file-item__remove {
          background: none;
          border: none;
          color: var(--cds-text-secondary);
          cursor: pointer;
          padding: var(--cds-spacing-02);
          border-radius: 4px;
          transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
        }

        .file-item__remove:hover {
          background-color: var(--cds-background-hover);
          color: var(--cds-red-60);
        }

        .file-item__remove:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status-badge {
          padding: var(--cds-spacing-01) var(--cds-spacing-03);
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge--pending {
          background-color: var(--cds-yellow-30);
          color: var(--cds-text-primary);
        }

        .status-badge--success {
          background-color: var(--cds-green-60);
          color: var(--cds-text-on-color);
        }

        .status-badge--error {
          background-color: var(--cds-red-60);
          color: var(--cds-text-on-color);
        }

        .upload-actions {
          display: flex;
          gap: var(--cds-spacing-04);
          justify-content: center;
        }

        .upload-info {
          background-color: var(--cds-layer-01);
          border: 1px solid var(--cds-border-subtle-01);
          border-radius: 8px;
          padding: var(--cds-spacing-06);
        }

        .upload-info__title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: var(--cds-spacing-04);
          color: var(--cds-text-primary);
        }

        .upload-info__list {
          list-style: none;
          padding: 0;
        }

        .upload-info__list li {
          padding: var(--cds-spacing-02) 0;
          color: var(--cds-text-secondary);
          position: relative;
          padding-left: var(--cds-spacing-05);
        }

        .upload-info__list li::before {
          content: "•";
          color: var(--cds-blue-60);
          position: absolute;
          left: 0;
        }

        @media (max-width: 768px) {
          .upload-dropzone {
            padding: var(--cds-spacing-06);
          }

          .file-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--cds-spacing-03);
          }

          .file-item__status {
            margin-right: 0;
            align-self: stretch;
          }

          .upload-actions {
            flex-direction: column;
          }

          .text-input__actions {
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  )
}