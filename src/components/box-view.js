import React, {Component} from 'react';
import {observable, transaction} from 'mobservable';
import {observer} from 'mobservable-react';
import {DraggableCore} from 'react-draggable';

@observer
class BoxView extends Component {
    render() {
        const {box} = this.props;
        return (
            <DraggableCore onDrag={this.handleDrag}>
                <div
                    style={{
                        width: box.width,
                        left: box.x,
                        top: box.y
                    }}
                    onClick={this.handleClick}
                    className={this.isSelected ? "box box-selected" : "box" }
                >
                    {box.name}
                </div>
            </DraggableCore>
        )
    }

    @observable get isSelected() {
        return this.props.store.selection === this.props.box;
    }

    handleClick = (e) => {
        this.props.store.selection = this.props.box;
        e.stopPropagation();
    }

    handleDrag = (e, dragInfo) => {
        transaction(() => {
            this.props.box.x += dragInfo.position.deltaX;
            this.props.box.y += dragInfo.position.deltaY;
        });
    }
}

export default BoxView;
