//========================== //
//========================== //

let citiesSelect = document.getElementById("cities-select");
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");
let month = document.getElementById("month");
let day = document.getElementById("day");

//========================== //

let cities = [
  {
    ar: "القاهرة",
    en: "EG-C",
  },
  {
    ar: "الدقهلية",
    en: "EG-DK",
  },
  {
    ar: "البحر الأحمر",
    en: "EG-BA",
  },
  {
    ar: "البحيرة",
    en: "EG-BH",
  },
  {
    ar: "الفيوم",
    en: "EG-FYM ",
  },
  {
    ar: "المنوفية",
    en: "EG-MNF",
  },
  {
    ar: "القليوبية",
    en: "EG-KB ",
  },
  {
    ar: "المنيا",
    en: "EG-MN",
  },
  {
    ar: "الجيزة",
    en: "EG-GZ ",
  },
  {
    ar: "الإسماعيلية",
    en: "EG-IS ",
  },
  {
    ar: "الإسكندرية",
    en: "EG-ALX",
  },
  {
    ar: "الغربية",
    en: "EG-GH ",
  },
  {
    ar: "الأقصر",
    en: "EG-LX ",
  },
  {
    ar: "الوادي الجديد",
    en: "EG-WAD",
  },
  {
    ar: "الشرقية",
    en: "EG-SHR",
  },
  {
    ar: "كفر الشيخ",
    en: "EG-KFS",
  },
  {
    ar: "مطروح",
    en: "EG-MT",
  },
  {
    ar: "جنوب سيناء",
    en: "EG-JS",
  },
];

//   "EG-SUZ": "السويس",
//   "EG-ASN": "أسوان",
//   "EG-AST": "أسيوط",
//   "EG-BNS": "بني سويف",
//   "EG-PTS": "بورسعيد",
//   "EG-DT": "دمياط",
//   "EG-KN": "قنا",
//   "EG-SIN": "شمال سيناء",
//   "EG-SHG": "سوهاج",
// ;

cities.map((city) => {
  let cityName = `
    <option>${city.ar}</option>
    `;
  document.getElementById("cities-select").innerHTML += cityName;
});
//========================== //
function getCity(cityName= "EG-C") {
  let url = "http://api.aladhan.com/v1/timingsByCity";
  let params = {
    country: "EG",
    city: cityName
  };

  axios
    .get(url, {
      params: params,
    })
    .then(function (response) {
      //   get prayers time
      let timings = response.data.data.timings;
      getPrayerTime("fajr", timings.Fajr);
      getPrayerTime("sunrise", timings.Sunrise);
      getPrayerTime("dhuhr", timings.Dhuhr);
      getPrayerTime("asr", timings.Asr);
      getPrayerTime("maghrib", timings.Maghrib);
      getPrayerTime("isha", timings.Isha);
      //
      // get gregorian date
      let gregorianDate = response.data.data.date.readable;
      date1.innerHTML = gregorianDate;
      //
      // // get hijri date
      let hijriDate = response.data.data.date.hijri.date;
      date2.innerHTML = hijriDate;
      //
      // get hijri arabic month name
      let hijriMonth = response.data.data.date.hijri.month.ar;
      month.innerHTML = hijriMonth;
      //
      // get arabic weekday name
      let weekday = response.data.data.date.hijri.weekday.ar;
      day.innerHTML = weekday;
    })
    .catch(function (error) {
      console.log(error);
    });
}
getCity();
//=========================
document.getElementById("cities-select").addEventListener("change", () => {
  document.getElementById("city-name").innerHTML =
    document.getElementById("cities-select").value;
  //
  let EnCityName = "";
  for (const city of cities) {
    if (city.ar == citiesSelect.value) {
      EnCityName = city.en;
    }
  }
  //
  getCity(EnCityName);
});
//===========  get all prayer time      =======
function getPrayerTime(id, time) {
  document.getElementById(id).innerHTML = time;
}


