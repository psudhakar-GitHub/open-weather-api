const btn = document.querySelector('button[type="submit"]');
const city = document.querySelector("#city").value;
const cards = document.querySelectorAll(".card");
const tbody = document.querySelector("tbody");
const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=<your token here>&cnt=40&units=metric`;

btn.addEventListener("click", () => {
  (async function () {
    let items = [];
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      items = data.list;
    } catch (e) {
      console.error(e);
    }

    tbody.innerHTML = "";
    let x = 0;
    
    for (const [key, item] of items.entries()) {
      if (key % 8 != 0) continue;

      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");

      td1.appendChild(document.createTextNode(new Date(item.dt_txt)));
      td2.appendChild(
        document.createTextNode(
          `${item.main.temp_min} / ${item.main.temp_max} deg C`
        )
      );

      const img = document.createElement("img");
      img.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
      td3.appendChild(img);

      td4.appendChild(
        document.createTextNode(
          item.weather[0].description.toString().toUpperCase()
        )
      );

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      tbody.appendChild(tr);

      // for big screen sizes
      
      cards[x].querySelector("#time").innerHTML = new Date(item.dt_txt);
      cards[x].querySelector("img").src = img.src;
      cards[x].querySelector(
        "#temp"
      ).innerHTML = `${item.main.temp_min} / ${item.main.temp_max} deg C`;
      cards[x].querySelector("#description").innerHTML =
        item.weather[0].description.toString().toUpperCase();
      x++;
    }
  })();
});
