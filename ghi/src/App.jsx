// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Construct from './components/Construct';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import './App.css';

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST;

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined');
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navigation />
            </header>
            <Routes>
                <Route path="/" element={<Construct />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/signin" element={<SignInForm />} />
            </Routes>
        </div>
    );
}

export default App;
