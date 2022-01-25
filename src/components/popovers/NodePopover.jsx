import { useContext } from 'react';
import {
  Popover as MuiPopover,
  Box,
  Paper,
  Grid,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import DataTable from '../DataTable';
import Typography from '../Typography';
import FilterContext from '../FilterContext';
import { applyFilters } from '../../utils/filters';

const useStyles = makeStyles({
  popoverPaper: {
    marginTop: '10px',
    overflowX: "unset",
    overflowY: "unset",
    width: '310px',
    "&::before": {
        boxShadow: '20px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 1px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        opacity: 0.9,
        content: '""',
        position: "absolute",
        top: 0,
        left: 155,
        marginTop: '-10px',
        width: 10,
        height: 10,
        backgroundColor: 'white',
        transform: "translate(-50%, 50%) rotate(-45deg)",
        clipPath: "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
    },
  }
});

const NodePopover = ({ anchor, onClose, nodeData }) => {
  const { filters } = useContext(FilterContext);
  const classes = useStyles();
  if (!nodeData) return (<div></div>);
  const { data } = nodeData;
  const values = (data.data.values
    ? data.data.values
    : (filters.isAfterEvent ? data.data.post : data.data.pre)
  );
  const filteredPotentialTarget = applyFilters(values.top[0].values, filters);
  const notReachedValue = filteredPotentialTarget - applyFilters(values.top[1].values, filters);
  const ok = (values.top.length === 3 ? values.top[2] : null);
  
  return (
    <ThemeProvider
      theme={createMuiTheme({
        palette: {
          type: 'light'
        }
      })}
    >
      <MuiPopover
        open={anchor !== null}
        anchorEl={anchor}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.popoverPaper,
        }}
      >
        <Paper
          style={{
            padding: 10,
            minWidth: 230,
            opacity: 0.8,
          }}
        >
          <Box>
            <Typography
              title={`${data.channel.name}${data.name ? ' : ' + data.name : ''}`}
              primary
              style={{
                fontSize: 15,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '100%'
              }}>
              { data.name ? data.name : data.channel.name }
            </Typography>
          </Box>
          { typeof(data.date) === 'object' && (
            <Box mb={1}>
              <Typography primary size="13">
                From { data.date.from } to { data.date.to}
              </Typography>
            </Box>
          )}
          { typeof(data.date) === 'string' && (
            <Box mb={1}>
              <Typography primary size="13">
                { data.date }
              </Typography>
            </Box>
          )}
          <Box mb={1}>
            <Grid container>
              <Grid item xs={ok ? 4 : 6}>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '11px' }}
                  title={values.top[0].tooltip}
                >
                  { values.top[0].label }
                </Typography>
                <Typography size="13" primary>
                  { applyFilters(values.top[0].values, filters) }
                </Typography>
              </Grid>
              <Grid item xs={ok ? 4 : 6} style={{ textAlign: ok ? "center" : "right"}}>
                <Typography
                  style={{ fontWeight: 'bold', fontSize: '11px' }}
                  title={ values.top[1].tooltip }
                >
                  { values.top[1].label }
                </Typography>
                <Typography size="13" primary>
                  {  applyFilters(values.top[1].values, filters) }
                </Typography>
              </Grid>
              { ok && (
                <Grid item xs={4} style={{ textAlign: "right"}}>
                  <Typography
                    style={{ fontWeight: 'bold', fontSize: '11px' }}
                    title={ok?.tooltip}
                  >
                    { ok?.label }
                  </Typography>
                  <Typography size="13" primary>
                    {  applyFilters(ok.values, filters) } %
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
          { (values.cta || values.other) && (
            <div style={{ paddingTop: 5 }}>
              <DataTable
                values={values}
                potentialTarget={filteredPotentialTarget}
                fontSize="12px"
                {...{filters, notReachedValue }}
              />
            </div>
          )}
        </Paper>
      </MuiPopover>
    </ThemeProvider>
  );
};

export default NodePopover;
