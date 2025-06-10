"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import "./AuthCard.scss";
import { FloatLabel } from "primereact/floatlabel";
import { useRegister } from "@/hooks/useRegister";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthCard() {
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [buttonState, setButtonState] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [serverError, setServerError] = useState(null)
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const validateForm = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emailError = !email || !emailValid;
    const passwordError = !password;

    setFormErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleSubmit = () => {
    setServerError(null)
    if (mode === "login") {
      if (!validateForm()) return;
      loginMutation.mutate(
        { email, password },
        {
          onSuccess: (data: any) => {
            queryClient.removeQueries({
              queryKey: [
                "user"
              ]
            })
            router.push("/dashboard")
          },
          onError: (error: any) => {
            setServerError(error.message)
            setTimeout(() => setButtonState("idle"), 2000);
          },
        }
      );
    } else {
      if (!validateForm()) return;
      registerMutation.mutate(
        { name, email, password },
        {
          onSuccess: (data: any) => {
            console.log(data);
            setName("");
            setEmail("");
            setPassword("");
            setButtonState("success");
            setTimeout(() => setButtonState("idle"), 2000);
            router.push("/dashboard")
          },
          onError: (error: any) => {
            setServerError(error.message)
            setButtonState("error");
            setTimeout(() => setButtonState("idle"), 2000);
          },
        }
      );
    }
  };

  return (
    <div className="authWrapper">
      <div className="header">
        <i className="pi pi-book" style={{ fontSize: "2rem" }}></i>
        <h2>Hello Nexa Quanta!</h2>
        {mode === "login" && <p>Enter your credentials to login</p>}
        {mode === "register" && (
          <p>Enter the details to register your account</p>
        )}
      </div>

      <div className="form">
        {mode === "register" && (
          <FloatLabel>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>
        )}
        <FloatLabel>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="off"
            invalid={formErrors.email}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        {formErrors.email && (
          <small className="p-error">Enter a valid email</small>
        )}

        <FloatLabel>
          <Password
            id="password"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            inputClassName="input"
            toggleMask
            feedback={false}
            invalid={formErrors.password}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        {formErrors.password && (
          <small className="p-error">Password is required</small>
        )}
        {serverError && (
          <small className="p-error">{serverError}</small>
        )}

        {mode === "login" && (
          <div className="actions">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember"> Remember Me</label>
            </div>
            <a href="#">Recovery Password</a>
          </div>
        )}
        <Button
          onClick={handleSubmit}
          loading={registerMutation.isPending}
          icon={
            buttonState === "success"
              ? "pi pi-check"
              : buttonState === "error"
                ? "pi pi-times"
                : undefined
          }
          label={
            buttonState === "success"
              ? "success"
              : buttonState === "error"
                ? "Failed"
                : mode === "login"
                  ? "Login"
                  : "Register"
          }
          className={`primaryBtn ${buttonState === "success"
            ? "btn-success"
            : buttonState === "error"
              ? "btn-error"
              : ""
            }`}
        />
        {mode === "login" && (
          <Button
            label="Sign in with Google"
            icon="pi pi-google"
            className="googleBtn"
          />
        )}
        <div className="footer">
          <span>
            {mode === "login"
              ? "Don't have an account yet?"
              : "Already have an account?"}
          </span>
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
