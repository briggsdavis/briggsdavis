import type { ServiceVisualKey } from "@/components/service-visuals"

export type ServiceProcessStep = {
  number: string
  title: string
  label: string
  description: string
  details: readonly string[]
  visualKey: ServiceVisualKey
}

export type ServiceDetailConfig = {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  promise: string
  capabilities: readonly string[]
  systemsLabel: string
  systems: readonly string[]
  systemsLayout?: "pills" | "staircase"
  relatedService: { label: string; to: string }
  processEyebrow: string
  processTitle: string
  processIntro: string
  steps: readonly ServiceProcessStep[]
  companion?: {
    eyebrow: string
    title: string
    description: string
    linkLabel: string
    linkTo: string
  }
  ctaTitle: string
  ctaBody: string
  ctaLabel: string
}
