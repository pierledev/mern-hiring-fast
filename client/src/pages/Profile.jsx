import { useRef, useState } from "react";
import { useAppContext } from "@context/appContext";
import { useUpdateUser } from "@services/users/mutations";
import { setFileToBase } from "@utils";
import { Container, FormInput } from "@components";
import { AiTwotoneCamera } from "react-icons/ai";
import toast from "react-hot-toast";
import defaultAva from "@assets/default-ava.webp";

const Profile = () => {
  const { user, setUser } = useAppContext();
  const [userData, setUserData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  });
  const [previewImage, setPreviewImage] = useState(
    user?.userPicture?.url || user?.companyLogo?.url || defaultAva,
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const { mutate: updateUser, isPending: isUpdatingUserPending } =
    useUpdateUser();

  const fileInputRef = useRef();

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) =>
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userUpdatedData = { ...userData };

    if (selectedImage) {
      if (user?.userType === "employer") {
        userUpdatedData.companyLogo = await setFileToBase(selectedImage);
      } else {
        userUpdatedData.userPicture = await setFileToBase(selectedImage);
      }
    }

    await updateUser(userUpdatedData, {
      onSuccess: (data) => {
        setUser(data.data);
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error.response.data.message === "request entity too large"
            ? "Only upload small image/don't need to upload image"
            : error.response.data.message ||
                error.response.data ||
                error.message ||
                "There is something wrong in our end. Please try again later.",
        );
      },
    });
  };

  return (
    <main>
      <section className="bg-hero-purpies bg-cover bg-center bg-no-repeat">
        <Container className="grid min-h-[240px] place-items-center">
          <h1 className="mt-7 text-white">My Profile</h1>
        </Container>
      </section>
      <section>
        <Container>
          <form
            className="mx-auto grid w-full max-w-md gap-5"
            onSubmit={handleSubmit}
          >
            <div className="relative mx-auto mb-6 h-32 w-32 rounded-full border-2 bg-neutral-50 md:h-36 md:w-36">
              <img
                src={previewImage}
                alt="Profile"
                onClick={handlePictureClick}
                className="h-full w-full cursor-pointer rounded-full bg-white object-cover object-center opacity-60"
              />
              <AiTwotoneCamera className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-3xl text-neutral-400" />

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                disabled={isUpdatingUserPending}
              />
            </div>
            <FormInput
              name="firstName"
              label="first name"
              value={userData.firstName}
              handleChange={handleInputChange}
              disabled={isUpdatingUserPending}
            />
            <FormInput
              name="lastName"
              label="last name"
              value={userData.lastName}
              handleChange={handleInputChange}
              disabled={isUpdatingUserPending}
            />
            <FormInput
              type="email"
              name="email"
              value={userData.email}
              handleChange={handleInputChange}
              disabled={isUpdatingUserPending}
            />
            {user?.userType === "employer" && (
              <FormInput name="company" value={user?.company} disabled={true} />
            )}
            <button className="btn btn-primary h-12" type="submit">
              {isUpdatingUserPending ? "Updating..." : "Update"}
            </button>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Profile;
