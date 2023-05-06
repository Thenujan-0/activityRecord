import React from 'react';
import ReactDOM from 'react-dom/client';

import FullCalendar from './FullCalendar';

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    Index.render(
        <React.StrictMode>
            <div className="container d-flex align-items-center justify-content-center">
                <FullCalendar year="2023" month="4"/>
            </div>
        </React.StrictMode>
    )
}
