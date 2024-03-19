import { loadImage, setSVGStyle, dateToString, longShadow } from "$lib/utilities.js";

import falcon from "$lib/assets/falcon.svg";
import logo from "$lib/assets/falcon-report-logo-v2-with-padding-01.svg?raw";
import montserrat from "$lib/assets/Montserrat-SemiBold.woff2";

const WIDTH = 1920;
const HEIGHT = 1080;
const SHADOW_COLOR = "hsl(0, 0%, 12%)";

export async function load() {
    const assets = {};
    const promises = [
        new FontFace("Montserrat-SemiBold", `url("${montserrat}")`).load().then(font => {
            document.fonts.add(font);
        }),
        loadImage(falcon).then(img => {
            assets.backgroundLogo = img;
        }),
        loadImage(setSVGStyle(logo, {
            fill: "white"
        })).then(img => {
            assets.logoWhite = img;
        }),
        loadImage(setSVGStyle(logo, {
            fill: SHADOW_COLOR
        })).then(img => {
            assets.logoGray = img;
        }),
    ]
    await Promise.all(promises);
    return assets;
}

export function generate(canvas, assets, options) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Background gradient
    if (options.backgroundStyle === 0) {
        const gradient = ctx.createConicGradient(0, WIDTH * 0.5, HEIGHT * 0.5);
        gradient.addColorStop(0, "rgb(122, 24, 24)");
        gradient.addColorStop(0.1, "rgb(178, 35, 35)");
        gradient.addColorStop(0.2, "rgb(122, 24, 24)");
        gradient.addColorStop(0.3, "rgb(178, 35, 35)");
        gradient.addColorStop(0.4, "rgb(122, 24, 24)");
        gradient.addColorStop(0.5, "rgb(178, 35, 35)");
        gradient.addColorStop(0.6, "rgb(122, 24, 24)");
        gradient.addColorStop(0.7, "rgb(178, 35, 35)");
        gradient.addColorStop(0.8, "rgb(122, 24, 24)");
        gradient.addColorStop(0.9, "rgb(178, 35, 35)");
        gradient.addColorStop(1, "rgb(122, 24, 24)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }

    // Background logo
    (() => {
        const size = HEIGHT * 1.5;
        const x = (WIDTH - size) / 2;
        const y = (HEIGHT - size) / 2;
        ctx.globalAlpha = 0.2;
        ctx.drawImage(assets.backgroundLogo, x, y, size, size);
        ctx.globalAlpha = 1;
    })();

    // Falcon Report Logo
    (() => {
        canvas.ctx
        const w = WIDTH * 1;
        const h = assets.logoWhite.height * w / assets.logoWhite.width;
        const x = WIDTH * 0.5 - (w / 2);
        const y = HEIGHT * 0.375 - (h / 2);
        longShadow(ctx, HEIGHT / 30, () => {
            ctx.drawImage(assets.logoGray, x, y, w, h);
        });
        ctx.drawImage(assets.logoWhite, x, y, w, h);
    })();

    // Subtitle
    (() => {
        const date = dateToString(options.date + "T00:00:00");
        const subtitle = options.subtitleText;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${(HEIGHT / options.fontSize)}px "Montserrat-SemiBold"`;
        switch (options.subtitleStyle) {
            case 0: {
                const x = WIDTH * 0.5;
                const y = HEIGHT * 0.8;
                longShadow(ctx, HEIGHT / 30, () => {
                    ctx.fillStyle = SHADOW_COLOR;
                    ctx.fillText(date, x, y);
                });
                ctx.fillStyle = "white";
                ctx.fillText(date, x, y);
                break;
            }
            case 1: {
                const x = WIDTH * 0.5;
                const y = HEIGHT * 0.8;
                longShadow(ctx, HEIGHT / 30, () => {
                    ctx.fillStyle = SHADOW_COLOR;
                    ctx.fillText(subtitle, x, y);
                });
                ctx.fillStyle = "white";
                ctx.fillText(subtitle, x, y);
                break;
            }
            case 2: {
                const x = WIDTH * 0.5;
                longShadow(ctx, HEIGHT / 30, () => {
                    ctx.fillStyle = SHADOW_COLOR;
                    ctx.fillText(subtitle, x, HEIGHT * 0.73);
                    ctx.fillText(date, x, HEIGHT * 0.87);
                });
                ctx.fillStyle = "white";
                ctx.fillText(subtitle, x, HEIGHT * 0.73);
                ctx.fillText(date, x, HEIGHT * 0.87);
                break;
            }
        }
    })();

    return canvas;
}