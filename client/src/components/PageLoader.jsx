import { SiThunderbird } from 'react-icons/si';

const PageLoader = () => {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 grid min-h-screen place-items-center bg-white'>
      <div className='zoom-in-out grid justify-items-center gap-2 text-blue-800'>
        <span className='text-5xl'>
          <SiThunderbird />
        </span>
        <p className='font-bebas-neue text-2xl'>Hiring Fast</p>
      </div>
    </div>
  );
};

export default PageLoader;
