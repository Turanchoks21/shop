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

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      // Здесь можно добавить логику отправки данных на сервер
    },
  });

  return (
    <FormWraper>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="text-2xl lg:text-3xl xxl:text-5xl pt-2 xxl:pt-0 pb-3 font-semibold
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
          <div>
            <FormInput
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            >
              Email
            </FormInput>
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
          <SolidButton type="submit">{t("createProfile")}</SolidButton>
          <SolidButton to="/login">{t("signUp")}</SolidButton>
        </div>
      </form>
    </FormWraper>
  );
}

export default RegisterView;
