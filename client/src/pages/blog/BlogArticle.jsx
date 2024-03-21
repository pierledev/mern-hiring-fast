import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetArticleDetails } from "@services/articles/queries";
import { Container, PageLoader } from "@components";
import { formatToLocaleDate, sanitizeHTML } from "@utils";
import { useAppContext } from "@context/appContext";
import { AiFillLike } from "react-icons/ai";
import { TbBookmarkFilled } from "react-icons/tb";
import {
  useLikeArticle,
  useSaveArticle,
  useUnlikeArticle,
  useUnsaveArticle,
} from "../../services/articles/mutations";
import { bannersBg } from "../../data";
import toast from "react-hot-toast";

const BlogArticle = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAppContext();
  const {
    data,
    isPending,
    isError: isGettingArticleError,
    error: articleError,
  } = useGetArticleDetails(id);
  const { mutate: likeArticle } = useLikeArticle();
  const { mutate: unlikeArticle } = useUnlikeArticle();
  const { mutate: saveArticle } = useSaveArticle();
  const { mutate: unsaveArticle } = useUnsaveArticle();

  if (isPending) {
    return <PageLoader />;
  }

  if (isGettingArticleError) {
    console.log(articleError);
    toast.error(articleError.response.data.message);
    return;
  }

  const isLiked = Boolean(data.data.likedBy[user._id]);
  const isSaved = Boolean(data.data.savedBy[user._id]);

  const countLikes = Object.keys(data.data.likedBy).length;
  const countSaves = Object.keys(data.data.savedBy).length;

  const handleLike = () => {
    if (!user) {
      toast.loading("You need to login first...", { duration: 1500 });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    likeArticle(data.data._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while liking the article.",
        );
      },
    });
  };

  const handleUnlike = () => {
    unlikeArticle(data.data._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while unliking the article.",
        );
      },
    });
  };

  const handleSave = () => {
    if (!user) {
      toast.loading("You need to login first...", { duration: 1500 });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    saveArticle(data.data._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while saving the article.",
        );
      },
    });
  };

  const handleUnsave = () => {
    unsaveArticle(data.data._id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message ||
            "An error occurred while unsaving the article.",
        );
      },
    });
  };

  return (
    <article>
      <div
        className={`${
          bannersBg[data.data.selectedBanner]
        } align-center flex min-h-[440px] w-full flex-col justify-center bg-cover bg-center bg-no-repeat py-12 text-center text-neutral-200 md:min-h-[500px] lg:py-28`}
      >
        <Container className="max-w-[500px] pt-14 md:max-w-[700px] lg:max-w-[1000px]">
          <h1 className="mb-5 text-white">{data.data.title}</h1>
          <p className="mb-3 text-sm italic text-white">
            {formatToLocaleDate(data.data.createdAt)}
          </p>
          <p>
            Written by{" "}
            <span className="font-medium text-white capitalize">
              {data.data.createdBy.firstName} {data.data.createdBy.lastName}
            </span>
          </p>
          <div className="mb-3 flex items-center justify-center gap-2">
            <p>Associated with</p>
            <Link
              to={`/companies/${data.data.createdBy.company.toLowerCase()}`}
              className="flex items-center gap-2"
            >
              <p className="font-medium text-white underline underline-offset-2 hover:no-underline hover:opacity-90 capitalize">
                {data.data.createdBy.company}
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-xl">
                <AiFillLike />
              </span>
              <span>{countLikes}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl">
                <TbBookmarkFilled />
              </span>
              <span>{countSaves}</span>
            </div>
          </div>
        </Container>
      </div>
      <Container className="min-h-[400px] max-w-[650px]">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeHTML(data.data.content),
          }}
          className="py-10 text-justify leading-relaxed"
        />
        {user?.userType === "job-seeker" && (
          <div className="mb-10 flex items-center gap-5">
            <button
              type="button"
              className={`flex items-center gap-1 transition-all duration-300 ease-linear ${
                isLiked ? "text-blue-600" : "text-neutral-400"
              }`}
              onClick={isLiked ? handleUnlike : handleLike}
            >
              <AiFillLike className="text-2xl" />
              <span>Like</span>
            </button>
            <button
              type="button"
              className={`flex items-center gap-1 text-neutral-400 transition-all duration-300 ease-linear ${
                isSaved ? "text-amber-500" : "text-neutral-400"
              }`}
              onClick={isSaved ? handleUnsave : handleSave}
            >
              <TbBookmarkFilled className="text-2xl" />
              <span>Save</span>
            </button>
          </div>
        )}
      </Container>
    </article>
  );
};

export default BlogArticle;
