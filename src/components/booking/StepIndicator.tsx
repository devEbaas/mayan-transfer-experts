import { useTranslation } from 'react-i18next';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useTranslation();
  const labels = t('steps', { returnObjects: true }) as string[];

  return (
    <div className="flex items-center justify-center gap-1.5 my-1.5 mb-9 max-w-[680px] mx-auto">
      {labels.map((label, i) => {
        const done = i < currentStep;
        const active = i === currentStep;

        return (
          <div key={label} className="flex items-center gap-1.5 flex-1">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold flex-none border-2 ${
                  active
                    ? 'bg-teal text-white border-teal'
                    : done
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-text-light border-border-input'
                }`}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className={`text-[13.5px] font-bold whitespace-nowrap ${
                  active || done ? 'text-navy' : 'text-text-light'
                }`}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`flex-1 h-0.5 min-w-[18px] ${
                  i < currentStep ? 'bg-navy' : 'bg-[#e2e6ea]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
