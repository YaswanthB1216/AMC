import { useState, useEffect } from 'react'
import { 
  DocumentAnalysis, 
  ViolationDetail, 
  Recommendation,
  getDocumentAnalyses,
  getViolationsByDocument,
  getRecommendationsByDocument,
  getAnalytics
} from '../lib/firestore'

export const useDocumentAnalyses = (userId?: string) => {
  const [analyses, setAnalyses] = useState<DocumentAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalyses = async () => {
    try {
      setLoading(true)
      const data = await getDocumentAnalyses(userId)
      setAnalyses(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch document analyses')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalyses()
  }, [userId])

  return { analyses, loading, error, refetch: fetchAnalyses }
}

export const useViolations = (documentId: string) => {
  const [violations, setViolations] = useState<ViolationDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchViolations = async () => {
    if (!documentId) return
    
    try {
      setLoading(true)
      const data = await getViolationsByDocument(documentId)
      setViolations(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch violations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchViolations()
  }, [documentId])

  return { violations, loading, error, refetch: fetchViolations }
}

export const useRecommendations = (documentId: string) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRecommendations = async () => {
    if (!documentId) return
    
    try {
      setLoading(true)
      const data = await getRecommendationsByDocument(documentId)
      setRecommendations(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch recommendations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, [documentId])

  return { recommendations, loading, error, refetch: fetchRecommendations }
}

export const useAnalytics = (userId?: string) => {
  const [analytics, setAnalytics] = useState({
    totalDocuments: 0,
    completedDocuments: 0,
    averageCompliance: 0,
    totalCriticalIssues: 0,
    failedDocuments: 0,
    processingDocuments: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const data = await getAnalytics(userId)
      setAnalytics(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch analytics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [userId])

  return { analytics, loading, error, refetch: fetchAnalytics }
}