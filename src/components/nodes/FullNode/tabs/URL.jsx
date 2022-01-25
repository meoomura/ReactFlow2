import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';


import Typography from "../../../Typography";

const URLs = [
  { name: 'https://www.', value: 100 },
  { name: 'https://www.', value: 90 },
  { name: 'https://www.', value: 70 },
  { name: 'https://www.', value: 11 },
  { name: 'https://www.', value: 2 },
];

const URLTab = ({}) => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: 'flex' }}>
        <i className="fas fa-link" style={{ paddingRight: 10, color: '#3c9ee5' }} />
        <Typography primary bold size={14} style={{ display: 'flex', alignSelf: 'center'}}>
          Email URLs
        </Typography>
      </div>
      <TableContainer style={{ width: '100%', marginTop: 15 }}>
        <Table size="small">
          <TableBody>
              { URLs.map((url, index) => (
                <TableRow key={index}>
                  <TableCell padding="none" style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Typography size={10} primary>
                      { url.name }
                    </Typography>
                  </TableCell>
                  <TableCell padding="none" style={{ textAlign: 'right'}}>
                    <Typography size={10} primary>
                      { url.value }
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default URLTab;
