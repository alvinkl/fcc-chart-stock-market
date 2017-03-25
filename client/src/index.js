import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3100')
socket.on('connection')

ReactDOM.render(
  <SocketProvider socket={ socket }>
    <App />
  </SocketProvider>,
  document.getElementById('root')
);
