 
  export const styles = {
    mainBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      bgcolor: 'background.default',
      pt: '1rem',
      pb: '1rem',
    },
    innerBox: {
      border: '2px solid', 
      borderColor: 'secondary.main', 
      borderRadius: '1.5rem', 
      mr: '1.7rem',
      ml: '1.7rem',
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: 'background.white',
      p: '1rem',  
    },
    heading: {
      color: 'text.primary',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      mb: 2,
      pr: 3,
      pl: 3,
    },
    form: {
      display: 'flex',  
      flexDirection: 'column',  
      alignItems: 'center',  
      justifyContent: 'center',
      '& > :not(style)': { m: 1, width: '12rem' },
    }
  };