import { ArrowRight } from 'lucide-react';

const ProgressSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Select Date",
      active: true
    },
    {
      id: 2,
      title: "Select Time",
      active: false
    },
    {
      id: 3,
      title: "Your Details",
      active: false
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold
                  ${step.active ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {step.id}
                </div>
                <span className={`text-sm mt-2 font-medium ${step.active ? 'text-green-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="mx-2 text-gray-300">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressSteps;
