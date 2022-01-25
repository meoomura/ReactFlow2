import {
  TableContainer,
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { applyFilters } from '../utils/filters';
import { formatDecimal } from '../utils/format';
import { getColor } from '../utils/colors';

const Label = ({ label, hasLink, onClick,  }) => {
  if (!hasLink) return label;
  return (
    <div style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={onClick}>
      { label }
    </div>
  );
};

const Table = ({ values, filters, fontSize, potentialTarget, withLinks, onMailClick  }) => {
  const styleCellRight = {
    fontSize: fontSize || '10px',
    textAlign: 'right',
    padding: 5,
  };

  const styleCellLeft = {
    fontSize: fontSize || '10px',
    textAlign: 'left',
    padding: 5,
  };

  const styleCellBadge = {
    width: 5,
    paddingRight: 3
  };

  return (
    <TableContainer style={{ width: '100%', marginTop: 5 }}>
      <MuiTable size="small">
        <TableBody >
          { values.map(({ values, label, state, bold, tooltip }, index) => {
            const filteredValue = applyFilters(values, filters);
            return (
              <TableRow key={index}>
                <TableCell padding="none" style={styleCellBadge}>
                  <div style={{
                    border: `5px solid ${getColor(state)}`,
                    borderRadius: 5,
                  }}/>
                </TableCell>
                <TableCell
                  padding="none"
                  title={tooltip}
                  style={{
                    fontSize: fontSize || '10px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    width: '150px',
                    padding: 5,
                    fontWeight: bold ? 'bold' : undefined,
                  }}
                >
                  <Label hasLink={withLinks && label === 'Click-through Rate'} label={label} onClick={onMailClick} />
                </TableCell>
                <TableCell padding="none" style={styleCellRight}>{filteredValue}</TableCell>
                <TableCell padding="none" style={styleCellRight}>{formatDecimal(filteredValue / potentialTarget * 100) || 0} %</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

const DataTable = ({ values, filters, potentialTarget, fontSize, withLinks, onMailClick }) => {
  return (
    <div>
      { values.cta.length > 0 && (
        <div style={{ marginTop: 15 }}>
          <Table values={values.cta} {...{ filters, potentialTarget, fontSize, withLinks, onMailClick }} />
        </div>
      )}
      { values.other.length > 0 && (
        <div style={{ marginTop: 15 }}>
          <Table values={values.other} {...{ filters, potentialTarget, fontSize, withLinks, onMailClick }} />
        </div>
      )}
    </div>
  );
};

export default DataTable;
