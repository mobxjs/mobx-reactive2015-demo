import ReactDOM from 'react-dom';
import React from 'react';
import Canvas from './components/canvas';
import store from './stores/domain-state';
import mobx from 'mobx';

ReactDOM.render(
    <Canvas store={store} />,
    document.getElementById('root')
);

window.mobx = mobx; // for demo
