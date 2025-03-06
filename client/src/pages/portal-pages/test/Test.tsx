import useDevice from '@/hooks/useDevice';

const Test = () => {
  const deviceType = useDevice();
  return (
    <div>
      <div>
        <h2>Device Type: {deviceType}</h2>
        {deviceType === 'mobile' && <p>This is a mobile device.</p>}
        {deviceType === 'tablet' && <p>This is a tablet device.</p>}
        {deviceType === 'desktop' && <p>This is a desktop device.</p>}
      </div>
    </div>
  );
};

export default Test;
