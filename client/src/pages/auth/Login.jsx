import { useEffect, useState } from "react";
import { useAppContext } from "@context//appContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@services/auth/mutations";
import { Container, FormInput } from "@components";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { user } = useAppContext();
  const { mutate: login, isPending, isError, error } = useLogin();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleUserData = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.email && !userData.password) return;

    login(userData);
  };

  if (isError) {
    toast.error(
      error.response.data.message || error.response.data || error.message,
    );
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <main>
      <section className="bg-hero-purpies bg-cover bg-center bg-no-repeat">
        <Container className="grid min-h-[180px] place-items-center gap-6 pt-7">
          <h1 className="text-white">Login</h1>
        </Container>
      </section>
      <section>
        <Container>
          <form
            className="mx-auto grid w-full max-w-md gap-5"
            onSubmit={handleSubmit}
          >
            <FormInput
              name="email"
              value={userData.email}
              handleChange={handleUserData}
              placeholder="pierledev@gmail.com"
              disabled={isPending}
              required
            />
            <FormInput
              type="password"
              name="password"
              value={userData.password}
              handleChange={handleUserData}
              placeholder="•••••••••••"
              disabled={isPending}
              required
            />
            <button
              type="submit"
              className={`btn btn-primary h-12 w-full text-lg ${isPending ? "cursor-not-allowed" : ""}`}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Container>
      </section>
    </main>
  );
};

export default Login;
