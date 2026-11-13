const Mission = (() => {
  // Rounded daily minima from NASA's InSight weather example, sols 675–680.
  const weather = [[675,-97],[676,-97],[677,-97],[678,-98],[679,-97],[680,-97]];
  const solar = [12,9,5,3,6,10];
  const initial = () => ({
    turn:0, battery:10, warmth:4, oxygen:4, water:7, food:4, dose:0,
    rover:0, samples:0, harvest:0, replies:[], result:null
  });

  function forecast(turn) {
    const [sol, low] = weather[turn];
    return { sol, low, solar:solar[turn], storm:turn === 2 || turn === 3,
      heating:low <= -98 ? 5 : 4 };
  }

  function plan(state, orders) {
    const next = forecast(state.turn);
    const rover = orders.rover === "recall" ? Math.max(0,state.rover-1)
      : orders.rover === "explore" && !orders.shelter ? Math.min(2,state.rover+1)
      : state.rover;
    const cost = Number(orders.heat)*next.heating + Number(orders.air)*3
      + Number(orders.grow)*3 + Number(orders.shelter)*2
      + Number(orders.radio)*2 + (rover === state.rover ? 0 : 2);
    return { ...next, rover, cost, available:state.battery+next.solar };
  }

  function advance(state, orders) {
    if (state.result) return { error:"Restart to run another mission." };
    const shift = plan(state, orders);
    if (shift.cost > shift.available) return { error:"Cut energy use before running this shift." };
    if (orders.air && state.water === 0) return { error:"Turn off the oxygen system. The water tank is empty." };
    const turn = state.turn + 1;
    const collected = shift.rover > state.samples;
    const next = {
      turn,
      battery:Math.min(14,shift.available-shift.cost),
      warmth:orders.heat ? Math.min(4,state.warmth+1) : Math.max(0,state.warmth-(shift.heating-3)),
      oxygen:orders.air ? Math.min(4,state.oxygen+1) : Math.max(0,state.oxygen-1),
      water:state.water-Number(orders.air),
      food:Math.max(0,Math.min(8,state.food+state.harvest-1)),
      dose:state.dose+(shift.storm ? orders.shelter ? 1 : 3 : 0),
      rover:shift.rover,
      samples:collected ? shift.rover : state.samples,
      harvest:orders.grow ? 2 : 0,
      replies:orders.radio ? [...state.replies,turn+2] : state.replies,
      result:null
    };
    const hazard = next.warmth === 0 ? "The habitat got too cold."
      : next.oxygen === 0 ? "The oxygen reserve ran out."
      : next.food === 0 ? "The food reserve ran out."
      : next.dose >= 5 ? "Crew exposure reached the exercise limit." : "";
    if (hazard) next.result = "Mission ended. " + hazard;
    else if (turn === weather.length) {
      next.result = next.samples === 2 && next.rover === 0
        ? "Mission complete! The crew is safe and both samples are home."
        : "Crew safe. The science goal needs two samples and a parked rover.";
    }
    const messages = [
      "Used " + shift.cost + " energy",
      "added " + state.harvest + " food from last shift",
      "exposure +" + (next.dose-state.dose)
    ];
    if (collected) messages.push("sample " + next.samples + " collected");
    if (orders.rover === "explore" && orders.shelter) messages.push("exploration paused for shelter");
    if (shift.rover < state.rover) messages.push(shift.rover === 0 ? "rover parked" : "rover returning");
    if (orders.radio) messages.push("report sent");
    if (next.replies.includes(turn)) messages.push("Earth reply received");
    return { state:next, message:messages.join(" · ") };
  }

  return { weather, initial, forecast, plan, advance };
})();
if (typeof module !== "undefined") module.exports = Mission;
