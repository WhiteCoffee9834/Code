import axios from "axios"
import {GETDATA,CHANGESELECT,CHANGESELECTALL,CHANGENUMBER,DEL} from "../constants/ActionTypes"
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
    },
    delItem(obj){
        return(dispatch)=>{
            axios.post("/api/cartdelete",{id:obj.id}).then(res=>{
                if(res.data.code === 200){
                    dispatch({
                        type:DEL,
                        payload:obj
                    })
                }else{
                    alert("删除失败,请刷新页面")
                }
            })
        }
    }
}
export default action