import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserContext";
import FormWraper from "../components/wrapers/forms/FormWraper";
import FormInput from "../components/inputs/FormInput";
import EyeButton from "../components/buttons/EyeButton";
import SolidButton from "../components/buttons/SolidButton";
import LoadingBlockWave from "../components/ui/LoadingBlockWave";
import ErrorModal from "../components/modals/ErrorModal";

function LoginView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addUser } = useUsers();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      if (users.length > 0) {
        navigate("/");
      }
    }
  }, [navigate]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("emptyField"))
      .min(3, t("errorNick"))
      .max(16, t("errorNick")),
    password: Yup.string()
      .required(t("emptyField"))
      .min(8, t("errorPassword"))
      .max(32, t("errorPassword")),
  });

  function togglePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          userName: values.username,
          userPassword: values.password,
        });

        const response = await fetch(
          `http://8ybg5l.realhost-free.net/User/Login/?${queryParams}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();

          if (data === false) {
            throw new Error("Login failed. Server returned false.");
          }

          addUser(values.username);
          localStorage.setItem("username", values.username);
          navigate("/");
        } else if (response.status === 500) {
          setIsModalOpen(true);
        } else {
          const errorText = await response.text();
          console.error("Error response from server:", errorText);
          throw new Error("Unexpected server response");
        }
      } catch (error) {
        console.error("There was a problem with the login request:", error);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {t("loginError")}
      </ErrorModal>
      <FormWraper>
        <form onSubmit={formik.handleSubmit} className="py-2">
          <div
            className="text-center text-2xl lg:text-3xl xxl:text-5xl pt-2 xxl:pt-0 pb-3 font-semibold
          text-chiper-chartreuse"
          >
            {t("login")}
          </div>
          <div className="w-full relative">
            <FormInput
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
            >
              {t("username")}
            </FormInput>
            <FormInput
              type={type}
              name="password"
              value={formik.values.password}
              id="password"
              onChange={formik.handleChange}
              error={formik.errors.password}
            >
              {t("password")}
            </FormInput>
            <div className="absolute right-0 bottom-[1.7rem]">
              <EyeButton
                onClick={togglePasswordVisible}
                isPasswordVisible={isPasswordVisible}
              />
            </div>
          </div>
          <div className="pt-4 w-full flex flex-col gap-6">
            <SolidButton type="submit" disabled={loading}>
              {loading ? <LoadingBlockWave /> : t("signIn")}
            </SolidButton>
            <SolidButton to="/register">{t("createProfile")}</SolidButton>
          </div>
        </form>
        <button
          type="button"
          className="text-center font-medium text-xl text-chiper-chartreuse 
          hover:bg-clip-text hover:bg-gradient-to-r from-gigabyte-green via-lottie-lavender 
        to-chiper-chartreuse hover:text-transparent transition-all ease-in-out duration-300"
        >
          {t("forgotPassword")}
        </button>
      </FormWraper>
    </>
  );
}

export default LoginView;
