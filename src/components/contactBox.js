function ContactBox(prop){
    return(
        <div id="contact-box" onClick={()=>{prop.onClickComp(prop.item,true)}}>
            {prop.item.name}
        </div>
    )
}
export default ContactBox;