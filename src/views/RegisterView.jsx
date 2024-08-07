import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWraper from "../components/wrapers/forms/FormWraper";
import FormInput from "../components/inputs/FormInput";
import EyeButton from "../components/buttons/EyeButton";
import SolidButton from "../components/buttons/SolidButton";
import LoadingBlockWave from "../components/ui/LoadingBlockWave";

function RegisterView() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required(t("emptyField"))
      .min(3, t("errorNick"))
      .max(16, t("errorNick")),
    email: Yup.string().email(t("invalidEmail")).required(t("emptyField")),
    password: Yup.string()
      .required(t("emptyField"))
      .min(8, t("errorPassword"))
      .max(32, t("errorPassword")),
    passwordConfirm: Yup.string()
      .required(t("emptyField"))
      .oneOf([Yup.ref("password")], t("errorPasswordConfirm")),
  });

  function togglePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  }

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      if (users.length > 0) {
        navigate("/");
      }
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("userName", values.username);
        formData.append("userEmail", values.email);
        formData.append("userPassword", values.password);

        const response = await fetch("/api/User/Registration", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response from server:", errorText);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data === false) {
          throw new Error("Registration failed. Server returned false.");
        }

        console.log(data);
        navigate("/login");
      } catch (error) {
        console.error(
          "There was a problem with the registration request:",
          error
        );
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <FormWraper>
      <form onSubmit={formik.handleSubmit} className="py-2">
        <div
          className="text-center text-2xl lg:text-3xl xxl:text-5xl pt-2 xxl:pt-0 pb-3 font-semibold
          text-chiper-chartreuse"
        >
          {t("register")}
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
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          >
            Email
          </FormInput>
          <div>
            <div className="absolute right-0 bottom-[5.7rem]">
              <EyeButton
                onClick={togglePasswordVisible}
                isPasswordVisible={isPasswordVisible}
              />
            </div>
          </div>
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
          <FormInput
            type={type}
            name="passwordConfirm"
            id="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={formik.errors.passwordConfirm}
          >
            {t("confirmPassword")}
          </FormInput>
        </div>
        <div className="pt-4 w-full flex flex-col gap-6">
          <SolidButton type="submit" disabled={loading}>
            {loading ? <LoadingBlockWave /> : t("createProfile")}
          </SolidButton>
          <SolidButton to="/login">{t("iHaveAProfile")}</SolidButton>
        </div>
      </form>
    </FormWraper>
  );
}

export default RegisterView;
