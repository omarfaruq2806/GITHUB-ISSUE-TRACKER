// all card container
const cardContainer = document.getElementById("cardContainer");
const openCards = document.getElementById("openIssues");
const closedCards = document.getElementById("closedIssues");

const issueCount = document.getElementById("issueCount");

let currentTab = "all";

const tabActive = ["bg-blue-500", "text-white"];
const tabInactive = ["bg-white", "text-black", "border", "border-gray-300"];

// searchBar
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput");
  const searchValue = searchInput.value.trim().toLowerCase();
  console.log(searchValue);

  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  )
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) => {
        return word.title.toLowerCase().includes(searchValue);
      });
      cardContainer.innerHTML = "";
      filterWords.forEach((data) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div
          class="p-4 space-y-4 rounded-xl border-t-4 ${data.status == "open" ? "border-green-500" : "border-purple-500"} bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <img src="${data.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="status icon" class="w-7 h-7" />
            <h2 class="btn btn-soft rounded-3xl btn-outline ${data.priority == "high" ? "btn-error" : data.priority == "medium" ? "btn-warning" : "btn-soft"}">${data.priority}</h2>
          </div>
          <div class="space-y-1">
            <h1 class="font-bold text-xl">
              ${data.title}
            </h1>
            <p class="text-gray-500">
              ${data.description}
            </p>
          </div>
          <div class="pb-4 border-b border-gray-300">
            ${createLabels(data.labels)}
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">${data.author}</p>
            <p class="text-gray-500">${data.createdAt}</p>
          </div>
        </div>
        `;
        cardContainer.appendChild(card);
      });
    });
});

// tab switch
function tabSwitch(tab) {
  const tabs = ["all", "open", "closed"];
  currentTab = tab;

  for (let t of tabs) {
    let tabName = document.getElementById("tab-" + t);
    if (t === tab) {
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
    }
  }

  const allIssues = [cardContainer, openCards, closedCards];
  for (let issue of allIssues) {
    issue.classList.add("hidden");
  }

  if (tab === "all") {
    cardContainer.classList.remove("hidden");
  } else if (tab === "open") {
    openCards.classList.remove("hidden");
  } else if (tab === "closed") {
    closedCards.classList.remove("hidden");
  }
  updateCounts();
}
tabSwitch(currentTab);

const createLabels = (arr) => {
  const labels = arr.map(
    (el) =>
      `<span class="btn btn-soft rounded-3xl btn-outline btn-warning">${el}</span>`,
  );
  return labels.join(" ");
};

// fetch for all cards (open and closed)
showSpinner(true);
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => {
    data.data.forEach((data) => {
      const card = document.createElement("div");

      card.innerHTML = `
        <div
          class="p-4 space-y-4 rounded-xl border-t-4 ${data.status == "open" ? "border-green-500" : "border-purple-500"} bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <img src="${data.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="status icon" class="w-7 h-7" />
            <h2 class="btn btn-soft rounded-3xl btn-outline ${data.priority == "high" ? "btn-error" : data.priority == "medium" ? "btn-warning" : "btn-soft"}">${data.priority}</h2>
          </div>
          <div class="space-y-1">
            <h1 class="font-bold text-xl">
              ${data.title}
            </h1>
            <p class="text-gray-500">
              ${data.description}
            </p>
          </div>
          <div class="pb-4 border-b border-gray-300">
            ${createLabels(data.labels)}
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">${data.author}</p>
            <p class="text-gray-500">${data.createdAt}</p>
          </div>
        </div>
        `;
      cardContainer.appendChild(card);
      updateCounts();
    });
    showSpinner(false);
  });

// fetch for only open cards
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then((res) =>
  res.json().then((data) => {
    data.data
      .filter((data) => data.status === "open")
      .forEach((data) => {
        const card = document.createElement("div");

        card.innerHTML = `
        <div
          class="p-4 space-y-4 rounded-xl border-t-4 ${data.status == "open" ? "border-green-500" : "border-purple-500"} bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <img src="${data.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="status icon" class="w-7 h-7" />
            <h2 class="btn btn-soft rounded-3xl btn-outline ${data.priority == "high" ? "btn-error" : data.priority == "medium" ? "btn-warning" : "btn-soft"}">${data.priority}</h2>
          </div>
          <div class="space-y-1">
            <h1 class="font-bold text-xl">
              ${data.title}
            </h1>
            <p class="text-gray-500">
              ${data.description}
            </p>
          </div>
          <div class="pb-4 border-b border-gray-300">
            ${createLabels(data.labels)}
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">${data.author}</p>
            <p class="text-gray-500">${data.createdAt}</p>
          </div>
        </div>
        `;
        openCards.appendChild(card);
      });
    updateCounts();
  }),
);

// fetch for only closed cards
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then((res) =>
  res.json().then((data) => {
    // console.log(data.data);
    data.data
      .filter((data) => data.status === "closed")
      .forEach((data) => {
        const card = document.createElement("div");

        card.innerHTML = `
        <div
          class="p-4 space-y-4 rounded-xl border-t-4 ${data.status == "open" ? "border-green-500" : "border-purple-500"} bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <img src="${data.status == "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="status icon" class="w-7 h-7" />
            <h2 class="btn btn-soft rounded-3xl btn-outline ${data.priority == "high" ? "btn-error" : data.priority == "medium" ? "btn-warning" : "btn-soft"}">${data.priority}</h2>
          </div>
          <div class="space-y-1">
            <h1 class="font-bold text-xl">
              ${data.title}
            </h1>
            <p class="text-gray-500">
              ${data.description}
            </p>
          </div>
          <div class="pb-4 border-b border-gray-300">
            ${createLabels(data.labels)}
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">${data.author}</p>
            <p class="text-gray-500">${data.createdAt}</p>
          </div>
        </div>
        `;
        closedCards.appendChild(card);
      });
    updateCounts();
  }),
);

// display details with a modal
function showDetails(data) {}

// spinner loading
function showSpinner(boolean) {
  const spinner = document.getElementById("spinner");
  if (boolean) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}
// count update
function updateCounts() {
  const counts = {
    all: cardContainer.children.length,
    open: openCards.children.length,
    closed: closedCards.children.length,
  };

  if (currentTab == "all") {
    issueCount.innerText = counts.all;
  } else if (currentTab == "open") {
    issueCount.innerText = counts.open;
  } else if (currentTab == "closed") {
    issueCount.innerText = counts.closed;
  }
}
