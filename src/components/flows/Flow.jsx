import { useState, useMemo, useContext } from 'react';
import ReactFlow from 'react-flow-renderer';

import FilterContext from '../FilterContext';
import CampaignDataNode from '../nodes/CampaignDataNode';
import BasicNode from '../nodes/BasicNode';
import FullNode from '../nodes/FullNode';
import NodePopover from '../popovers/NodePopover';
import { adaptFlow, generateFlow } from '../../utils/flow';
import { applyFilters } from '../../utils/filters';
import campaign from '../../campaign_NEW.json';

const getNodeClassName = (mode, node) => {
  if (mode === 'profile') return 'node';
  if (node.type !== 'campaign') return 'fullnode';
  if (node.type === 'campaign' && node.data.initial === true) return 'initial-node';
  return 'end-node';
}

const Flow = ({ mode, steps }) => {
  const isFullScreen = mode === 'fullscreen';
  const { filters } = useContext(FilterContext);
  const [stepDetails, setStepDetails] = useState(null);

  const nodeTypes = {
    basic: isFullScreen ? FullNode : BasicNode,
    campaign: CampaignDataNode,
  };

  const elements = useMemo(() => {
    const width = isFullScreen === false ? 250 : 400;
    const height = isFullScreen  === false ? 145 : 470;
    const allSteps = isFullScreen  === false
      ? steps
      : adaptFlow(
          steps,
          { ...campaign.campaignData.start, initial: true, },
          { ...campaign.campaignData.end, initial: false }
      )
    ;
    const flow = generateFlow(width, height, allSteps);
    const elements = flow
      .filter((node) => node !== undefined)
      .map((node) => ({
        id: `${mode}-${node.id}`,
        type: node.type || 'basic',
        data: { ...node },
        position: { x: node.x, y: node.y},
        sourcePosition: 'right',
        targetPosition: 'left',
        className: getNodeClassName(mode, node),
      }))
      .concat(
        allSteps.map(({ id, previous }) =>
          previous.map(
            ({ stepId: previousId, values, label }) => ({
              id: `${mode}-${id}-${previousId}`,
              source: `${mode}-${previousId}`,
              target: `${mode}-${id}`,
              arrowHeadType: 'none',
              style: {
                strokeWidth: 2,
                stroke: 'rgb(152,152,152)'
              },
              type: 'smoothstep',
              label: label ? `${label}: ${applyFilters(values, filters)}` : '',
              labelShowBg: true,
              labelBgPadding: [10, 5],
              labelBgBorderRadius: 4,
              labelStyle: {
                fontFamily: 'Roboto, sans-serif',
                fontSize: 15,
              },
              labelBgStyle: {
                fill: 'rgb(217,217,217)',
                stroke: 'rgb(152,152,152)',
              },
            })
          )
        ).flat()
      );
    return elements;
  }, [mode, steps, filters]);

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#efefef',
    }}>
      <ReactFlow
        onElementClick={(evt, node) => {
          if(node.type !== 'smoothstep' && isFullScreen === false)
            setStepDetails({ evt: evt.currentTarget, node });
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        paneMoveable={mode === 'fullscreen'}
        zoomOnPinch={mode === 'fullscreen'}
        zoomOnScroll={mode === 'fullscreen'}
        zoomOnDoubleClick={mode === 'fullscreen'}
        nodeTypes={nodeTypes}
        elements={elements}
      />
      <NodePopover
        anchor={stepDetails?.evt || null}
        onClose={() => setStepDetails(null)}
        nodeData={stepDetails?.node || null}
        onBottom={true}
      />
    </div>
  );
};

export default Flow;