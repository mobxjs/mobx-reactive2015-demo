import {observable, transaction, createTransformer} from 'mobservable';
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

/*
    Some initial state
*/
store.boxes.push(
    new Box("Rotterdam", 100, 100),
    new Box("Vienna", 650, 300)
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
const serializeBox = createTransformer(box => ({...box}));

const serializeArrow = createTransformer(arrow => ({
    id: arrow.id,
    to: arrow.to.id,
    from: arrow.from.id
}));

export const serializeState = createTransformer(store => ({
    boxes: store.boxes.map(serializeBox),
    arrows: store.arrows.map(serializeArrow),
    selection: store.selection ? store.selection.id : null
}));

/**
    Update the store from the given json
*/
export function deserializeState(store, data) {
    const findBox = id => store.boxes.find(box => box.id === id);
    store.boxes = data.boxes.map(box => new Box(box.name, box.x, box.y, box.id));
    store.arrows = data.arrows.map(arrow => ({
        id: arrow.id,
        from: findBox(arrow.from),
        to: findBox(arrow.to)
    }));
    store.selection = findBox(data.selection);
}

/**
    Generate 'amount' new random arrows and boxes
*/
export function generateStuff(amount) {
    transaction(() => {
        for(var i = 0; i < amount; i++) {
            store.boxes.push(new Box("#" + i, Math.random() * window.innerWidth * 0.5, Math.random() * window.innerHeight));
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
    module.hot.accept();
    if (module.hot.data && module.hot.data.store) {
        deserializeState(store, module.hot.data.store);
    }
    module.hot.dispose((data) => {
        data.store = serializeState(store);
    });
}
