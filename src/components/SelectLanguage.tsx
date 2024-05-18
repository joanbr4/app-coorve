export const SelectLanguage: React.FC<{
  languages: string[];
  selected: string;
  setSelected: (language: string) => void;
}> = ({ languages, selected, setSelected }) => {
  return (
    <nav className="flex flex-row rounded-tl-lg">
      {languages.map((language, index) => (
        <button
          key={index}
          className={`border-b-2 px-3 py-3.5 text-xs font-semibold uppercase text-gray-600 lg:text-sm
            ${selected === language ? "border-blue-500" : "border-transparent"}
            transition-colors duration-100 hover:bg-gray-50 hover:text-gray-700`}
          onClick={() => setSelected(language)}
        >
          {language}
        </button>
      ))}
    </nav>
  );
};
