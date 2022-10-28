import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { storeEmail } from "../utils/firestore";

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const submittingToastId = useRef(null);
  const inputRef = useRef(null);

  const submitEmail = async () => {
    if (submittingToastId.current !== null) {
      toast.dismiss(submittingToastId.current);
    }
    try {
      submittingToastId.current = toast.loading("Submitting...", {
        autoClose: false,
        onClose: () => (submittingToastId.current = null),
      });
      await storeEmail(email);
    } catch (error) {
      toast.update(submittingToastId.current, {
        render: error.message ?? "An unexpected error occurred.",
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 4000,
      });
      return;
    }
    toast.update(submittingToastId.current, {
      render: "You're signed up!",
      type: toast.TYPE.SUCCESS,
      isLoading: false,
      autoClose: 2500,
    });
  };

  return (
    <div className="email-form">
      <input
        ref={inputRef}
        type="email"
        placeholder="Subscribe by email"
        disabled={submittingToastId.current !== null}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        disabled={
          submittingToastId.current !== null ||
          !email.trim() ||
          (inputRef.current && !inputRef.current.checkValidity())
        }
        onClick={() => submitEmail()}
      >
        Subscribe
      </button>
    </div>
  );
};
