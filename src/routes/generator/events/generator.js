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
        ctx.font = `${(HEIGHT / 10)}px "LinLibertineCapitalsB"`;
        longShadow(ctx, HEIGHT / 80, () => {
            ctx.fillStyle = SHADOW_COLOR;
            ctx.fillText("Upcoming Events", WIDTH * 0.5, HEIGHT * 0.075);
        });
        ctx.fillStyle = "white";
        ctx.fillText("Upcoming Events", WIDTH * 0.5, HEIGHT * 0.075);
    })();

    // Panels
    (() => {
        const temp = document.createElement("canvas");
        temp.width = WIDTH;
        temp.height = HEIGHT;
        temp.ctx = temp.getContext("2d");

        const panels = Object.values(options).filter(panel => panel.enabled === true);
        // x1, y1, x2, y2, rows, cols, gap, margin
        const grid = createGrid(0, HEIGHT * 0.125, WIDTH, HEIGHT, panels.length, 1, HEIGHT / 48, HEIGHT / 48);

        // Draw background
        for (let i = 0; i < panels.length; i++) {
            const rect = grid[i][0];
            longShadow(temp.ctx, HEIGHT / 100, () => {
                // Extrude color
                temp.ctx.fillStyle = SHADOW_COLOR;
                roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
            }, false);
            // Top color
            temp.ctx.fillStyle = "rgb(116, 22, 22)";
            roundRect(temp.ctx, rect.x, rect.y, rect.w, rect.h, HEIGHT / 48).fill();
        }

        // Draw temp canvas to main canvas
        ctx.globalAlpha = 0.5;
        ctx.drawImage(temp, 0, 0);
        ctx.globalAlpha = 1;

        // Draw text

        for (let i = 0; i < panels.length; i++) {
            const panel = panels[i];
            const rect = grid[i][0];
            const X_MARGIN = HEIGHT / 36;
            const Y_CENTER = rect.y + rect.h / 2;

            // Details 1
            ctx.textAlign = "left";
            ctx.font = `${(HEIGHT / 18)}px "Montserrat-SemiBold"`;
            longShadow(ctx, HEIGHT / 100, () => {
                ctx.fillStyle = SHADOW_COLOR;
                ctx.fillText(panel.details1 || "", rect.x + X_MARGIN, Y_CENTER - HEIGHT / 24);
            });
            ctx.fillStyle = "white";
            ctx.fillText(panel.details1 || "", rect.x + X_MARGIN, Y_CENTER - HEIGHT / 24);

            // Details 2
            longShadow(ctx, HEIGHT / 100, () => {
                ctx.fillStyle = SHADOW_COLOR;
                ctx.fillText(panel.details2 || "", rect.x + X_MARGIN, Y_CENTER + HEIGHT / 24);
            });
            ctx.fillStyle = "white";
            ctx.fillText(panel.details2 || "", rect.x + X_MARGIN, Y_CENTER + HEIGHT / 24);

            // Title
            (() => {
                const lines = panel.title?.split("\\");
                ctx.textAlign = "right";
                if (!lines) return;
                if (lines.length === 1) {
                    ctx.font = `${(HEIGHT / 12)}px "Montserrat-SemiBold"`;
                    longShadow(ctx, HEIGHT / 100, () => {
                        ctx.fillStyle = SHADOW_COLOR;
                        ctx.fillText(lines[0] || "", rect.x + rect.w - X_MARGIN, Y_CENTER);
                    });
                    ctx.fillStyle = "white";
                    ctx.fillText(lines[0] || "", rect.x + rect.w - X_MARGIN, Y_CENTER);
                } else {
                    ctx.font = `${(HEIGHT / 18)}px "Montserrat-SemiBold"`;
                    longShadow(ctx, HEIGHT / 100, () => {
                        ctx.fillStyle = SHADOW_COLOR;
                        ctx.fillText(lines[0] || "", rect.x + rect.w - X_MARGIN, Y_CENTER - HEIGHT / 24);
                        ctx.fillText(lines[1] || "", rect.x + rect.w - X_MARGIN, Y_CENTER + HEIGHT / 24);
                    });
                    ctx.fillStyle = "white";
                    ctx.fillText(lines[0] || "", rect.x + rect.w - X_MARGIN, Y_CENTER - HEIGHT / 24);
                    ctx.fillText(lines[1] || "", rect.x + rect.w - X_MARGIN, Y_CENTER + HEIGHT / 24);
                }
            })();
        }
    })();

    return canvas;
}