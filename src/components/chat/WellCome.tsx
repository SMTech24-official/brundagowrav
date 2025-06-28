import { LuMessageCircle } from "react-icons/lu";

const WellCome = () => {
  return (
    <div className="flex-1 flex flex-col items-start justify-center p-10 ">
      <div className="text-start mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello MR XYZ</h1>
        <p className="text-xl text-gray-600">What can I help with?</p>
      </div>

      <div className="flex items-center  space-x-3 text-gray-500 mb-8">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <LuMessageCircle size={24} className="text-gray-400" />
        </div>
        <span className="text-sm">Create a new task to get started</span>
      </div>
    </div>
  );
};

export default WellCome;
