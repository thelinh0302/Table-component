import React, { useState } from 'react';

interface Props {
  placeholder: string;
  onSearch: (e: any) => void;
  initialValue: string;
}

const SearchInput: React.FC<Partial<Props>> = ({
  placeholder,
  onSearch,
  initialValue
}) => {
  const [searchKey, setSearchKey] = useState(initialValue);

  const handleSearch = ({ target }: any) => {
    setSearchKey(target.value);
    onSearch(target.value);
  };

  return (
    <div className="cui-search">
      <input
        className="cui-search__input"
        type="text"
        placeholder={placeholder}
        value={searchKey}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
