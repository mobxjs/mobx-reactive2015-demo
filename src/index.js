import ReactDOM from 'react-dom';
import React from 'react';
import {observable, asReference} from 'mobx';
import {observer} from 'mobx-react';

import store from './stores/domain-state';
import Canvas from './components/canvas';

const storeInstance = observable(asReference(store));
let storeInstanceId = 0; // forces full re-render so that all components have the correct store

const HotReloadWrapper = observer(() =>
    <Canvas store={storeInstance.get()} key={storeInstanceId} />
);

ReactDOM.render(
    <HotReloadWrapper />,
    document.getElementById('root')
);

/**
    Replace the storeInstance if a new domain-state is available
*/
if (module.hot) {
    // accept update of dependency
    module.hot.accept("./stores/domain-state", function() {
        // obtain new store
        const newStore = require("./stores/domain-state").default;
        // replace store instance
        storeInstanceId++;
        storeInstance.set(newStore);
    });
}
