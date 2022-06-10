import React from 'react';
import './index.css';

import { createRoot } from 'react-dom/client';

// For start program use:
//          ./run.ts entry_point_name
// example:
//          ./run.ts Router.tsx

import('./' + process.env.REACT_APP_ENTRY!).then(App => {
  const APP_DEFAULT = App.default;
  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <APP_DEFAULT />
    </React.StrictMode>,
  )
});