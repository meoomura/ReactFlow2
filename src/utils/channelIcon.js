export default ({ id }) => {
  switch (id) {
    case 'email-1to1':
      return '&#xf658;';
    case 'automated-email':
      return '&#xf674;';
    case 'sms':
      return '&#xf7cd;';
    case 'survey':
      return '&#xf681;';
    case 'call':
      return '&#xf0f0;';
    case 'event':
      return '&#xf073;';
    default: break;
  };
};
