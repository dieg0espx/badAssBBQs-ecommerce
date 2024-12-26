import React from 'react';



const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Website Temporarily Unavailable</h1>
      <p style={styles.message}>
        This website is temporarily unavailable. Please check back later.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
  },
};

export default App;

