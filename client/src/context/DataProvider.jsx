import {createContext,useState} from "react";

export const DataContext=createContext(null);


const DataProvider=({children})=>{

    const[account,setAccount]=useState({username:'',name:''});
    return(
        <DataContext.Provider  value={
            {
                //we pass things here that we want to export
                account, setAccount
            }
        }>  {children}
        </DataContext.Provider>
    )
}
export default DataProvider;