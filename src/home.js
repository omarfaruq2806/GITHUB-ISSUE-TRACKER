/* 
 <div class="p-4 space-y-4 border-t-4 rounded-xl border-green-500 bg-white shadow-sm">
          <div class="flex justify-between items-center">
            <img src="./assets/Open-Status.png" alt="" class="w-7 h-7" />
            <h2 class="btn btn-soft btn-error rounded-3xl btn-outline">HIGH</h2>
          </div>
          <div class="space-y-1">
            <h1 class="font-bold text-xl">Fix navigation menu on mobile devices</h1>
            <p class="text-gray-500">
              The navigation menu doesn't collapse properly on mobile devices...
            </p>
          </div>
          <div class="pb-4 border-b border-gray-300"> <!--  -->
            <p class="btn btn-soft btn-error rounded-3xl btn-outline">BUG</p>
            <p class="btn btn-soft btn-warning rounded-3xl btn-outline">
              HELP WANTED
            </p>
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">#1 by john_doe</p>
            <p class="text-gray-500">1/15/2024</p>
          </div>
        </div>
*/

// ------------------------------------------------------------------------------------------------

// all card container
const cardContainer = document.getElementById("cardContainer");

const issueCount = document.getElementById("issueCount");

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.data.forEach((data) => {
      const card = document.createElement("div");

      card.innerHTML = `
        <div
          class="p-4 space-y-4 rounded-xl border-t-4 ${data.status == "open" ? "border-green-500" : "border-purple-500"} bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <img src="${data.status == 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="status icon" class="w-7 h-7" />
            <h2 class="btn btn-soft btn-error rounded-3xl btn-outline">${data.priority}</h2>
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
            <!--  -->
            <p class="btn btn-soft btn-error rounded-3xl btn-outline">BUG</p>
            <p class="btn btn-soft btn-warning rounded-3xl btn-outline">
              HELP WANTED
            </p>
          </div>
          <div class="px-4 grid gap-1">
            <p class="text-gray-500">${data.author}</p>
            <p class="text-gray-500">${data.createdAt}</p>
          </div>
        </div>
        `;
      cardContainer.appendChild(card);
    });
    updateCount()
  });

// count update
function updateCount() {
  issueCount.innerText = cardContainer.children.length;
  console.log("hello from count");
}
updateCount();
