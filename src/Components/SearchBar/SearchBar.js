import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchTerm: ''};
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        if(this.state.searchTerm !== ''){
            this.props.onSearch(this.state.searchTerm);
        }
        else {
            alert('Please enter your search term');
        }
    }

    handleTermChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" id="searchInput" onChange={this.handleTermChange} />
                <a onClick={this.search} >SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;