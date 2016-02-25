import {observable, computed} from 'mobx';
import {randomUuid} from '../utils';

export default class Box {
    id; // for react
    @observable name = "Box" + this.id;
    @observable x = 0;
    @observable y = 0;
    @computed get width() {
        return this.name.length * 15;
    }

    constructor(name, x, y, id) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.id = id || randomUuid();
    }
}

window.Box = Box; // for demo
