import { loadImage, longShadow, roundRect, createGrid } from "$lib/utilities.js";

import background from "$lib/assets/weather-background.png";
import montserrat from "$lib/assets/Montserrat-SemiBold.woff2";
import linlibertine from "$lib/assets/LinLibertineCapitalsB.woff2";

import cloudy from "$lib/assets/weather/cloudy.png";
import partlyCloudy from "$lib/assets/weather/partly-cloudy.png";
import rain from "$lib/assets/weather/rain.png";
import snow from "$lib/assets/weather/snow.png";
import sunny from "$lib/assets/weather/sunny.png";
import thunder from "$lib/assets/weather/thunder.png";
import mostlyCloudy from "$lib/assets/weather/mostly-cloudy.png";
import mostlySunny from "$lib/assets/weather/mostly-sunny.png";
import showers from "$lib/assets/weather/showers.png";
import sunShowers from "$lib/assets/weather/sun-showers.png";
import lightShowers from "$lib/assets/weather/light-showers.png";

const WIDTH = 1920;
const HEIGHT = 1080;
const SHADOW_COLOR = "hsl(0, 0%, 12%)";

export async function load() {
  const assets = {};
  const promises = [
    new FontFace("Montserrat-SemiBold", `url("${montserrat}")`).load().then((font) => {
      document.fonts.add(font);
    }),
    new FontFace("LinLibertineCapitalsB", `url("${linlibertine}")`).load().then((font) => {
      document.fonts.add(font);
    }),
    loadImage(background).then((img) => {
      assets.background = img;
    }),
    loadImage(cloudy).then((img) => {
      assets.cloudy = img;
    }),
    loadImage(partlyCloudy).then((img) => {
      assets.partlyCloudy = img;
    }),
    loadImage(rain).then((img) => {
      assets.rain = img;
    }),
    loadImage(snow).then((img) => {
      assets.snow = img;
    }),
    loadImage(sunny).then((img) => {
      assets.sunny = img;
    }),
    loadImage(thunder).then((img) => {
      assets.thunder = img;
    }),
    loadImage(mostlyCloudy).then((img) => {
      assets.mostlyCloudy = img;
    }),
    loadImage(mostlySunny).then((img) => {
      assets.mostlySunny = img;
    }),
    loadImage(showers).then((img) => {
      assets.showers = img;
    }),
    loadImage(sunShowers).then((img) => {
      assets.sunShowers = img;
    }),
    loadImage(lightShowers).then((img) => {
      assets.lightShowers = img;
    }),
  ];
  await Promise.all(promises);
  return assets;
}

export function generate(canvas, assets, options) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Background image
  ctx.drawImage(assets.background, 0, 0, WIDTH, HEIGHT);

  console.log(options);

  // Title
  (() => {
    const reporter = options.reporterName || "Today";
    const possessive = reporter.slice(-1) === "s" ? "'" : "'s";
    const title = [`${reporter}${possessive}`, options.period, "Outlook"]
      .filter((item) => item !== "")
      .join(" ");

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = `${HEIGHT / 10}px "LinLibertineCapitalsB"`;
    longShadow(ctx, HEIGHT / 80, () => {
      ctx.fillStyle = SHADOW_COLOR;
      ctx.fillText(title, WIDTH * 0.5, HEIGHT * 0.075);
    });
    ctx.fillStyle = "white";
    ctx.fillText(title, WIDTH * 0.5, HEIGHT * 0.075);
  })();

  // Panels
  (() => {
    const temp = document.createElement("canvas");
    temp.width = WIDTH;
    temp.height = HEIGHT;
    temp.ctx = temp.getContext("2d");

    const rows = options.days > 5 ? 2 : 1;
    const cols = Math.min(5, options.days);
    // x1, y1, x2, y2, rows, cols, gap, margin
    const grid = createGrid(0, HEIGHT * 0.125, WIDTH, HEIGHT, rows, cols, HEIGHT / 48, HEIGHT / 48);

    // Draw background
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const rect = grid[i][j];
        const index = i * 5 + j;
        if (index >= options.days) break;

        longShadow(
          temp.ctx,
          HEIGHT / 100,
          () => {
            // Extrude color
            temp.ctx.fillStyle = SHADOW_COLOR;
            roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
          },
          false,
        );
        // Top color
        temp.ctx.fillStyle = "#c6292c";
        roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
      }
    }

    // Draw temp canvas to main canvas
    ctx.globalAlpha = 0.5;
    ctx.drawImage(temp, 0, 0);
    ctx.globalAlpha = 1;

    // Draw text and icons
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const rect = grid[i][j];
        const index = i * 5 + j;
        if (index >= options.days) break;

        const data = options[`day${index}`];

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[(index + options.startDay) % days.length];
        const temp = data.temperature + "°";
        const icon = assets[data.conditions];
        const iconSize = rows > 1 ? rect.h * 0.5 : Math.min(rect.w * 0.8, rect.h * 0.7);

        const X_CENTER = rect.x + rect.w / 2;
        const Y_CENTER = rect.y + rect.h / 2;

        if (data.relativeDay) {
          if (index === 0) {
            day = "Today";
          }
          if (index === 1) {
            day = "Tomorrow";
          }
        }

        // Day of the week
        ctx.textAlign = "center";
        ctx.font = `${Math.min(rect.w / 6, HEIGHT / 10)}px "Montserrat-SemiBold"`;
        ctx.textBaseline = "top";
        longShadow(ctx, HEIGHT / 100, () => {
          ctx.fillStyle = SHADOW_COLOR;
          ctx.fillText(day, X_CENTER, rect.y + rect.h * 0.04);
        });
        ctx.fillStyle = "white";
        ctx.fillText(day, X_CENTER, rect.y + rect.h * 0.04);

        // Temperature
        ctx.font = `${Math.min(rect.w / 3, HEIGHT / 5)}px "Montserrat-SemiBold"`;
        ctx.textBaseline = "bottom";
        longShadow(ctx, HEIGHT / 100, () => {
          ctx.fillStyle = SHADOW_COLOR;
          ctx.fillText(temp, X_CENTER, rect.y + rect.h - rect.h * 0.04);
        });
        ctx.fillStyle = "white";
        ctx.fillText(temp, X_CENTER, rect.y + rect.h - rect.h * 0.04);

        // Icon
        ctx.shadowColor = "rgba(0, 0, 10, 0.5)";
        ctx.shadowBlur = (HEIGHT / 100) * 4;
        ctx.shadowOffsetX = (HEIGHT / 100) * 0.8;
        ctx.shadowOffsetY = (HEIGHT / 100) * 0.8;
        ctx.drawImage(
          icon,
          X_CENTER - iconSize / 2,
          Y_CENTER - iconSize / 2 - rect.h * 0.06,
          iconSize,
          iconSize,
        );
        ctx.shadowColor = "transparent";
      }
    }
  })();

  return canvas;
}
