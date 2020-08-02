async function initializeParis() {
    if (window.localStorage.getItem("paris+") == null) {
      return [];
    } else {
      return JSON.parse(window.sessionStorage.getItem("paris+"));
    }
  }
  
  initializeParis().then((paris) => {
    console.log(paris);
  
    document.querySelector("button").onclick = () => {
      console.log(paris);
      paris.push({ equipe: 2 });
      window.sessionStorage.setItem("paris+", JSON.stringify(paris));
    };
  });