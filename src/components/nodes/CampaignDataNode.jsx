import { useContext } from 'react';
import { Handle }  from 'react-flow-renderer';

import { edgeStyle } from './styles' ;
import FilterContext from '../FilterContext';

const container = {
  display: 'flex',
  flexDirection: 'column',
};

const title = {
  fontSize: '17px',
  color: 'rgb(102, 102, 102)',
};

const value = {
  fontSize: '20px',
  fontWeight: 'bold'
};

const CampaignData = ({ data: nodeData }) => {
  const { filters } = useContext(FilterContext);
  return (
    <div style={container}>
      <div
        style={title}
      >
        { nodeData.data.label }
      </div>
      <div
        style={value}
      >
        {
          nodeData.data.initial
            ? nodeData.data.count
            : ( filters.isAfterEvent ? nodeData.data.count : '0' )
        }
      </div>
      { nodeData.data.initial === true && (
        <Handle
          type="source"
          position="right"
          style={edgeStyle}
        />
      )}
      { nodeData.data.initial === false && (
        <Handle
          type="target"
          position="left"
          style={edgeStyle}
        />
      )}
    </div>
  );
};

export default CampaignData;
