# Atlas SkyBase

A junior astronaut mission trainer by **Atlas Junior**, a robotics team from Bangladesh. Built for the 2026 NASA Space Apps Challenge, **Build a Junior Astronaut Mission Trainer**.

## Play offline

Download and extract the project, then open `index.html` in a browser. No install, API key, network connection, or account is needed for the game. Use one screen as a team and assign commander, power engineer, life support engineer, and rover operator.

Survive six shifts with four astronauts, collect two samples, and park the rover at base. Review the forecast, allocate power, and run one shift at a time. The shift log records what changed.

## Run on GitHub Pages

Create a repository named `atlas-skybase` and upload the contents of this folder at its root. In **Settings → Pages**, choose **Deploy from a branch**, then select **main** and **/ (root)**. The site entry point is `index.html`.

To push the included source from a terminal after creating an empty GitHub repository:

```sh
git init -b main
git add .
git commit -m "Add Atlas SkyBase mission trainer"
git remote add origin https://github.com/YOUR-ACCOUNT/atlas-skybase.git
git push -u origin main
```

## Project files

- `index.html`, `style.css`, and `game.js` provide the classroom dashboard.
- `mission.js` contains the shift rules and offline temperature data.
- `assets/` contains the rover artwork supplied for the project.
- [Classroom and prototype guide](docs/classroom.md) describes play, model assumptions, and the proposed hardware link.

## Sources

The prototype uses rounded daily atmospheric temperature minima from sols 675–680 in the [NASA InSight weather example](https://api.nasa.gov/assets/insight/insight_mars_wind_rose.html). The archived data represent measurements at Elysium Planitia in October 2020. Local thermal effects can affect these readings. Solar generation, energy budgets, oxygen, food, shelter effects, and exposure points are simplified game quantities.

Further reading includes [NASA Open APIs](https://api.nasa.gov/), [DONKI](https://ccmc.gsfc.nasa.gov/tools/DONKI/), [OSDR](https://osdr.nasa.gov/bio/repo/), [RadLab](https://visualization.osdr.nasa.gov/radlab/gui/data-api/), [Mars Trek](https://trek.nasa.gov/mars/), and the [CSA space food toolkit](https://www.asc-csa.gc.ca/eng/youth-educators/toolkits/food-production/).

NASA does not endorse any non-U.S. Government entity and is not responsible for information contained on non-U.S. Government websites. For non-U.S. Government websites, participants must comply with any data use parameters of that specific website.
