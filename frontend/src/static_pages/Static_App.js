import { Route } from 'react-router-dom';
import Library_History from './pages/Library_History';

function Static_App() {
    return (
        <>
            <Route path="/library-history" element={<Library_History />} />
        </>
    );
}

export default Static_App;
