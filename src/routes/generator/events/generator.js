import { loadImage, longShadow, roundRect, createGrid } from "$lib/utilities.js";

import background from "$lib/assets/events-background.png";
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
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = `700 ${(HEIGHT / 7.5)}px "LinLibertineCapitalsB"`;
        longShadow(ctx, HEIGHT / 80, () => {
            ctx.fillStyle = SHADOW_COLOR;
            ctx.fillText("Upcoming Events", WIDTH * 0.5, HEIGHT * 0.1);
        });
        ctx.fillStyle = "white";
        ctx.fillText("Upcoming Events", WIDTH * 0.5, HEIGHT * 0.1);
    })();

    // Panels
    (() => {
        const temp = document.createElement("canvas");
        temp.width = WIDTH;
        temp.height = HEIGHT;
        temp.ctx = temp.getContext("2d");

        const panels = Object.values(options).filter(panel => panel.enabled === true);
        // x1, y1, x2, y2, rows, cols, gap, margin
        const grid = createGrid(0, HEIGHT * 0.175, WIDTH, HEIGHT, panels.length, 1, HEIGHT / 64, HEIGHT / 36);

        // Loop over panels
        for (let i = 0; i < panels.length; i++) {
            const rect = grid[i][0];
            console.log(rect);
            longShadow(temp.ctx, HEIGHT / 100, () => {
                // Extrude color
                temp.ctx.fillStyle = "rgb(99, 10, 10)";
                roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill()
            }, false);
            // Top color
            temp.ctx.fillStyle = "rgb(116, 22, 22)";
            roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill()
        }

        // Draw temp canvas to main canvas
        ctx.globalAlpha = 0.5;
        ctx.drawImage(temp, 0, 0);
        ctx.globalAlpha = 1;
    })()

    return canvas;
}