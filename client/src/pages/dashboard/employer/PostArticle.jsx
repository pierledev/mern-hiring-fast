import { useState } from "react";
import { useAppContext } from "@context/appContext";
import { usePostArticle, useUpdateArticle } from "@services/articles/mutations";
import { Container, FormInput, PostEditor } from "@components";
import { stripHtmlTags } from "@utils";
import { banners, bannerOptions } from "../../../data";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostArticle = () => {
  const navigate = useNavigate();

  const { articleToBeUpdated, setArticleToBeUpdated } = useAppContext();

  const [article, setArticle] = useState({
    title: articleToBeUpdated?.title || "",
    selectedBanner: articleToBeUpdated?.selectedBanner || "banner1",
    content: articleToBeUpdated?.content
      ? stripHtmlTags(articleToBeUpdated?.content)
      : "",
  });

  const handleArticleInputChange = (e) =>
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const { mutate: postArticle, isPending: isPostingPending } = usePostArticle();
  const { mutate: updatePost, isPending: isUpdatingPending } =
    useUpdateArticle();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (articleToBeUpdated) {
      updatePost(
        {
          articleId: articleToBeUpdated._id,
          updatedArticle: article,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setArticleToBeUpdated(null);
            navigate("/dashboard/posted-articles");
          },
          onError: (error) => {
            toast.error(
              error.response.data.message ||
                "An error occurred while posting the job.",
            );
          },
        },
      );
    } else {
      postArticle(article, {
        onSuccess: (data) => {
          toast.success(data.message);
          setArticle({ title: "", selectedBanner: "banner1", content: "" });
        },
        onError: (error) => {
          toast.error(
            error.response.data.message ||
              "An error occurred while posting the job.",
          );
        },
      });
    }
  };

  return (
    <div className="w-full">
      <Container className="w-full max-w-[600px] px-0 lg:max-w-full lg:px-0">
        <form onSubmit={handleSubmit}>
          <FormInput
            name="title"
            placeholder="Title"
            value={article.title}
            handleChange={handleArticleInputChange}
            disabled={isPostingPending || isUpdatingPending}
            required
          />
          <div className="mt-5">
            <p className="text-lg font-medium capitalize">Banner</p>
            <div className="relative mx-auto mb-4 mt-2 h-[120px] w-full overflow-hidden rounded-3xl bg-neutral-50 md:h-[200px]">
              <img
                src={banners[article.selectedBanner]}
                alt="Article Banner"
                className="h-full w-full bg-white object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-1">
              {bannerOptions.map((banner) => (
                <label
                  key={banner.id}
                  htmlFor={banner.id}
                  className={`relative cursor-pointer ${
                    article.selectedBanner === banner.id ? "#3498db" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={banner.id}
                    name="selectedBanner"
                    value={banner.id}
                    checked={article.selectedBanner === banner.id}
                    onChange={handleArticleInputChange}
                    disabled={isPostingPending || isUpdatingPending}
                    className="absolute h-0 w-0 opacity-0"
                  />
                  <img
                    src={banner.imgUrl}
                    alt={`Banner ${banner.id}`}
                    className={`h-10 w-10 rounded-full border-[3px] border-transparent transition-all duration-300 ease-linear ${
                      article.selectedBanner === banner.id
                        ? "border-blue-400"
                        : ""
                    }`}
                  />
                </label>
              ))}
            </div>
          </div>
          <PostEditor
            content={article.content}
            setContent={(newValue) =>
              setArticle((prevState) => ({ ...prevState, content: newValue }))
            }
          />
          <button type="submit" className="btn btn-primary mt-6 h-12">
            {isPostingPending && "Posting..."}
            {isUpdatingPending && "Updating..."}
            {!isPostingPending &&
              !isUpdatingPending &&
              articleToBeUpdated &&
              "Update"}
            {!isPostingPending &&
              !isUpdatingPending &&
              !articleToBeUpdated &&
              "Post"}
          </button>
        </form>
      </Container>
    </div>
  );
};

export default PostArticle;
