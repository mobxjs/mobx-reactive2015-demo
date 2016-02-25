import {autorun, transaction} from 'mobx';
import store, {serializeState, deserializeState} from './domain-state';

var states = [];
var currentFrame = -1;

autorun(() => {
    states.push(serializeState(store));
});

export function previousState() {
    if (currentFrame === -1)
        currentFrame = states.length;
    currentFrame--;
    transaction(() =>
        deserializeState(store, states[currentFrame])
    );
}

export function nextState() {
    currentFrame++;
    transaction(() =>
        deserializeState(store, states[currentFrame])
    );
}
