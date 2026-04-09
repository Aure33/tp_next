"use client"

import { useReportWebVitals } from "next/web-vitals"

function formatMetricValue(name: string, value: number) {
  if (name === "CLS") return value.toFixed(4)
  return value.toFixed(2)
}

function getMetricStatus(name: string, value: number) {
  const thresholds: Record<string, { good: number; needsImprovement: number }> = {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1500 },
    INP: { good: 200, needsImprovement: 500 },
  }

  const threshold = thresholds[name]
  if (!threshold) return null

  if (value <= threshold.good) return "good"
  if (value <= threshold.needsImprovement) return "needs-improvement"
  return "poor"
}

export default function WebVitalsLogger() {
  useReportWebVitals((metric) => {
    const status = getMetricStatus(metric.name, metric.value)
    const formattedValue = formatMetricValue(metric.name, metric.value)

    console.log(`[WebVitals] ${metric.name}: ${formattedValue}`, {
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      rating: status,
      navigationType: metric.navigationType,
    })

    if (status === "good") {
      console.log(`✅ ${metric.name} is GOOD (${formattedValue})`)
    } else if (status === "needs-improvement") {
      console.log(`⚠️ ${metric.name} needs improvement (${formattedValue})`)
    } else if (status === "poor") {
      console.log(`❌ ${metric.name} is POOR (${formattedValue})`)
    }
  })

  return null
}
