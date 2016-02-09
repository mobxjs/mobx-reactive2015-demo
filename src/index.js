import ReactDOM from 'react-dom';
import React from 'react';
import Canvas from './components/canvas';
import store from './stores/domain-state';
import mobservable from 'mobservable';

ReactDOM.render(
    <Canvas store={store} />,
    document.getElementById('root')
);

window.mobservable = mobservable; // for demo
