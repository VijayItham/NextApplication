"use client";

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      width:"81vw", 
      justifyContent: 'center', 
      position:"fixed",
      top:'5.1rem',
      alignItems: 'center',
      left:"20vw",
      height: '100vh', 
      textAlign: 'center'
    }}>
      <div>
        <h1>PAGE NOT FOUND</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
