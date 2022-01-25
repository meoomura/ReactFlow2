import { useContext } from 'react';
import {
  Grid,
} from '@material-ui/core';

import FilterContext from '../../../FilterContext';
import Typography from '../../../Typography';
import ProgressIcon from '../../../ProgressIcon';
import DataTable from '../../../DataTable';
import { formatDecimal } from '../../../../utils/format';
import { applyFilters } from '../../../../utils/filters';

const StepStatusTab = ({ nodeData, goToMail }) => {
  const { filters } = useContext(FilterContext);
  const data = (nodeData.data.values
    ? nodeData.data.values
    : (filters.isAfterEvent ? nodeData.data.post : nodeData.data.pre)
  );
  const potentialTarget = applyFilters(data.top[0].values, filters);
  const target = applyFilters(data.top[1].values, filters);
  const notReachedValue = potentialTarget - target;

  const ok = (data.top.length === 3 ? data.top[2] : null);
  
  return (
    <div style={{
      height: '370px',
      paddingLeft: 5,
      paddingRight: 10,
    }}>
      <div style={{ display: 'flex', marginTop: 1, alignItems: 'center' }}>
        <ProgressIcon
          size={85}
          filters={filters}
          values={data.cta.concat(data.other)}
          total={data.top[0]}
          reached={data.top[1]}
          icon={nodeData.channel.icon}
        />
        <div style={{ flexGrow: 3 }}>
          <div>
            <Typography>
              Date
            </Typography>
            { nodeData.date.from && (
              <div>
                <Typography primary>
                  From { nodeData.date.from } to { nodeData.date.to}
                </Typography>
              </div>
            )}
            { nodeData.date.at && (
              <div>
                <Typography primary>
                  { nodeData.date.at }
                </Typography>
              </div>
            )}
          </div>
          <Grid container style={{ marginTop: 5 }}>
            <Grid item xs={ok ? 4 : 6} style={{ textAlign: "left"}}>
              <Typography title={data.top[0].tooltip}>
                { data.top[0].label }
              </Typography>
            </Grid>
            <Grid item xs={ok ? 4 : 6} style={{ textAlign: ok ? "center" : "right"}}>
              <Typography title={data.top[1].tooltip}>
              { data.top[1].label }
              </Typography>
            </Grid>
            { ok && (
              <Grid item xs={4} style={{ textAlign: "right"}}>
                <Typography title={data.top[2].tooltip}>
                  { ok?.label }
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container>
            <Grid item xs={ok ? 4 : 6} style={{ textAlign: "left"}}>
              <Typography style={{ fontSize: '13px' }} primary>
                { potentialTarget }
              </Typography>
            </Grid>
            <Grid item xs={ok ? 4 : 6} style={{ textAlign: ok ? "center" : "right"}}>
              <Typography primary style={{ fontSize: '13px' }}>
                { target }
              </Typography>
            </Grid>
            { ok && (
              <Grid item xs={4} style={{ textAlign: "right"}}>
                <Typography primary style={{ fontSize: '13px' }}>
                  { formatDecimal(applyFilters(ok.values, filters) / target * 100) || 0 } %
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
      { (data.cta || data.other) && (
        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
          <DataTable
            values={data}
            withLinks
            onMailClick={goToMail}
            {...{ filters, potentialTarget, notReachedValue }}
          />
        </div>
      )}
    </div>
  );
};

export default StepStatusTab;
