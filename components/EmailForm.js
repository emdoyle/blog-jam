import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: style the form, validate the email, pop up nice alert on success or failure
  const submitEmail = async () => {
    try {
      setSubmitting(true);
      const { error } = await supabase.from("User").insert([{ email }]);
      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="email-form">
      <input
        type="text"
        placeholder="Sign up for new post notifications"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button onClick={() => submitEmail()}>Submit</button>
    </div>
  );
};
