import Flow from './Flow';

const CampaignProfile = ({ steps })  => {
  return (
    <div style={{ height: '100%', backgroundColor: '#efefef' }}>
      <Flow mode="profile" steps={steps} />
    </div>
  );
};

export default CampaignProfile;