import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'
import styled from "./ModuleCss/Profile.module.css";

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const [mypics,setPics]=useState([])
    
    const {state,dispatch} = useContext(UserContext)
    console.log('state:', state)
    const { userid } = useParams()
    
    useEffect(()=>{
       fetch(`/myposts`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
         console.log('result:', result)
         setPics(result.myposts)
       })
    },[])
    return (
        <>
        <div className={styled.mainDivProf}>
            <div className={styled.prof2}>
                <div>
                    <img src="" alt="profile" className={styled.prof2_img}  />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div className={styled.prof2_conte} >
                        <h6>{mypics.length} Posts</h6>
                         <h6>{state?state.followers.length:"0"} followers</h6>
                       <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                    </div>
                    </div>
                <div className={styled.gallary}>
               {
                   mypics.map(item=>{
                       return(
                        <img key={item._id} className={styled.item} src={item.photo} alt={item.title}/>  
                       )
                   })
               }
               </div>
            </div> 
            </>
    )
}

export default Profile
