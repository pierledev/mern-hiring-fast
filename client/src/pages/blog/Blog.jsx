import { useGetAllArticles } from "@services/articles/queries";
import { Container, ArticleCard, Loader } from "@components";
// import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

const Blog = () => {
  const { data, isPending, isError, error } = useGetAllArticles();

  return (
    <main>
      <section className="bg-hero-blogs bg-cover bg-center bg-no-repeat">
        <Container className="flex min-h-[260px] flex-col items-center justify-center gap-6 pt-6">
          <h1 className="text-white">Blog</h1>
          {/* <form className='relative w-full md:mx-auto md:w-[600px]'>
          <input
            type='text'
            placeholder='Search article...'
            name='search'
            className='w-full rounded-full bg-neutral-50 px-4 py-2 text-center text-lg capitalize text-neutral-800 outline-none lg:py-3'
          />
          <button
            type='button'
            className='absolute right-0 top-2/4 grid -translate-y-1/2 place-items-center pr-4 text-2xl text-neutral-950'
          >
            <HiOutlineMagnifyingGlass />
          </button>
        </form> */}
        </Container>
      </section>

      {/* Articles */}
      <section>
        {!data && (
          <Container className="flex justify-center">
            {isPending && <Loader />}
            {isError && (
              <h3 className="text-center">
                {error.response.data.message || error.message}
              </h3>
            )}
          </Container>
        )}
        {data && data.data.length === 0 && (
          <Container>
            <h3 className="text-center">Articles not found.</h3>
          </Container>
        )}
        {data && data.data.length > 0 && (
          <Container className="grid gap-10 sm-upper:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.data.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </Container>
        )}
      </section>
    </main>
  );
};

export default Blog;
