import { useState, createContext } from "react";

import { FRAGMENTS_IDS, TC_IDS } from '../utils/filters';

const FilterContext = createContext({});

const FilterContextProvider = ({ children }) => {
  const defaultFilters = {
    mode: 'total',
    tc: TC_IDS,
    tcAll: true,
    fragments: FRAGMENTS_IDS,
    fragmentsAll: true,
    isAfterEvent: false,
  };
  const [filters, setFilters] = useState(defaultFilters);
  
  const context = {
    filters,
    setFilters,
    resetFilters: () => {
      setFilters(defaultFilters)
    },
  };

  return (
    <FilterContext.Provider value={context}>
      { children }
    </FilterContext.Provider>
  );
};

export {
  FilterContextProvider,
};
export default FilterContext;
