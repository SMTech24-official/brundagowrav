const NavigationTab = ({
  setActiveTab,
  activeTab,
}: {
  setActiveTab: React.Dispatch<
    React.SetStateAction<"All" | "Favorites" | "Scheduled">
  >;
  activeTab: "All" | "Favorites" | "Scheduled";
}) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex space-x-6">
        {(["All", "Favorites", "Scheduled"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? "bg-black text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationTab;
