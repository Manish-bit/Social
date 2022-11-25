import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../posts/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'


const Posts = () => {

  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.authReducer.authData)
  console.log(user)
  const {posts, loading}= useSelector((state)=>state.postReducer)

  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])

  return (
    <div className='posts'>
        {loading ? "Fetching posts":
            posts.map((post,id)=>{
                return <Post data={post} id={id}/>
            })
        }
    </div>
  )
}

export default Posts