import {
  FaRegFileAlt,
  FaNotesMedical,
  FaPrescriptionBottleAlt,
  FaRegSmileBeam,
} from "react-icons/fa";

const features = [
  {
    title: "Government Subsidy Guide",
    icon: <FaRegFileAlt className="text-8xl text-purple-600" />,
  },
  {
    title: "Health Insurance Support",
    icon: <FaNotesMedical className="text-8xl text-purple-600" />,
  },
  {
    title: "Prescription Reminders",
    icon: <FaPrescriptionBottleAlt className="text-8xl text-purple-600" />,
  },
  {
    title: "Daily Journal",
    icon: <FaRegSmileBeam className="text-8xl text-purple-600" />,
  },
];

export default function FeatureGrid() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-100 to-blue-200 overflow-hidden px-4 py-8">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center space-y-2 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-purple-300"
          >
            {feature.icon}
            <h2 className="text-lg font-semibold text-gray-800">
              {feature.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-300 opacity-90 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-pink-200 opacity-30 rounded-full blur-2xl z-0" />
    </div>
  );
}
