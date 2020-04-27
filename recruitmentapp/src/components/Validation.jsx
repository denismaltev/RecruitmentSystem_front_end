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

  // Start Block for validation company-job-details
  if (
    (state.hasOwnProperty("country") && state.country === "") ||
    typeof state.country === "undefined"
  ) {
    document.getElementById("country").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    (state.hasOwnProperty("province") && state.province === "") ||
    typeof state.province === "undefined"
  ) {
    document.getElementById("province").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    (state.hasOwnProperty("city") && state.city === "") ||
    typeof state.city === "undefined"
  ) {
    document.getElementById("city").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    (state.hasOwnProperty("title") && state.title === "") ||
    typeof state.title === "undefined"
  ) {
    document.getElementById("title").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    (state.hasOwnProperty("address") && state.address === "") ||
    typeof state.address === "undefined"
  ) {
    document.getElementById("address").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (
    (state.hasOwnProperty("description") && state.description === "") ||
    typeof state.description === "undefined"
  ) {
    document.getElementById("description").classList.add("is-invalid");
    return { blankfield: true };
  }
  // End Block for validation company-job-details

  return;
}
