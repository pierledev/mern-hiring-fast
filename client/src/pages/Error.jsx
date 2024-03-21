import { Link } from 'react-router-dom';
import { Container } from '@components';

const Error = () => {
  return (
    <main>
      <Container className='grid min-h-screen place-items-center'>
        <div className='grid w-full max-w-md justify-center gap-2 text-center'>
          <h1 className='font-bebas-neue text-6xl font-normal md:text-8xl'>
            404 <br /> NOT FOUND
          </h1>
          <p className='md:text-xl'>
            The page you are looking for does not exist
          </p>
          <Link
            to='/'
            className='btn mt-5 bg-neutral-950 py-3 text-white transition hover:bg-neutral-800 md:text-lg'
          >
            Back to Home page
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default Error;
