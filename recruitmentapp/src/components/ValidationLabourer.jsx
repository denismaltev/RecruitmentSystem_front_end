export default function validateForm(event, state) {
  // clear all error messages
  const inputs = document.getElementsByClassName("is-invalid");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("is-invalid");
    }
  }
  if (state.hasOwnProperty("firstName") && state.firstName === "") {
    document.getElementById("firstName").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("email") && !state.email.includes("@")) {
    document.getElementById("email").classList.add("is-invalid");
    return { invalidEmail: true };
  }
  if (state.hasOwnProperty("lastName") && state.lastName === "") {
    document.getElementById("lastName").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("country") && state.country === "") {
    document.getElementById("country").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("province") && state.province === "") {
    document.getElementById("province").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("city") && state.city === "") {
    document.getElementById("city").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("phone") && state.phone === "") {
    document.getElementById("phone").classList.add("is-invalid");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("personalId") && state.personalId === "") {
    document.getElementById("personalId").classList.add("is-invalid");
    return { blankfield: true };
  }

  return;
}
