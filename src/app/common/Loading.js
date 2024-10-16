export default function LoadingSpinner() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // ensure it's on top of everything else
          pointerEvents: 'none' // prevent interaction with anything under the overlay
        }}>
          <img 
            src='/images/loading.gif'
            alt="Loading..."
            style={{ pointerEvents: 'all' }} // ensure the spinner itself can be clicked if needed
          />
        </div>

      </div>
    );
  }