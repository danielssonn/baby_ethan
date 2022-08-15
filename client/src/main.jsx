import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import TransactionProvider from './providers/TransactionProvider'
import ContractProvider from './providers/ContractProvider'


const rootElement = document.getElementById('root')

ReactDOM.render(
    <TransactionProvider>
        <ContractProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ContractProvider>
    </TransactionProvider>,
    rootElement
)
