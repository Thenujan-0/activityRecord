import React from 'react';
import ReactDOM from 'react-dom/client';

import Calendar from './Calendar';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Example;
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
