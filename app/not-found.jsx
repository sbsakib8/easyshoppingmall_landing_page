import { Link } from 'lucide-react'

const Error404 = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-secondary'> 404 Not Found</h1>
        <p className='text-gray-500 mt-2'>The page you are looking for does not exist</p>
        <Link href='/' className='mt-4 px-4 py-2 bg-primary-color text-accent-content rounded-lg' >Go back Home</Link>
      </div>
    </div>
  )
}

export default Error404