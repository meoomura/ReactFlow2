import { applyFilters } from '../utils/filters';
import { getColor } from '../utils/colors';

const sortValues = (a) => {
  if(a.state === 'success') return -1;
  if(a.state === 'failed') return 1;
  if(a.state === 'unreached') return 1;
}

const ProgressIcon = ({
  size,
  filters,
  total,
  values,
  icon,
  reached,
}) => {
  const filteredTotal = applyFilters(total.values, filters);
  const allValues = values && values.length > 0 ? values : [{ values: reached.values, state: 'success', label: ''}];
  const percentages = allValues.sort(sortValues).reduce(
    (acc, { values, state, label } ) => {
      const filteredValue = applyFilters(values, filters);
      const pct = filteredValue / filteredTotal * 100;
      acc.values.push({
        value: pct,
        offset: 100 - acc.total + 25,
        color: getColor(state),
        label,
      });
      return {
        values: acc.values,
        total: acc.total + pct,
      };
    },
    { values: [], total: 0 }
  );

  return (
    <svg width={size || 100} height={size || 100} viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r="15.91549430918954"
        fill="transparent"
        stroke="#cccccc"
        strokeWidth={2}
      />
      { percentages.values.map(({ value, offset, color, label }, index) => (
        <circle
          key={index}
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          strokeWidth={2}
          stroke={color}
          strokeDasharray={[value,100-value]}
          strokeDashoffset={offset}
        />
      ))}
      <text
        x="20"
        y="26"
        dangerouslySetInnerHTML={{ __html: icon}}
        className="stepIcon"
      />
    </svg>
  );
};

export default ProgressIcon;
