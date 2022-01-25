import Filters from './Filters';

const Toolbar = ({ currentMode, changeMode, campaignData }) => {  
  return (
    <div className="toolbar">
      <div className="left">
        { currentMode === 'fullscreen' && (
          <Filters campaignData={campaignData} />
        )}
      </div>
      <div className="right">
        { currentMode === 'profile' && (
          <div className="round-button" onClick={() => changeMode('fullscreen')}>
            <i className="fas fa-expand-arrows-alt" />
          </div>
        )}
        { currentMode === 'fullscreen' && (
          <>
            <div className="round-button" title="Export">
              <i className="fas fa-file-download"/>
            </div>
            <div className="round-button" onClick={() => changeMode('profile')}>
              <i className="fas fa-times"></i>
            </div>
          </>
      )}
      </div>
    </div>
  );
};

export default Toolbar;