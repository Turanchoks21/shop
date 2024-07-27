import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FormWraper from "../components/wrapers/forms/FormWraper";
import FormInput from "../components/inputs/FormInput";
import EyeButton from "../components/buttons/EyeButton";
import SolidButton from "../components/buttons/SolidButton";

function RegisterView() {
  const { t } = useTranslation();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [type, setType] = useState("password");

  const RegisterSchema = Yup.object().shape({
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
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
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
          <SolidButton type="submit">{t("signIn")}</SolidButton>
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
  );
}

export default RegisterView;
