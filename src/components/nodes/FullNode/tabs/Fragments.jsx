import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import Typography from "../../../Typography";

const FragmentsTab = ({ fragments }) => {
  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: 'flex' }}>
        <i className="fas fa-puzzle-piece" style={{ paddingRight: 10, color: '#3c9ee5' }} />
        <Typography primary bold size={14} style={{ display: 'flex', alignSelf: 'center'}}>
          Email fragments
        </Typography>
      </div>
      <TableContainer style={{ width: '100%', marginTop: 15 }}>
        <Table size="small">
          <TableBody>
              { fragments.map((fragment, index) => (
                <TableRow key={index}>
                  <TableCell padding="none" style={{ paddingTop: 5, paddingBottom: 5 }}>
                    <Typography size={10} primary>
                      { fragment }
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

export default FragmentsTab;
