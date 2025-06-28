import { LuPlus } from "react-icons/lu";

const Header = ({ createNewTask }: { createNewTask: () => void }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={createNewTask}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <LuPlus size={16} />
          <span className="font-medium">New task</span>
        </button>
        <div className="text-sm text-gray-500">Ctrl + K</div>
      </div>
    </header>
  );
};

export default Header;
