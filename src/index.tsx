import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import './styles/normilize.scss'
import { Provider } from 'react-redux';
import { store } from './app/store';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <HashRouter>
        <React.StrictMode>
            <App />
        </React.StrictMode>
      </HashRouter>
    </Provider>
  );
}

