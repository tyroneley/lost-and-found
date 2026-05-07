interface StepMeta {
  number: number
  label: string
}

const STEPS: StepMeta[] = [
  { number: 1, label: 'Ownership' },
  { number: 2, label: 'Review' },
  { number: 3, label: 'Confirm' },
]

export function Stepper({ current }: { current: number }) {
  return (
    <div className="claim-stepper">
      {STEPS.map((step, idx) => {
        const done = current > step.number
        const active = current === step.number
        return (
          <div key={step.number} className="claim-stepper-item">
            <div
              className={[
                'claim-step-circle',
                done ? 'claim-step-done' : '',
                active ? 'claim-step-active' : '',
              ].join(' ')}
            >
              {done ? '✓' : step.number}
            </div>
            <span
              className={[
                'claim-step-label',
                active ? 'claim-step-label-active' : '',
              ].join(' ')}
            >
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <div className={`claim-step-line ${done ? 'claim-step-line-done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
