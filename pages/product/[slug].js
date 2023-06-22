import { useRouter } from 'next/router'
 
const Post = () => {
  const router = useRouter()
  return <p>The slug is: {router.query.slug}</p>
}

export default Post