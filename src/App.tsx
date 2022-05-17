import moment from 'moment';
import React from 'react';
import { AppProvider } from './components/providers/AppProvider';
import { AppRoute } from './components/routes';
// import AppR

function App() {
    moment().locale('de');
    return (
        // <div className="select-none">
        <AppProvider>
            <AppRoute />
        </AppProvider>
        // </div>
    );
}

export default App;
