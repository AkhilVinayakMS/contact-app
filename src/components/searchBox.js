import React from 'react';
import searchIcon from '../assets/magnifier.svg'
function SearchBoxComponent(props) {

    return (
        <div class='search-outer'>
            <input type='text' placeholder='Search' id='search-text-input' onInput={props.onInputValue} />
            <div id='button-holder'>
                <img src={searchIcon} />
            </div>
        </div>
    )
}
export default SearchBoxComponent;
