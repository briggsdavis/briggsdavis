import { useRef, useEffect, useState } from 'react';
import ProcessStep from './ProcessStep';

const processSteps = [
  {
    number: '01',
    title: 'Prototype',
    description:
      'We build a prototype based on your business profile and current online presence to give you a concrete vision of the possibilities.',
    image: '/images/process-1.jpg',
  },
  {
    number: '02',
    title: 'Initial Meeting',
    description:
      "We come to you in our meeting with a product ready to go and then find out your specific pain points, desires and needs for your website solution so we can fully understand your context.",
    image: '/images/process-2.jpg',
    video: '/videos/step-2.mp4',
  },
  {
    number: '03',
    title: 'Implement',
    description:
      'We implement the changes, revisions or complete redesign of the initial prototype according to the information you provide in the meeting.',
    image: '/images/process-3.jpg',
  },
  {
    number: '04',
    title: 'Final Consultation',
    description:
      'We check in with you with the finished product to see if we have satisfied your requirements and get any last minute feedback from you to be able to perfect the website completely.',
    image: '/images/process-4.jpg',
    video: '/videos/step-4.mp4',
  },
];

const Process = () => {
  return (
    <div id="process">
      {processSteps.map((step, index) => (
        <ProcessStep
          key={step.number}
          step={step}
          index={index}
          isLast={index === processSteps.length - 1}
          nextStepId={index < processSteps.length - 1 ? `process-step-${index + 1}` : 'contact'}
        />
      ))}
    </div>
  );
};

export default Process;
