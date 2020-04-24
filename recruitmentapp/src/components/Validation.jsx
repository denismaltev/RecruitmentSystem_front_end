export default function validateForm(event, state) {
  // clear all error messages
  const inputs = document.getElementsByClassName("is-invalid");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("is-invalid");
    }
  }
  if (state.hasOwnProperty("username") && state.username === "") {
    document.getElementById("username").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("password") && state.password === "") {
    document.getElementById("password").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("confirmPassword") && state.confirmpassword === "") {
    document.getElementById("confirmpassword").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    state.hasOwnProperty("password") &&
    state.hasOwnProperty("confirmpassword") &&
    state.password !== state.confirmpassword
  ) {
    document.getElementById("password").classList.add("is-invalid");
    document.getElementById("confirmpassword").classList.add("is-invalid");
    return { matchedpassword: true, blankfield: false };
  }
  return;
}
