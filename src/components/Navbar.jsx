import logo from '../assets/svg/quizics-logo.svg';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className='flex bg-light-100 items-center justify-between w-screen px-4 py-3 bg-light border-b-2'>
      <div className='flex items-end'>
        <img src={logo} alt='logo' className='w-6' />
        <h1 className='text-dark-200 ml-0.5'>uizics</h1>
      </div>
      <ul className='flex items-start justify-between list-none tracking-wide font-extralight space-x-5'>
        <li className='mr-3'>
          <a href='#'>
            <Button
              text='Sign Up'
              textCol='text-dark-100'
              hover='hover:text-green-300'
            />
          </a>
          <a href='#'>
            <Button
              text='Sign Up'
              bgCol='bg-blue-200'
              textCol='text-light-100'
              hover='hover:bg-green-100'
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
