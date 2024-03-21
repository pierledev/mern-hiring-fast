import { useGetPostedArticles } from "@services/articles/queries";
import { ArticleCard, FormSelect, Loader } from "@components";

const PostedArticles = () => {
  const {
    data: postedArticles,
    isPending: isGetPostedArticlesPending,
    isError: isGetPostedArticlesError,
    error: postedArticlesError,
  } = useGetPostedArticles();

  return (
    <div className="grid content-start gap-8">
      <h1 className="text-4xl lg:text-left">Posted Articles</h1>
      {isGetPostedArticlesPending && <Loader />}
      {isGetPostedArticlesError && (
        <h3 className="text-center lg:text-left">
          {postedArticlesError.message}
        </h3>
      )}
      {postedArticles && postedArticles.data.length === 0 && (
        <h3 className="text-center lg:text-left">No articles found.</h3>
      )}
      {postedArticles && postedArticles.data.length > 0 && (
        <>
          {/* <div className="mt-4 grid gap-2">
            <p className="text-center lg:justify-self-start">
              <span className="text-lg font-bold">
                {postedArticles.data.length}
              </span>{" "}
              entries found
            </p>
            <form className="grid place-items-center lg:justify-self-start">
              <FormSelect
                optionValues={["oldest", "newest", "a-z", "z-a"]}
                defaultValue="newest"
                className="w-28"
              />
            </form>
          </div> */}
          <div className="grid w-full gap-4 sm-upper:grid-cols-2 xl:grid-cols-3">
            {postedArticles.data.map((postedArticle) => (
              <ArticleCard
                key={postedArticle._id}
                article={postedArticle}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostedArticles;
