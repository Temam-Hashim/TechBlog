import Sidebar from '../../components/sidebar/Sidebar'
import './Single.css'
import SinglePost from './../../components/singlePost/SinglePost';

function Single() {
  return (
    <div className='row single'>
        {/* single post here */}
        <SinglePost/>
        {/* side bar here */}
       <Sidebar/>
    </div>
  )
}

export default Single