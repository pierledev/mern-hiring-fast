import { FormSelect, ArticleCard, Loader } from "@components";
import { useGetSavedArticles } from "@services/articles/queries";

const SavedArticles = () => {
  const { data, isPending, isError, error } = useGetSavedArticles();

  return (
    <div className="grid content-start gap-8">
      <h1 className="text-4xl lg:text-left">Saved Articles</h1>
      {isPending && <Loader />}
      {isError && (
        <h3 className="text-center lg:text-left">
          {error.response.data.message || error.message}
        </h3>
      )}
      {data && data.data.length === 0 && (
        <h3 className="text-center lg:text-left">No articles found.</h3>
      )}
      {data && data.data.length > 0 && (
        <>
          {/* <div className="mt-4 grid gap-2">
            <p className="text-center lg:justify-self-start">
              <span className="text-lg font-bold">{data.data.length}</span>{" "}
              articles found
            </p>
            <form className="grid place-items-center lg:justify-self-start">
              <FormSelect
                optionValues={["oldest", "newest", "a-z", "z-a"]}
                defaultValue="newest"
                className="w-28"
              />
            </form>
          </div> */}
          <div className="mt-8 grid w-full gap-4 sm-upper:grid-cols-2 lg:mt-10 xl:grid-cols-3">
            {data.data.map((savedArticle) => (
              <ArticleCard key={savedArticle._id} article={savedArticle} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedArticles;
