import React from 'react';
import searchIcon from '../assets/magnifier.svg'
function SearchBoxComponent(props) {

    return (
        <div>
            <input type='text' placeholder='Search' id='search-text-input' data-test-id='search-test' onInput={props.onInputValue} />
            <div id='button-holder'>
                <img alt='search-icon'src={searchIcon} />
            </div>
        </div>
    )
}
export default SearchBoxComponent;
