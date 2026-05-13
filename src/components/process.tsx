import { useRef, useEffect, useState } from "react"
import ProcessStep from "./process-step"

const processSteps = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "We start by understanding your business — your goals, your customers, your competitive landscape, and what you need your website to do for you. No assumptions, no templates. Just a focused conversation so we can build something that actually fits.",
    image: "/images/process-1.jpg",
    video: "/videos/step-1.mp4",
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "We build a fully working version of your site based on everything we learned. You get something real to look at, click through, and react to — not wireframes or mockups. A live prototype that shows exactly what your website can be.",
    image: "/images/process-2.jpg",
    video: "/videos/step-2.mp4",
  },
  {
    number: "03",
    title: "Refinement",
    description:
      "We walk through the prototype together, gather your feedback, and shape the site around your specific needs. You have a direct say in every decision — copy, layout, features, tone. We keep iterating until it feels exactly right.",
    image: "/images/process-3.jpg",
    video: "/videos/step-3.mp4",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Final review, final sign-off. We make any last adjustments, confirm the site meets your business needs completely, and then we launch. We stay with you through go-live and remain available for anything you need going forward.",
    image: "/images/process-4.jpg",
    video: "/videos/step-4.mp4",
  },
]

const Process = () => {
  return (
    <div id="process">
      {processSteps.map((step, index) => (
        <ProcessStep
          key={step.number}
          step={step}
          index={index}
          isLast={index === processSteps.length - 1}
          nextStepId={index < processSteps.length - 1 ? `process-step-${index + 1}` : "contact"}
        />
      ))}
    </div>
  )
}

export default Process
