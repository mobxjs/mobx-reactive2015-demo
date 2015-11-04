import React, {Component} from 'react';
import {observer} from 'mobservable-react';

import {generateStuff} from '../stores/domain-state';
import * as history from '../stores/time';

export default observer(() => (<div className="funstuff">
    <button onClick={generateItems}>!</button>
    <button onClick={previous}>&lt;</button>
    <button onClick={next}>&gt;</button>
</div>));

function generateItems() {
    generateStuff(500);
}

function previous() {
    history.previousState();
}

function next() {
    history.nextState();
}
