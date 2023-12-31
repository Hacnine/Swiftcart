import { NavLink } from 'react-router-dom'
import PurpleBtn from '../components/PurpleBtn'
import detective from '../assets/detective.svg'
const Error = () => {
  return (
    <div className='mt-20 mb-60 flex items-center justify-center flex-col gap-3'>
      <img src={detective} alt="error image"
      className=' w-64 h-64'
       />
      <h1 className=' text-7xl  font-semibold'>404</h1>
      <h2 className=' text-4xl'>OH OH! You're lost</h2>
      <p className=' font-semibold text-gray-500 tracking-tight'>The page you are looking does not exist. How you got here. You can click the button below to go back to the homepage.</p>
      <PurpleBtn children={''}>
        <NavLink to={'/'}>
        GO BACK TO HOME
        </NavLink>
      </PurpleBtn>
    </div>
  )
}

export default Error
