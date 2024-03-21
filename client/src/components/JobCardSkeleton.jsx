const JobCardSkeleton = () => {
  return (
    <div className='grid w-full gap-3 rounded-xl border bg-white p-4 lg:max-w-full'>
      <div className='flex items-center gap-4'>
        <div className='h-8 w-8 rounded-full bg-gray-100'></div>
        <div className='grid gap-2'>
          <div className='h-4 w-28 rounded-xl bg-gray-100'></div>
          <div className='h-4 w-20 rounded-xl bg-gray-100'></div>
        </div>
      </div>
      <div className='grid gap-2'>
        <div className='h-5 w-48 rounded-xl bg-gray-100'></div>
        <div className='h-5 w-60 rounded-xl bg-gray-100'></div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div className='h-4 w-40 rounded-full bg-gray-100'></div>
        <div className='h-4 w-20 rounded-full bg-gray-100'></div>
      </div>
      <div className='mt-2 grid grid-cols-[1fr_auto] gap-3'>
        <div className=' h-8 w-full rounded-full bg-gray-100'></div>
        <div className='h-8 w-8 rounded-full bg-gray-100'></div>
      </div>
    </div>
  );
};

export default JobCardSkeleton;
