import dagre from 'dagre';

const adaptFlow = (
  steps,
  input,
  output,
) => {
  return [
    {
      id: 0,
      data: input,
      type: 'campaign',
      width: 50,
      height: 100,
      previous: [],
    },
    {
      ...steps[0],
      previous: [{ stepId: 0 }]
    },
    ...steps.slice(1),
    {
      id: steps.length + 1,
      data: output,
      type: 'campaign',
      width: 300,
      height: 100,
      previous: [{ stepId: steps.length }],
    },
  ];
};

const generateFlow = (width, height, data) => {
  const flow = new dagre.graphlib.Graph();
  flow.setGraph({
    rankdir: 'LR',
  });
  flow.setDefaultEdgeLabel(() => ({}));
  // Set nodes
  data.forEach(
    (node) => {
      flow.setNode(node.id, {
        ...node,
        width: node.width || width,
        height: node.height || height,
      });
    }
  );

  // Set edges
  data.forEach(
    ({ id, previous }) => {
      previous.forEach(({ stepId: previousId }) => {
        flow.setEdge(previousId, id);
      });
    }
  );
  
  dagre.layout(flow);
  return flow.nodes().map((i) => flow.node(i));
};

export {
  generateFlow,
  adaptFlow,
};