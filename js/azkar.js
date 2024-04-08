//
//
//
function getAzkarName() {
  axios
    .get("azkar.json")
    .then(function (response) {
      let azkar = response.data;
      console.log(azkar);
      // ===========  Surah content   =========
      azkar.map((zekr, index) => {
        let zekrName = `
                <option> ${index + 1}: ${zekr.category}</option>
                    `;
        document.getElementById("azkar-select").innerHTML += zekrName;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
getAzkarName();
// ========================================
// // ========== get surah number ============
function getZekrNumber(surahNumber = 0) {
  let url = `azkar.json`;
  axios
    .get(url)
    .then(function (response) {
      let zekrContent = response.data[surahNumber].array;
      console.log(zekrContent);
      //===========  Surah content   =========

      zekrContent.map((key, index) => {
        let zekr = `
      <div class="d-flex justify-content-center align-items-center mb-3">
        <span class="" id="number-of-ayah"> ${index + 1}</span>
        <span class="text-light fs-4 me-3 py-1 px-2 rounded-5" id="ayah-text">
         ${key.text}
        </span>
      </div>
     `;
        document.getElementById("zekr-container").innerHTML += zekr;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
getZekrNumber();
//==========================================================//
//===============  get selected surah name =================//
document.getElementById("azkar-select").addEventListener("change", () => {
  //rest surah content container
  document.getElementById("zekr-container").innerHTML = "";
  //add surah name to surah name container
  document.getElementById("zekr-name").innerHTML =
    document.getElementById("azkar-select").value;
  //
  let surahNumber = "";
  //fech all surahs and get target surah number
  let url_api = "azkar.json";
  axios
    .get(url_api)
    .then(function (response) {
      let zekr = response.data;
      console.log(zekr);
      // =========== get Surah number   =========
      for (let i = 0; i < zekr.length; i++) {
        // compare surah name from fetched surah with selected surah name

        if (
            zekr[i].category ==document.getElementById("azkar-select").value.slice(3)
        ) {
          surahNumber = i;
          getZekrNumber(surahNumber);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
