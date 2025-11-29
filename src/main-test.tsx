import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Test simple sans App.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div style={{ padding: '20px', fontSize: '24px' }}>
            <h1>Test - React fonctionne !</h1>
            <p>Si vous voyez ce message, React se charge correctement.</p>
        </div>
    </React.StrictMode>,
)
