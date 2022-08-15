import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Landing } from './pages'

const App = () => {
    useEffect(() => {
        window.process = {
            ...window.process,
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
