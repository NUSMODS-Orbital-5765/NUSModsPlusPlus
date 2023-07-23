import axios from 'axios';

export default async function getModuleList (prefixList, kLevel) {
    try {
    const APILINK = `${process.env.REACT_APP_API_LINK}/module/get-requirement`;
    const returnRequest = await axios.post(APILINK, 
        {
            prefixList: prefixList,
            kLevel: kLevel
        }
    )
    return returnRequest.data.result
    }
    catch(err) {
        console.log(err);
    }
}