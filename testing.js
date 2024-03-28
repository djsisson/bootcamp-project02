class clickme {
  static #counter = 0;
  static #countlistener = [];
  static #eventcounter = 0;
  static get count() {
    return this.#counter;
  }
  static increaseby(val) {
    this.#counter += parseInt(val);
    // clickme.#listeners();
    document.querySelectorAll("[listenforchange='true']").forEach((item) => {
      item.dispatchEvent(
        new CustomEvent("madechange", {
          detail: {
            val: this.#counter,
          },
        })
      );
    });
  }
  static #listeners() {
    this.#countlistener.forEach((obj) => {
      obj.callback(this.#counter);
    });
  }
  static removeChangeListener(id) {
    let i = this.#countlistener.findIndex((x) => x.id == id);
    this.#countlistener.splice(i, 1);
  }

  static addChangeListener(listener) {
    let obj = {
      id: clickme.#eventcounter,
      callback: listener,
    };
    clickme.#eventcounter++;
    this.#countlistener.push(obj);
    return obj.id;
  }

  constructor() {
    clickme.#eventcounter = 0;
    clickme.#counter = 0;
    clickme.#listeners();
    clickme.#countlistener = [];
  }
}

setInterval(() => {
  clickme.increaseby(1);
}, 1000);

function reset() {
  const labels = document.querySelector(".labels");
  const newdivs = [];
  for (let i = 0; i < 5; i++) {
    const newdiv = document.createElement("div");
    newdiv.classList.add("total");
    newdivs.push(newdiv);
  }
  labels.replaceChildren(...newdivs);
  document.querySelectorAll(".total").forEach((item) => {
    let id = clickme.addChangeListener(function (val) {
      item.innerHTML = val;
    });
    item.setAttribute("changeid", id);
    item.setAttribute("listenforchange", true);
    item.addEventListener("madechange", (event) => {
      item.innerHTML = "new " + event.detail.val;
    });
  });
}

let mainclicker = new clickme();
reset();

document.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.textContent == "Reset") {
      mainclicker = new clickme();
      reset();
    } else if (item.textContent == "Add") {
      const labels = document.querySelector(".labels");
      const newdiv = document.createElement("div");
      newdiv.classList.add("total");
      let id = clickme.addChangeListener(function (val) {
        newdiv.innerHTML = val;
      });
      newdiv.setAttribute("listenforchange", true);
      newdiv.addEventListener("madechange", (event) => {
        newdiv.innerHTML = "new " + event.detail.val;
        console.log(event.detail.val);
      });
      newdiv.setAttribute("changeid", id);
      labels.append(newdiv);
    } else if (item.textContent == "Delete") {
      const labels = document.querySelector(".total:last-child");
      clickme.removeChangeListener(labels.getAttribute("changeid"));
      labels.remove();
    } else {
      clickme.increaseby(item.textContent);
    }
  });
});
