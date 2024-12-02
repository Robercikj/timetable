import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from react-dom/client for React 18
import { BrowserRouter as Router } from 'react-router-dom';  // Wrap with Router
import './index.css';
import App from './App';

// Use the new createRoot API to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>  {/* Wrap the whole App with Router */}
        <App />
    </Router>
);
