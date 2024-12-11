"use client";

export default function NotFound() {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',  // Full viewport height
      textAlign: 'center'
    }}>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
