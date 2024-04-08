// =============================================================================
// =========================     صفحة اسماء الله الحسني   =========================
// =============================================================================
let namesContainer = document.getElementById("names-container");
axios
  .get("http://api.aladhan.com/v1/asmaAlHusna")
  .then(function (response) {
    let names = response.data.data;
    console.log(names);
    names.map((name) => {
      let content = `
            <div class="col-4 col-md-3 col-lg-2 py-2">
              <div class="box">
                <div class="card-body text-center position-relative">
                  <h3 class="card-name fw-bold">${name.name}</h3>
                  <p class="card-number position-absolute fw-bold">${name.number}</p>
                </div>
              </div>
            </div>
      `;
      namesContainer.innerHTML += content;
    });
  })
  .catch((err) => console.log(err));
