import { useEffect, useRef, useState } from 'react';
import IdentityValidation from '@paag-io/sdk-identity-validation';

function IdentityValidationPage() {
  const validationTargetRef = useRef(null);
  const [status, setStatus] = useState('');

  const handleStartFullValidation = () => {
    setStatus('Starting validation...');
  
    if (validationTargetRef.current) {
      validationTargetRef.current.cleanup();
    }

		const identityValidation = new IdentityValidation({
			host: 'https://identity-validation.paag.dev/',
			token: 'B9544D749621BF5FA7D36C60FE0B00A710CF1743',
			target: validationTargetRef.current,
		});

		identityValidation.makeFullIdentityValidation();

		identityValidation.on('success', () => setStatus('Validation successful!'));
		identityValidation.on('fail', () => setStatus('Validation failed.'));
		identityValidation.on('close', () => setStatus('Validation closed.'));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Identity Validation</h1>
      <button onClick={handleStartFullValidation}>Start Validation</button>
      <div ref={validationTargetRef} style={{ width: '100%', height: '500px', border: '1px solid #ccc' }} />
      {status && <p>{status}</p>}
    </div>
  );
}

export default IdentityValidationPage;
