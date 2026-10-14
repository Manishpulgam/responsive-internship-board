
"use strict";

const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "PixelCraft Labs",
    domain: "Web Development",
    location: "Remote",
    duration: "3 months",
    stipend: "₹10,000/month",
    description: "Build responsive web pages using HTML, CSS and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Insight Analytics",
    domain: "Data Science",
    location: "Hyderabad",
    duration: "6 months",
    stipend: "₹15,000/month",
    description: "Explore datasets and help create useful data visualizations.",
    skills: ["Python", "SQL", "Statistics"]
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "DesignNest",
    domain: "UI/UX Design",
    location: "Remote",
    duration: "3 months",
    stipend: "₹8,000/month",
    description: "Create user flows, wireframes and accessible interface designs.",
    skills: ["Figma", "Wireframes", "Prototyping"]
  },
  {
    id: 4,
    title: "Digital Marketing Intern",
    company: "GrowthHive",
    domain: "Digital Marketing",
    location: "Bengaluru",
    duration: "4 months",
    stipend: "₹10,000/month",
    description: "Support content campaigns and measure social media performance.",
    skills: ["SEO", "Content", "Analytics"]
  },
  {
    id: 5,
    title: "Cybersecurity Intern",
    company: "SecureStack",
    domain: "Cybersecurity",
    location: "Remote",
    duration: "6 months",
    stipend: "₹12,000/month",
    description: "Learn security fundamentals and assist with defensive security reviews.",
    skills: ["Networking", "Linux", "Security"]
  },
  {
    id: 6,
    title: "JavaScript Developer Intern",
    company: "CodeBridge",
    domain: "Web Development",
    location: "Hyderabad",
    duration: "3 months",
    stipend: "₹12,000/month",
    description: "Build interactive features and improve existing web applications.",
    skills: ["JavaScript", "DOM", "Git"]
  }
];

const list = document.querySelector("#internship-list");
const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const filterForm = document.querySelector("#filter-form");
const resetButton = document.querySelector("#reset");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");
const errorMessage = document.querySelector("#error-message");

function renderInternships(records) {
  list.replaceChildren();

  records.forEach((internship) => {
    const card = document.createElement("article");
    card.className = "internship-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const mark = document.createElement("div");
    mark.className = "company-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = internship.company.slice(0, 1);

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = internship.domain;

    top.append(mark, tag);

    const title = document.createElement("h4");
    title.textContent = internship.title;

    const company = document.createElement("p");
    company.className = "company-name";
    company.textContent = internship.company;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = internship.description;

    const details = document.createElement("div");
    details.className = "card-details";

    [internship.location, internship.duration, internship.stipend]
      .forEach((detail) => {
        const item = document.createElement("span");
        item.textContent = detail;
        details.append(item);
      });

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const applyLink = document.createElement("a");
    applyLink.href =
      "mailto:careers@example.com?subject=" +
      encodeURIComponent("Internship enquiry: " + internship.title);
    applyLink.textContent = "Enquire about role →";
    applyLink.setAttribute(
      "aria-label",
      "Enquire about " + internship.title + " at " + internship.company
    );

    actions.append(applyLink);
    card.append(top, title, company, description, details, actions);
    list.append(card);
  });
}

function filterInternships() {
  try {
    errorMessage.hidden = true;

    const keyword = searchInput.value.trim().toLowerCase();
    const selectedDomain = domainSelect.value;

    const filtered = internships.filter((internship) => {
      const searchableText = [
        internship.title,
        internship.company,
        internship.domain,
        internship.location,
        internship.description,
        ...internship.skills
      ].join(" ").toLowerCase();

      const matchesKeyword = searchableText.includes(keyword);
      const matchesDomain =
        selectedDomain === "all" ||
        internship.domain === selectedDomain;

      return matchesKeyword && matchesDomain;
    });

    renderInternships(filtered);

    resultCount.textContent =
      `${filtered.length} ${filtered.length === 1 ? "internship" : "internships"} found`;

    emptyMessage.hidden = filtered.length !== 0;
  } catch (error) {
    list.replaceChildren();
    emptyMessage.hidden = true;
    resultCount.textContent = "Unable to display internships.";
    errorMessage.textContent =
      "Something went wrong while loading the listings. Please try again.";
    errorMessage.hidden = false;
    console.error("Internship rendering error:", error);
  }
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterInternships();
});

searchInput.addEventListener("input", filterInternships);
domainSelect.addEventListener("change", filterInternships);

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  domainSelect.value = "all";
  filterInternships();
  searchInput.focus();
});

// Initial page render
filterInternships();
