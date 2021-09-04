import './App.css';
import SearchBoxComponent from './components/searchBox';
import Grid from '@material-ui/core/Grid';
import { contactList } from './assets/data'
import { Fragment, useEffect, useState } from 'react';
import * as helper from './utils'
import ContactBoxComponent from './components/contactBox';
import DetailedContactComponent from './components/detailedContact'
function App() {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [fav, setFav] = useState(false)
  const [selectedContact, setSelectedContact] = useState('')
  const [showPopup, setShowPopup] = useState(false);
  /** Using the useEffect hook here, inorder to make the data-formating asynchronous.
   * If needed , in future we can modify the 'formatData' function to fetch contacts from
   * 3rd party services/APIs
   */
  useEffect(() => {
    setData(helper.formatData(contactList))
  }, [])

  function handleSearchText(event) {
    // console.log(event.target.value)
    setSearchText(event.target.value)
  }
  function handleMouseClick(data,isShow) {
    setShowPopup(isShow)
    setSelectedContact(data)
  }
  function handleFavAdding(item){
    const indexf=(i)=>i.id===item.id;
    const index = data.findIndex(indexf)
    item.isFav = !item.isFav;
    data[index]=item;
    setData(data)
  }
  function renderContacts(srTxt, isFilter) {
    let list = [];
    if (srTxt) {
      list = data.filter(d => d.name.toUpperCase().indexOf(searchText.toUpperCase()) >= 0)
    }

    if (isFilter) {
      list = data.filter(d=>d.isFav)
    }
    return (
      <Fragment>
        {list.map(item => {
          return (
            <Fragment key={item.id}>
              <Grid item xs={1} md={4} />
              <Grid item xs={12} md={5}>
                <ContactBoxComponent item={item} onClickComp={handleMouseClick} />
              </Grid>
              <Grid item  md={3} />
            </Fragment>
          )
        })}
      </Fragment>
    )

  }
  const clName = !selectedContact ? "App App-header" : "App App-header blur-bg"
  return (
    <Fragment>
      <div className={clName}>

        <Grid container>
          <Grid item xs={1} md={5} />
          <Grid item xs={12} md={5}>
            <h3>Contacts</h3>
          </Grid>
          <Grid item  md={3} />
        </Grid>

        <Grid container>
          <Grid item  md={4} />
          <Grid item xs={12} md={4}>
            <SearchBoxComponent onInputValue={handleSearchText} />

          </Grid>

          <Grid item  md={4} />
        </Grid>
        <br />

        <Grid container>
          <Grid item md={5} />
          <Grid item xs={12} md={3} id='filter-button'> <input type='button' value={!fav ? 'Filter Favourites' : 'Show all'} onClick={() => setFav(!fav)} /> </Grid>
          <Grid item  md={5} />

        </Grid>
        <br />

        <Grid container spacing={1}>
          {!fav ? renderContacts(true, false) : renderContacts(false, true)}
        </Grid>
      </div>
      {showPopup ? <DetailedContactComponent data={selectedContact} handleClose={handleMouseClick} handleFav ={handleFavAdding}/> : ''}
    </Fragment>
  );
}

export default App;
