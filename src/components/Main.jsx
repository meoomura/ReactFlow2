import { useState, useContext } from "react";

import Toolbar from './Toolbar';
import CampaignProfile from './flows/CampaignProfile'
import FullScreen from './flows/FullScreen';
import FilterContext from './FilterContext';
import campaign from '../campaign_NEW';

const Main = () => {
  const [mode, setMode] = useState('profile');
  const { resetFilters } = useContext(FilterContext);

  const handleChangeMode = (newMode) => {
    setMode(newMode);
    resetFilters();
  };

  return (
    <>
      <Toolbar
        campaignData={campaign.campaignData}
        currentMode={mode}
        changeMode={handleChangeMode}
      />
      { mode === 'profile' && (
        <CampaignProfile steps={campaign.steps} />
      )}
      { mode === 'fullscreen' && (
        <FullScreen steps={campaign.steps} />
      )}
    </>
  );
};

export default Main;
