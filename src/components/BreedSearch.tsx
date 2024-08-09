import { useState, useEffect } from "react";

interface BreedSearchProps {
  breeds: string[];
  onSearch: (filteredBreeds: string[]) => void;
}

const BreedSearch: React.FC<BreedSearchProps> = ({ breeds, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  useEffect(() => {
    const filteredSuggestions = breeds.filter((breed) =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
    onSearch(filteredSuggestions);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (breed: string) => {
    setSearchTerm(breed);
    setSuggestions([]);
    setIsSuggestionsVisible(false);
  };

  const handleFocus = () => {
    setIsSuggestionsVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSuggestionsVisible(false);
    }, 100);
  };

  return (
    <div className="relative w-full max-w-md mb-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search breeds..."
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      {isSuggestionsVisible && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BreedSearch;
