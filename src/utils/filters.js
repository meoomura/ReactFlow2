const applyFilters = (value, filters) => {
  // Apply total or initialTarget filter
  const { total, initialTarget } = value;
  // Apply fragment filter
  const fragmentsTotal = Object.entries(total)
    .filter(([key]) => filters.fragments.indexOf(key) >= 0);
  const fragmentsInitialTarget = Object.entries(initialTarget)
    .filter(([key]) => filters.fragments.indexOf(key) >= 0);
  // Apply TC filter
  const tcTotal = Object.values(fragmentsTotal)
    .map(
      ([_, fragment]) => Object.entries(fragment)
        .filter(([key, _]) => filters.tc.indexOf(key) >= 0)
        .map(([_, tc]) => tc)
    );
  const tcInitialTarget = Object.values(fragmentsInitialTarget)
    .map(
      ([_, fragment]) => Object.entries(fragment)
        .filter(([key, _]) => filters.tc.indexOf(key) >= 0)
        .map(([_, tc]) => tc)
    );
  // Compute sums
  const sumTotal = tcTotal.flat().reduce((acc, value) => acc + value, 0);
  const sumInitialTarget = tcInitialTarget.flat().reduce((acc, value) => acc + value, 0);
  if(filters.mode === 'total') return sumTotal;
  else if(filters.mode === 'initial') return sumInitialTarget;
  else return sumTotal - sumInitialTarget;
};

const TC = [
  {
    id: 'tc1',
    label: 'TC1',
  },
  {
    id: 'tc2',
    label: 'TC2',
  },
  {
    id: 'tc3',
    label: 'TC3',
  }
];

const FRAGMENTS = [
  {
    id: 'frag1',
    label: 'The Connected',
  },
  {
    id: 'frag2',
    label: 'The Cherry picker',
  }
];

const getFragmentLabel = (id) => FRAGMENTS.find(({ id: fId }) => fId === id)?.label || '';
const getTCLabel = (id) => TC.find(({ id: tId }) => tId === id)?.label || '';

const TC_IDS = TC.map(({ id }) => id);
const FRAGMENTS_IDS = FRAGMENTS.map(({ id }) => id);

export {
  applyFilters,
  TC,
  TC_IDS,
  FRAGMENTS,
  FRAGMENTS_IDS,
  getFragmentLabel,
  getTCLabel,
};
