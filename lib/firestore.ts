import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy, 
    where,
    Timestamp,
    getDoc
  } from 'firebase/firestore'
  import { db } from './firebase'
  
  // Types for our data
  export interface DocumentAnalysis {
    id?: string
    fileName: string
    uploadDate: Timestamp
    status: 'processing' | 'completed' | 'failed'
    complianceScore: number
    criticalIssues: number
    minorIssues: number
    warnings: number
    processingTime: string
    fileUrl?: string
    userId?: string
  }
  
  export interface ViolationDetail {
    id?: string
    documentId: string
    type: 'critical' | 'minor' | 'warning'
    category: string
    description: string
    pageReference: string
    sebiRegulation: string
    recommendation: string
    isResolved: boolean
    createdAt: Timestamp
  }
  
  export interface Recommendation {
    id?: string
    violationId: string
    documentId: string
    type: 'critical' | 'minor' | 'warning'
    title: string
    currentText: string
    recommendedText: string
    explanation: string
    sebiReference: string
    templateAvailable: boolean
    isImplemented: boolean
    createdAt: Timestamp
  }
  
  // Document Analysis Functions
  export const addDocumentAnalysis = async (analysis: Omit<DocumentAnalysis, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'documentAnalyses'), {
        ...analysis,
        uploadDate: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding document analysis:', error)
      throw error
    }
  }
  
  export const getDocumentAnalyses = async (userId?: string) => {
    try {
      let q = query(collection(db, 'documentAnalyses'), orderBy('uploadDate', 'desc'))
      
      if (userId) {
        q = query(collection(db, 'documentAnalyses'), 
          where('userId', '==', userId), 
          orderBy('uploadDate', 'desc')
        )
      }
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DocumentAnalysis[]
    } catch (error) {
      console.error('Error getting document analyses:', error)
      throw error
    }
  }
  
  export const updateDocumentAnalysis = async (id: string, updates: Partial<DocumentAnalysis>) => {
    try {
      const docRef = doc(db, 'documentAnalyses', id)
      await updateDoc(docRef, updates)
    } catch (error) {
      console.error('Error updating document analysis:', error)
      throw error
    }
  }
  
  export const deleteDocumentAnalysis = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'documentAnalyses', id))
    } catch (error) {
      console.error('Error deleting document analysis:', error)
      throw error
    }
  }
  
  // Violation Functions
  export const addViolation = async (violation: Omit<ViolationDetail, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'violations'), {
        ...violation,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding violation:', error)
      throw error
    }
  }
  
  export const getViolationsByDocument = async (documentId: string) => {
    try {
      const q = query(
        collection(db, 'violations'), 
        where('documentId', '==', documentId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ViolationDetail[]
    } catch (error) {
      console.error('Error getting violations:', error)
      throw error
    }
  }
  
  export const updateViolation = async (id: string, updates: Partial<ViolationDetail>) => {
    try {
      const docRef = doc(db, 'violations', id)
      await updateDoc(docRef, updates)
    } catch (error) {
      console.error('Error updating violation:', error)
      throw error
    }
  }
  
  // Recommendation Functions
  export const addRecommendation = async (recommendation: Omit<Recommendation, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'recommendations'), {
        ...recommendation,
        createdAt: Timestamp.now()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding recommendation:', error)
      throw error
    }
  }
  
  export const getRecommendationsByDocument = async (documentId: string) => {
    try {
      const q = query(
        collection(db, 'recommendations'), 
        where('documentId', '==', documentId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recommendation[]
    } catch (error) {
      console.error('Error getting recommendations:', error)
      throw error
    }
  }
  
  export const updateRecommendation = async (id: string, updates: Partial<Recommendation>) => {
    try {
      const docRef = doc(db, 'recommendations', id)
      await updateDoc(docRef, updates)
    } catch (error) {
      console.error('Error updating recommendation:', error)
      throw error
    }
  }
  
  // Analytics Functions
  export const getAnalytics = async (userId?: string) => {
    try {
      const analyses = await getDocumentAnalyses(userId)
      
      const totalDocuments = analyses.length
      const completedDocuments = analyses.filter(doc => doc.status === 'completed').length
      const averageCompliance = completedDocuments > 0 
        ? Math.round(analyses
            .filter(doc => doc.status === 'completed')
            .reduce((sum, doc) => sum + doc.complianceScore, 0) / completedDocuments)
        : 0
      const totalCriticalIssues = analyses.reduce((sum, doc) => sum + doc.criticalIssues, 0)
      
      return {
        totalDocuments,
        completedDocuments,
        averageCompliance,
        totalCriticalIssues,
        failedDocuments: analyses.filter(doc => doc.status === 'failed').length,
        processingDocuments: analyses.filter(doc => doc.status === 'processing').length
      }
    } catch (error) {
      console.error('Error getting analytics:', error)
      throw error
    }
  }