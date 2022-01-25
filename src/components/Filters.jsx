import { useContext } from 'react';
import {
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import FilterContext from './FilterContext';
import { TC, FRAGMENTS, getFragmentLabel, getTCLabel } from '../utils/filters';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters = ({ campaignData }) => {
  const { filters, setFilters } = useContext(FilterContext);
  
  const handleTargetChange = (event) => {
    console.log(event.target.value);
    setFilters({
      ...filters,
      mode: event.target.value,
    });
  };

  const handleTCChange = (event) => {
    setFilters({
      ...filters,
      tc: event.target.value,
    });
  };

  const handleTCAllChange = (event) => {
    setFilters({
      ...filters,
      tcAll: event.target.checked,
      tc: (event.target.checked === false ? [] : TC.map(({ id }) => id) )
    });
  }

  const handleFragmentChange = (event) => {
    setFilters({
      ...filters,
      fragments: event.target.value,
    });
  };

  const handleFragmentsAllChange = (event) => {
    setFilters({
      ...filters,
      fragmentsAll: event.target.checked,
      fragments: (event.target.checked === false ? [] : FRAGMENTS.map(({ id }) => id) )
    });
  };

  const handleAfterEventChange = (event) => {
    setFilters({
      ...filters,
      isAfterEvent: event.target.checked,
    });
  };

  return (
    <div
      style={{
        marginLeft: 10,
        padding: 10,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#424242',
        color: 'white',
        opacity: 0.75
      }}
    >
      <ThemeProvider
        theme={createMuiTheme({
          palette: {
            type: 'dark',
            primary: {
              main: '#ffffff'
            }
          }
        })}
      >
        <div>
          <i
            className="fas fa-chart-bar"
            style={{
              fontSize: 30,
              color: '#a8a7a7',
              marginRight: 30
            }}
          />
        </div>
        <div>
          <div
            style={{
              marginBottom: 10,
              fontSize: 20,
            }}
          >
            { campaignData.name }
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <div style={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel>Campaign target</InputLabel>
                <Select
                  value={filters.mode}
                  onChange={handleTargetChange}
                >
                  <MenuItem value="total">Total</MenuItem>
                  <MenuItem value="initial">Initial</MenuItem>
                  <MenuItem value="addition">Additions</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ marginLeft: 10, minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel>TC</InputLabel>
                <Select
                  multiple
                  value={filters.tc}
                  onChange={handleTCChange}
                  input={<Input />}
                  renderValue={(selected) => filters.tcAll ? 'All TCs' : selected.map(getTCLabel).join(', ')}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="all">
                    <Checkbox checked={filters.tcAll} onChange={handleTCAllChange} />
                    <ListItemText primary="All TCs" />
                  </MenuItem>
                  { TC.map(({ id, label }) => (
                      <MenuItem key={id} value={id} disabled={filters.tcAll}>
                      <Checkbox checked={filters.tc.indexOf(id) >= 0} />
                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginLeft: 10, minWidth: 300 }}>
              <FormControl fullWidth>
                <InputLabel>Fragments</InputLabel>
                <Select
                  multiple
                  value={filters.fragments}
                  onChange={handleFragmentChange}
                  input={<Input />}
                  renderValue={(selected) => filters.fragmentsAll ? 'All Fragments' : selected.map(getFragmentLabel).join(', ')}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="all">
                    <Checkbox checked={filters.fragmentsAll} onChange={handleFragmentsAllChange} />
                    <ListItemText primary="All Fragments" />
                  </MenuItem>
                  { FRAGMENTS.map(({ id, label }) => (
                      <MenuItem key={id} value={id} disabled={filters.fragmentsAll}>
                      <Checkbox checked={filters.fragments.indexOf(id) >= 0} />
                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginLeft: 10 }}>
              <FormControl fullWidth>
                <FormControlLabel
                  control={<Switch checked={filters.isAfterEvent} onChange={handleAfterEventChange} />}
                  label="After event"
                />
              </FormControl>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Filters;
