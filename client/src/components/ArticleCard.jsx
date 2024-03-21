import { useToggle } from "@hooks";
import { useAppContext } from "@context/appContext";
import { useDeleteArticle } from '@services/articles/mutations';
import { Link, useNavigate } from "react-router-dom";
import { TbDots } from "react-icons/tb";
import { banners } from "../data";
import { sanitizeHTML } from "@utils";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const { user, setArticleToBeUpdated } = useAppContext();
  const isAuthor = article?.createdBy === user?._id;
  const [isArticleActionsOpen, toggleArticleActions] = useToggle();
  const {
    mutate: deleteArticle
  } = useDeleteArticle();

  const handleUpdateArticle = () => {
    setArticleToBeUpdated(article);
    navigate("/dashboard/post-article");
  };

  return (
    <article className="relative overflow-hidden rounded-2xl bg-white p-3">
      <div className="h-[180px] overflow-hidden rounded-xl">
        <img
          src={banners[article.selectedBanner]}
          alt={article.title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div>
        <h3 className="mb-2 mt-3 text-lg leading-7">
          <Link
            to={`/blog/${article._id}`}
            className="hover:text-neutral-600k transition line-clamp-2"
          >
            {article.title}
          </Link>
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(article.content),
          }}
          className="text-base line-clamp-3"
        />
      </div>

      {/* Actions -- Edit or Delete */}
      {isAuthor && (
        <button
          type="button"
          className="ease absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-white text-xl text-neutral-500 transition-all duration-300 hover:text-blue-600"
          onClick={toggleArticleActions}
        >
          <TbDots />
        </button>
      )}
      {isArticleActionsOpen && (
        <ul className="absolute right-8 top-16 grid gap-1 rounded-lg bg-white px-2 py-2 shadow-sm">
          <li>
            <button
              type="button"
              onClick={handleUpdateArticle}
              className="block w-28 rounded-md py-1 transition-all duration-300 ease-linear hover:bg-blue-500/5 hover:text-blue-500"
            >
              Update
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => deleteArticle(article._id)}
              className="block w-28 rounded-md py-1 transition-all duration-300 ease-linear hover:bg-red-500/5 hover:text-red-500"
            >
              Delete
            </button>
          </li>
        </ul>
      )}
    </article>
  );
};

export default ArticleCard;
