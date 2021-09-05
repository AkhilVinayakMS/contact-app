import Grid from '@material-ui/core/Grid';
import starFillIcon from '../assets/star.svg';
import starBorderIcon from '../assets/star_border.svg'
import closeIcon from '../assets/close.svg'
import { useState } from 'react';
function DetailedContact(props) {
    const [fav,setFav]=useState(props.data.isFav)
    function handleFav(){
        setFav(!fav)
        props.handleFav(props.data)
    }
    return (
        <Grid container>
            <Grid item md={2} />
            <Grid item xs={11} md={8} className='popup'>
                <Grid container>
                    <Grid item xs={1} md={5} />
                    <Grid item xs={8} md={6}>
                        <div>
                        <b>{props.data.name}</b>
                        <div id='fav-icon'><img alt='fav-icon'src={fav?starFillIcon:starBorderIcon} onClick={handleFav}></img></div>
                    </div>
                    </Grid>
                    <Grid item md={1} xs={1} >
                        <img alt='close-icon' id = 'close-icon'src={closeIcon} onClick={()=>props.handleClose('',false)}></img>
                    </Grid>
                </Grid>
                <br/>
                <br/>
            <Grid container>
                <Grid item md={4}/>
                <Grid item xs ={12} md={4} ><div className='email-display'>{props.data.email}</div></Grid>
                <Grid item md={3}/>
            </Grid>
            </Grid>
            <Grid item md={2} />
        </Grid>
    )
}
export default DetailedContact;