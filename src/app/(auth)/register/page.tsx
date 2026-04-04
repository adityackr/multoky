'use client';

import { useState } from 'react';

const RegisterPage = () => {
	const [step, useStep] = useState<1 | 2>(1);

	return (
		<div>
			{/* For step 1 UI */}
			<div></div>
			{/* For step 2 UI */}
			<div></div>
		</div>
	);
};

export default RegisterPage;
