function loadResearch(){
  const researchElement = document.querySelector(".research-items");
  gameobjects.research.forEach((item) => {
    const newResearch = document.createElement("div");
    newResearch.setAttribute("researchitem",item.name);
    newResearch.setAttribute("state","hidden");
    newResearch.textContent = item.name;
    newResearch.addEventListener("click",() => {
      gamestate.researched.push(item.name);
      updateResearch();
    })
    researchElement.appendChild(newResearch);
  });
  updateResearch();
}

