export default function ValidationJob(event, state) {
  // clear all error messages
  const inputs = document.getElementsByClassName("is-invalid");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("is-invalid");
    }
  }

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

  // Validation of NumberOfLabourersNeeded
  const eachNumberOfLabourerIsValid = state.jobSkills.every(
    js => js.numberOfLabourersNeeded > 0
  );
  if (!eachNumberOfLabourerIsValid) {
    return { invalidNumberOfLabourersNeeded: true };
  }

  // Validation StartDate and End Date
  var numberOfDaysToWork = new Date(state.endDate) - new Date(state.startDate);
  var daysLeftUntilEndOfWork = new Date(state.endDate) - new Date();
  if (numberOfDaysToWork < 0 || daysLeftUntilEndOfWork < 0) {
    document.getElementById("endDate").classList.add("is-invalid");
    document.getElementById("startDate").classList.add("is-invalid");
    return { invalidDate: true };
  }

  return;
}
