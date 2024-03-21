import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@context/appContext";
import { useRegister } from "@services/auth/mutations";
import { setFileToBase } from "@utils";
import { Container, FormInput } from "@components";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const { user } = useAppContext();
  const [isEmployer, setIsEmployer] = useState(false);
  const { mutate: register, isPending, isError, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(formRef.current);
    const formData = {};

    for (let [key, value] of form.entries()) {
      if (key === "companyLogo" || key === "userPicture") {
        if (value.name !== "") {
          formData[key] = await setFileToBase(value);
        }
      } else {
        formData[key] = value;
      }
    }

    register(formData);
  };

  if (isError) {
    toast.error(
      error.response.data.message === 'request entity too large' ? 'Only upload small image/don\'t need to upload image' : error.response.data.message || error.response.data || error.message,
    );
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <main>
      <section className="bg-hero-purpies bg-cover bg-center bg-no-repeat">
        <Container className="flex min-h-[240px] flex-col items-center justify-center pt-12 md:pt-7">
          <h1 className="text-white">
            Register For {isEmployer ? "Employer" : "Job Seeker"}
          </h1>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1 text-center text-lg text-neutral-200 lg:mt-4 lg:text-xl">
            {isEmployer ? (
              <>
                <p>Not an employer?</p>
                <button
                  type="button"
                  className="underline hover:text-white hover:no-underline"
                  onClick={() => setIsEmployer(false)}
                >
                  Register as a job seeker
                </button>
              </>
            ) : (
              <>
                <p>Not a job seeker?</p>
                <button
                  type="button"
                  className="underline hover:text-white hover:no-underline"
                  onClick={() => setIsEmployer(true)}
                >
                  Register as an employer
                </button>
              </>
            )}
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <form
            className="mx-auto grid max-w-md gap-6 md:max-w-2xl"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="mx-auto grid w-full gap-5  md:grid-cols-2 md:gap-x-8">
              <FormInput
                label="first name"
                name="firstName"
                placeholder="Pierle"
                required
              />
              <FormInput
                label="last name"
                name="lastName"
                placeholder="Dev"
                disabled={isPending}
                required
              />
              {isEmployer && (
                <FormInput
                  name="company"
                  placeholder="Hiring Fast"
                  disabled={isPending}
                  required
                />
              )}
              <FormInput
                name="email"
                placeholder="pierledev@gmail.com"
                disabled={isPending}
                required
              />
              {isEmployer ? (
                <FormInput
                  type="file"
                  name="companyLogo"
                  label="company logo"
                  accept="image/*"
                  disabled={isPending}
                />
              ) : (
                <FormInput
                  type="file"
                  name="userPicture"
                  label="user picture"
                  accept="image/*"
                  disabled={isPending}
                />
              )}
              <FormInput
                type="password"
                name="password"
                placeholder="•••••••••••"
                disabled={isPending}
                required
              />
              <FormInput
                type="password"
                name="confirmPassword"
                label="confirm password"
                placeholder="•••••••••••"
                disabled={isPending}
                required
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary h-12 w-auto justify-self-start text-lg ${isPending ? "cursor-not-allowed" : ""}`}
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Register;
