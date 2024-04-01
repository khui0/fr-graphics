export class Falcos {
    #ctx;

    constructor(w, h, theme) {
        this.w = w;
        this.h = h;
        this.theme = {
            background: "#0000ab",
            headingColor: "#feff20",
            titleColor: "#ff93a7",
            nomineesColor: "#ffffff",
            dropShadow: {
                offsetX: 30,
                offsetY: 30,
                blur: 50,
                color: "rgba(0, 0, 10, 0.5)",
            },
            longShadow: {
                mirror: false,
                depth: 50,
                color: "#181818",
            },
            margin: 50,
        };
        Object.assign(this.theme, theme);
    }

    initializeFont(font) {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.font = font;
        ctx.fillText("", 0, 0);
    }

    generate(title, nominees) {
        const ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.w;
        ctx.canvas.height = this.h;
        this.#ctx = ctx;
        const theme = this.theme;

        // Draw background
        ctx.fillStyle = theme.background;
        ctx.fillRect(0, 0, this.w, this.h);

        // Set default text style
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        // Draw heading
        {
            ctx.font = `${this.h / 10}px LinLibertineCapitalsB`;
            // Draw long shadow
            this.#longShadow(this.h / 50, () => {
                ctx.fillStyle = theme.longShadow.color;
                ctx.fillText("Nominee:", this.w * 0.5, this.h * 0.08);
            });
            // Draw text
            ctx.fillStyle = theme.headingColor;
            ctx.fillText("Nominee:", this.w * 0.5, this.h * 0.08);
        }
        // Draw title
        {
            const fontSize = this.h / 6;
            ctx.font = `${fontSize}px Montserrat-SemiBold`;
            // Split text into lines
            const lines = this.#getLines(title, this.w - (theme.margin * 2));
            const y = this.h * 0.4;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const offset = (i - (lines.length - 1) / 2) * fontSize;
                // Draw long shadow
                this.#longShadow(this.h / 50, () => {
                    ctx.fillStyle = theme.longShadow.color;
                    ctx.fillText(line, this.w * 0.5, y + offset);
                });
                // Draw text
                ctx.fillStyle = theme.titleColor;
                ctx.fillText(line, this.w * 0.5, y + offset);
            }
        }
        // Draw nominees
        {
            const fontSize = this.h / 12;
            ctx.font = `${fontSize}px Montserrat-SemiBold`;
            // Split text into lines
            const names = [...new Set(nominees)].join(", ");
            const lines = this.#getLines(names, this.w - (theme.margin * 2));
            const y = this.h * 0.75;

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const offset = (i - (lines.length - 1) / 2) * fontSize;
                // Draw long shadow
                this.#longShadow(this.h / 50, () => {
                    ctx.fillStyle = theme.longShadow.color;
                    ctx.fillText(line, this.w * 0.5, y + offset);
                });
                // Draw text
                ctx.fillStyle = theme.nomineesColor;
                ctx.fillText(line, this.w * 0.5, y + offset);
            }
        }

        return ctx.canvas;
    }

    #longShadow(depth, callback) {
        const theme = this.theme;
        const direction = theme.longShadow.mirror ? -1 : 1;
        this.#ctx.save();
        this.#ctx.translate(depth * direction, depth);
        for (let i = 1; i < depth; i++) {
            if (i == 1) {
                this.#ctx.shadowColor = theme.dropShadow.color;
                this.#ctx.shadowBlur = theme.dropShadow.blur;
                this.#ctx.shadowOffsetX = theme.dropShadow.offsetX;
                this.#ctx.shadowOffsetY = theme.dropShadow.offsetY;
            }
            else {
                this.#ctx.shadowColor = "transparent";
            }
            this.#ctx.translate(-1 * direction, -1);
            callback();
        }
        this.#ctx.restore();
    }

    // https://stackoverflow.com/a/16599668/
    #getLines(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const currentWidth = this.#ctx.measureText(currentLine + " " + word).width;
            if (currentWidth < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}