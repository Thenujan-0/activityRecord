import React from 'react';
import ReactDOM from 'react-dom/client';

import Calendar from './Calendar';

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    Index.render(
        <React.StrictMode>
            <div className="container d-flex align-items-center justify-content-center">
                <Calendar year="2023" month="4"/>
            </div>
        </React.StrictMode>
    )
}
