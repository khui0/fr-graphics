import { loadImage, longShadow, roundRect, createGrid } from "$lib/utilities.js";

import background from "$lib/assets/weather-background.png";
import montserrat from "$lib/assets/Montserrat-SemiBold.woff2";
import linlibertine from "$lib/assets/LinLibertineCapitalsB.woff2";

const WIDTH = 1920;
const HEIGHT = 1080;
const SHADOW_COLOR = "hsl(0, 0%, 12%)";

export async function load() {
    const assets = {};
    const promises = [
        new FontFace("Montserrat-SemiBold", `url("${montserrat}")`).load().then(font => {
            document.fonts.add(font);
        }),
        new FontFace("LinLibertineCapitalsB", `url("${linlibertine}")`).load().then(font => {
            document.fonts.add(font);
        }),
        loadImage(background).then(img => {
            assets.background = img;
        }),
    ]
    await Promise.all(promises);
    return assets;
}

export function generate(canvas, assets, options) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Background image
    ctx.drawImage(assets.background, 0, 0, WIDTH, HEIGHT);

    // Title
    (() => {
        const reporter = options.reporterName || "Today";
        const possessive = reporter.slice(-1) === "s" ? "'" : "'s";
        const title = [
            `${reporter}${possessive}`,
            options.period,
            "Outlook",
        ].filter(item => item !== "").join(" ");

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = `${(HEIGHT / 10)}px "LinLibertineCapitalsB"`;
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

        // x1, y1, x2, y2, rows, cols, gap, margin
        const grid = createGrid(0, HEIGHT * 0.125, WIDTH, HEIGHT, 1, 3, HEIGHT / 48, HEIGHT / 48);

        // Draw background
        for (let i = 0; i < grid[0].length; i++) {
            const rect = grid[0][i];
            longShadow(temp.ctx, HEIGHT / 100, () => {
                // Extrude color
                temp.ctx.fillStyle = "#2c587f";
                roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
            }, false);
            // Top color
            temp.ctx.fillStyle = "#ffffff";
            roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
        }

        // Draw temp canvas to main canvas
        ctx.globalAlpha = 0.5;
        ctx.drawImage(temp, 0, 0);
        ctx.globalAlpha = 1;
    })();

    return canvas;
}