import { v4 as uuidv4 } from 'uuid';

export const formatData = (data)=>{
    const formattedArray = [];
    data.forEach(d=>{
        d.id=uuidv4();
        d.isFav=false;
        formattedArray.push(d)
    })
    return formattedArray;
}