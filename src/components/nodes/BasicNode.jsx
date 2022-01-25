import { useContext } from 'react';
import { Handle }  from 'react-flow-renderer';

import { edgeStyle } from './styles' ;
import FilterContext from '../FilterContext';
import ProgressIcon from '../ProgressIcon';
import { applyFilters } from '../../utils/filters';
import { formatDecimal } from '../../utils/format';

const BasicNode = ({ data: nodeData }) => {
  const { filters } = useContext(FilterContext);
  const data = (nodeData.data.values
    ? nodeData.data.values
    : (filters.isAfterEvent ? nodeData.data.post : nodeData.data.pre)
  );
  const target = applyFilters(data.top[0].values, filters);
  const ok = data.top.length === 3 ? data.top[2] : null;
  return (
    <>
      <div className="node-container">
        <div className="node-status" title={nodeData.phase.tooltip}>
          { nodeData.phase.name }
        </div>
        { nodeData.previous.length > 0 && (
          <Handle
            type="target"
            position="left"
            style={edgeStyle}
          />
        )}
        <div style={{
            height: '100%',
            width: '100%',
            marginTop: 7,
            flex: 3,
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ProgressIcon
            filters={filters}
            values={data.cta.concat(data.other)}
            total={data.top[0]}
            reached={data.top[1]}
            icon={nodeData.channel.icon}
          />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", width: '100%'}}>
            <div style={{ fontSize: '10px', paddingLeft: 5}} title={data.top[0].label}>
              <i className="fas fa-bullseye" style={{ color: '#2E86C1', paddingRight: 3}}></i>
              { target }
            </div>
            { ok && (
              <div style={{ fontSize: '10px', paddingRight: 5}} title={ ok?.label }>
                <i className="fas fa-check-circle" style={{ color: '#2E86C1', paddingRight: 3}}></i>
                { formatDecimal(applyFilters(ok.values, filters) / target * 100) } %
              </div>
            )}
          </div>
        </div>
        { nodeData.final !== true && (
          <Handle
            type="source"
            position="right"
            style={edgeStyle}
          />
        )}
      </div>
    </>
  );
};

export default BasicNode;
