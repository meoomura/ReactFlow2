import { useRef, useCallback } from 'react';
import { Handle }  from 'react-flow-renderer';
import Slider from "react-slick";

import StepStatusTab from './tabs/StepStatus';
import FragmentsTab from './tabs/Fragments';
import URLTab from './tabs/URL';
import { edgeStyle } from '../styles' ;
import Typography from '../../Typography';

const data = atob('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');
const binaryArray = new Uint8Array(data.length);
for (let i = 0; i < data.length; i++) {
  binaryArray[i] = data.charCodeAt(i);
}
const blob = new Blob(
  [new Uint8Array(binaryArray)],
  {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    name: 'data.xlsx'
  }
);
const blobURL = URL.createObjectURL(blob);


const BottomBar = ({ channel, dots }) => {  
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
      <div style={{ width: 70, paddingLeft: 10}}>
        <a className="download-button" title="Download data" download={`${channel}_data.xlsx`} href={blobURL}>
          <i
            className="fas fa-download"
            style={{
              fontSize: '13px',
              color: 'black',
              opacity: 0.75
            }}
          />
        </a>
      </div>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <ul className="slick-dots" style={{ position: 'inherit' }}>
          { dots }
        </ul>
      </div>
      <div style={{ width: 80}}>
      </div>
    </div>
  );
};

const FullNode = ({ data: nodeData }) => {
  const slider = useRef();
  
  const goToMail = useCallback(
    () => {
      slider.current.slickGoTo(1);
    },
    [ slider ]
  );

  const goToFragments = useCallback(
    () => {
      slider.current.slickGoTo( (nodeData.channel.url ? 2 : 1 ));
    },
    [ slider ]
  );

  return (
    <>
      <div className="node-container">
        <div
          className="node-status"
          title={nodeData.phase.tooltip}
        >
          { nodeData.phase.name }
        </div>
        <Handle
          type="target"
          position="left"
          style={edgeStyle}
        />
        <div style={{
            padding: 5,
            display: "flex",
            flexDirection: 'column',
            minHeight: 28
          }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Typography bold size="13">
                {nodeData.channel.name}
              </Typography>
              { nodeData.fragments && (
                <Typography
                  style={{ marginRight: 10, textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={goToFragments}
                >
                  {nodeData.fragments.length} fragments
                </Typography>
              )}
            </div>
            { !!nodeData.name && (
              <Typography
                primary
                style={{
                  fontSize: '15px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
                title={nodeData.name}
              >
                { nodeData.name }
              </Typography>
            )}
          </div>
        </div>
        <div
          style={{
            height: '100%',
          }}
        >
          <Slider
            ref={(r) => slider.current = r}
            arrows={false}
            dots
            appendDots={(dots) => <BottomBar channel={nodeData.channel.id} {...{dots}} />}
          >
            <StepStatusTab nodeData={nodeData} goToMail={goToMail} />
            { nodeData.channel.url && (
              <URLTab />
            )}
            { nodeData.fragments && (
              <FragmentsTab fragments={nodeData.fragments} />
            )}
          </Slider>
        </div>
        <Handle
          type="source"
          position="right"
          style={edgeStyle}
        />
      </div>
    </>
  );
};

export default FullNode;
