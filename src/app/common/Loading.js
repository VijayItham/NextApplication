export default function LoadingSpinner() {
  return (
    <div style={{
      position: 'absolute', 
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, 
      pointerEvents: 'none' 
    }}>
      <img 
        height={50}
        width={50}
        src='/images/loading.gif'
        alt="Loading..."
        style={{ pointerEvents: 'all' }} 
      />
    </div>
  );
}
