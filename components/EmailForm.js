import React, { useState, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const submittingToastId = useRef(null);

  // TODO: style the form, validate the email, pop up nice alert on success or failure
  const submitEmail = async () => {
    if (submittingToastId.current !== null) {
      toast.dismiss(submittingToastId.current);
    }
    try {
      submittingToastId.current = toast.loading("Submitting...", {
        autoClose: false,
        onClose: () => (submittingToastId.current = null),
      });
      const { error } = await supabase.from("User").insert([{ email }]);
      if (error) {
        throw error;
      }
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
        type="text"
        placeholder="Sign up for new post notifications"
        disabled={submittingToastId.current !== null}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        disabled={submittingToastId.current !== null}
        onClick={() => submitEmail()}
      >
        Submit
      </button>
    </div>
  );
};
