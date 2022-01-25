const getColor = (state) => {
  switch(state) {
    case 'success': return '#80CD3C';
    case 'failed': return '#CF2F2F';
    case 'unreached': return '#cccccc';
    default: return undefined;
  }
};

export { getColor };
