import ReactDOM from 'react-dom';
import React from 'react';
import Canvas from './components/canvas';
import store from './stores/domain-state';
import mobservable from 'mobservable';

// uncomment next line to enable the dev-tools.
import 'mobservable-react-devtools';

ReactDOM.render(
    <Canvas store={store} />,
    document.getElementById('root')
);

window.mobservable = mobservable; // for demo
