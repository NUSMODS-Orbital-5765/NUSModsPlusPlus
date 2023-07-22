import axios from 'axios';

export default async function get3k4kModuleList (prefixList, kLevel) {
    try{
    const APILINK = `${process.env.REACT_APP_API_LINK}/module/get-requirement`;
    const moduleList = await axios.post(APILINK, 
        {
            prefixList: prefixList,
            kLevel: kLevel
        }
    )
    return moduleList
    }
    catch(err) {
        console.log(err);
    }
}