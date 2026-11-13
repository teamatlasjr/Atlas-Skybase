# Classroom and prototype guide

## Run a mission

Give the team five minutes to read the briefing and assign roles. Ask each role to propose one action before the commander runs a shift. After the final shift, compare the team's original plan with what happened.

- What was the first reserve the team relied on?
- When was it worth growing food before the crew needed it?
- What was the cost of using shelter?
- Which decision would you change on a second run?

## Model

Every shift consumes one food. Greenhouse lighting costs three energy and produces two food for the following shift. Oxygen production costs three energy and one water. Without production, the crew spends one oxygen. Heating costs four energy, or five on the coldest archived shift. Switching it off spends one or two warmth respectively. Solar energy is available immediately and up to fourteen unused energy carries forward.

The scripted radiation alert covers shifts three and four. Shelter costs two energy per shift and changes the exposure gain from three points to one. Five cumulative points ends the exercise. Exposure points have no physical dose conversion. Shelter pauses sample collection while permitting a return to base. The rover follows a fixed route through two waypoints, and each movement costs two energy. Sending Earth a status report costs two energy. Replies arrive after two completed shifts, a compressed classroom representation of communications delay.

## Proposed physical prototype

The shipped game uses an on-screen rover. For a later classroom build, connect an ESP32 to a laptop over USB and let the laptop own mission state. A proposed serial message is one JSON object per line with the completed shift, rover waypoint, greenhouse light setting, and shelter state. Start with LEDs to verify that state changes arrive correctly. Add a rover only after testing the route and parking in the model. Keep a physical stop available, and stop motion when the link drops. Firmware, physical obstacle avoidance, and classroom trials remain future work.

## Facilitator walkthrough

Run the heater and oxygen on shift 1 with greenhouse lights and rover exploration. Keep the heater and oxygen on for shift 2 and explore again. During both alert shifts, enter shelter and recall the rover. Turn the heater off on shifts 3 and 4 to use stored warmth. Keep oxygen on for shift 3. On shift 4, use oxygen reserves and light the greenhouse. Then leave shelter, restore heat, keep oxygen off, and light the greenhouse on shift 5. Restore oxygen on shift 6. Keep the rover parked through shift 6.


