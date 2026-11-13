const byId = (id) => document.getElementById(id);
const form = byId("orders");
let state = Mission.initial();

function orders() {
  const values = new FormData(form);
  return {
    heat:values.get("heat") === "1", air:values.get("air") === "1",
    grow:values.get("grow") === "1", shelter:values.get("shelter") === "1",
    rover:values.get("rover"), radio:values.has("radio")
  };
}

function preview() {
  if (state.result) {
    byId("budget").textContent = "Restart to try another plan.";
    return;
  }
  const selected = orders();
  const plan = Mission.plan(state,selected);
  const warning = plan.cost > plan.available ? " · Over budget"
    : selected.air && !state.water ? " · No water for oxygen"
    : selected.shelter && selected.rover === "explore" ? " · Shelter pauses exploration" : "";
  byId("budget").textContent = plan.cost + " / " + plan.available
    + " energy · Heater costs " + plan.heating + warning;
}

function render() {
  const next = state.result ? null : Mission.forecast(state.turn);
  byId("status").textContent = state.result || (
    "Shift " + (state.turn+1) + " of 6 · Solar +" + next.solar + " energy · Archived low "
    + next.low + " °C · " + (next.storm ? "Radiation alert! Consider shelter." : "Radiation forecast clear.")
  );
  const resources = [
    ["Battery",state.battery,14],["Warmth",state.warmth,4],["Oxygen",state.oxygen,4],
    ["Water",state.water,7],["Food",state.food,8],["Exposure",state.dose,5],["Samples",state.samples,2]
  ];
  byId("meters").innerHTML = resources.map(([label,value,max]) =>
    '<div class="meter"><span>'+label+'</span><strong>'+value+'/'+max+'</strong>'
    +'<meter aria-label="'+label+'" max="'+max+'" value="'+value+'"></meter></div>'
  ).join("");
  const cells = ["Habitat","Solar","Shelter","Rock","Greenhouse",
    "Parking","Trail","Rock","Trail","Ridge","Trail","Sample A","Trail","Sample B","Trail"];
  const roverCell = [5,11,13][state.rover];
  byId("map").innerHTML = cells.map((label,index) => '<div class="tile '
    +(index === roverCell ? 'active' : label === "Rock" ? 'rock' : '')+'">'
    +label+(index === roverCell ? ' · Rover' : '')+'</div>').join("");
  const pending = state.replies.filter((reply) => reply > state.turn).length;
  byId("link").textContent = "Earth link · " + pending + " awaiting reply · "
    + (state.replies.length-pending) + " received";
  for (const control of form.elements) control.disabled = Boolean(state.result);
  preview();
}

form.addEventListener("change", preview);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const result = Mission.advance(state,orders());
  if (result.error) {
    byId("status").textContent = result.error;
    return;
  }
  state = result.state;
  const entry = document.createElement("li");
  entry.value = state.turn;
  entry.textContent = "Shift " + state.turn + " · " + result.message;
  byId("log").prepend(entry);
  render();
});
byId("reset").addEventListener("click", () => {
  state = Mission.initial();
  form.reset();
  byId("log").replaceChildren();
  render();
});
byId("weather").innerHTML = Mission.weather.map(([sol,low]) =>
  "<tr><th scope='row'>" + sol + "</th><td>" + low + "</td></tr>"
).join("");
render();
