import {observable, computed} from 'mobx';
import {randomUuid} from '../utils';
import {serializable, identifier} from 'serializr';

export default class Box {
    @serializable(identifier()) id;
    @observable @serializable name = 'Box' + this.id;
    @serializable @observable x = 0;
    @serializable @observable y = 0;
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
