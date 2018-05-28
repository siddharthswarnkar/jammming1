import React, {Component} from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction() {
    if(!this.props.isRemoval) { 
        return (<div>
                    <a className="Track-action" onClick={this.addTrack} >+</a>
                </div> 
                );
    }
    return (<div>
                <a className="Track-action" onClick={this.removeTrack} >-</a>
            </div> 
            );
    }
    
    addTrack() {
        console.log(this.props.track);
        return this.props.onAdd(this.props.track);
    }

    removeTrack() {
        return this.props.onRemove(this.props.track);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name} </h3>
                    <p>{this.props.track.artists[0].name} {this.props.track.album} </p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;