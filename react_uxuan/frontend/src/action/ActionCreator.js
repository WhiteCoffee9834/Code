import axios from "axios"
import {GETDATA,CHANGESELECT,CHANGESELECTALL,CHANGENUMBER} from "../constants/ActionTypes"
let action = {
    getData(){
        let uid = sessionStorage.getItem("uid")
        return(dispatch)=>{
            axios.get(`/api/cartlist?uid=${uid}`).then(res=>{
                dispatch({
                    type:GETDATA,
                    payload:res.data.list
                })
            })
        }
    },
    // changeSelect(obj){
    //     return(dispatch)=>{
    //         dispatch({
    //             type:CHANGESELECT,
    //             payload:obj
    //         })
    //     }
    // },
    changeSelect(obj){
        return{
            type:CHANGESELECT,
            payload:obj
        }
    },
    selectAllButton(){
        return{
            type:CHANGESELECTALL
        }
    },
    changeNumber(obj){
        return{
            type:CHANGENUMBER,
            payload:obj
        }
    }
}
export default action