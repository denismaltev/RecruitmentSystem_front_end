import React from "react";

export default class RecruiterSkills extends React.Component {
  getSkillsFromAPI = async () => {
    var TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiIwMThhY2VhNS02YjNkLTQ0N2YtYmU4MS03Y2Q2OGI3YjBlODQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA2ZjA1NDA2LWU4ODUtNDc4ZC1iYmFjLTZjNTgyZmFmY2YwYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNTg3MTExOTE3LCJpc3MiOiJSZWNydWl0bWVudFN5c3RlbUFQSS5jYSIsImF1ZCI6IlJlY3J1aXRtZW50U3lzdGVtQVBJLmNhIn0.NiJDF1no4PPU0oueBHBTc_RzqVe_K1Cq3r1oNsc3u6I";
    var API_URL = "https://recruitmentsystemapi.azurewebsites.net/api/skills";
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      }
    });
    console.log(response);
  };

  async componentDidMount() {
    this.getSkillsFromAPI();
  }

  render() {
    return <h1> Recruiter Skills</h1>;
  }
}
