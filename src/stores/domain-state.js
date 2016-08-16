import {observable, transaction, createTransformer, asReference} from 'mobx';
import {createSimpleSchema, ref, identifier, child, list, serialize, deserialize, update} from 'serializr';

import Box from './box';

import {randomUuid} from '../utils';

/*
    The store that holds our domain: boxes and arrows
*/
const store = observable({
    boxes: [],
    arrows: [],
    selection: null
});

const arrowModel = createSimpleSchema({
    id: identifier(),
    from: ref(Box),
    to: ref(Box)
});

const storeModel = createSimpleSchema({
    boxes: list(child(Box)),
    arrows: list(child(arrowModel)),
    selection: ref(Box)
})

/*
    Some initial state
*/
store.boxes.push(
    new Box('Rotterdam', 100, 100),
    new Box('Vienna', 650, 300)
);

store.arrows.push({
    id: randomUuid(),
    from: store.boxes[0],
    to: store.boxes[1]
});

store.addBox = function(name, x, y, fromBox) {
    const newBox = new Box(name, x, y);
    this.boxes.push(newBox);
    if (fromBox) {
        this.arrows.push({
            id : randomUuid(),
            from: fromBox,
            to: newBox
        });
    }
    return newBox;
};

export default store;

window.store = store; // for demo

/**
    Serialize this store to json
*/
export function serializeState(store) {
    return serialize(storeModel, store);
}

/**
    Update the store from the given json
*/
export function deserializeState(store, json) {
    update(storeModel, store, json);
}

/**
    Generate 'amount' new random arrows and boxes
*/
export function generateStuff(amount) {
    transaction(() => {
        for(var i = 0; i < amount; i++) {
            store.boxes.push(new Box('#' + i, Math.random() * window.innerWidth * 0.5, Math.random() * window.innerHeight));
            store.arrows.push({
                id: randomUuid(),
                from: store.boxes[Math.floor(Math.random() * store.boxes.length)],
                to:   store.boxes[Math.floor(Math.random() * store.boxes.length)]
            });
        }
    });
}





/**
    Save / Restore the state of the store while this module is hot reloaded
*/
if (module.hot) {
    if (module.hot.data && module.hot.data.store) {
        deserializeState(store, module.hot.data.store);
    }
    module.hot.dispose((data) => {
        data.store = serializeState(store);
    });
}
