import { columnToIndex, clamp, initialFirst, initialLast, parseRange, dateToISO } from "$lib/utilities.js";
import { Falcos } from "./falcos.js";

import JSZip from "jszip";
import saveAs from "file-saver";
import sanitize from "sanitize-filename";

import montserrat from "$lib/assets/Montserrat-SemiBold.woff2";
import linlibertine from "$lib/assets/LinLibertineCapitalsB.woff2";

const WIDTH = 1920;
const HEIGHT = 1080;

const falcos = new Falcos(WIDTH, HEIGHT);

export async function load() {
    const assets = {};
    const promises = [
        new FontFace("Montserrat-SemiBold", `url("${montserrat}")`).load().then(font => {
            document.fonts.add(font);
        }),
        new FontFace("LinLibertineCapitalsB", `url("${linlibertine}")`).load().then(font => {
            document.fonts.add(font);
        }),
    ]
    await Promise.all(promises);
    return assets;
}

export function generate(canvas, assets, options) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Do not continue if no file is provided
    if (!options.file) return canvas;
    const data = parseCSV(options.file);
    // Do not continue if data is not parsed
    if (!data) return canvas;

    const indexes = parseRange(options.rows || "");

    let index;
    if (indexes && indexes.length > 0) {
        options.previewIndex = clamp(options.previewIndex, 0, indexes.length - 1)
        index = indexes[options.previewIndex];

    } else {
        options.previewIndex = clamp(options.previewIndex, 0, data.length - 1)
        index = options.previewIndex;
    }
    const story = data[index];

    // Format nominees
    let nominees = story.nominees;
    if (options.nameStyle === 1) {
        nominees = story.nominees.map(item => initialFirst(item));
    } else if (options.nameStyle === 2) {
        nominees = story.nominees.map(item => initialLast(item));
    }

    ctx.drawImage(falcos.generate(story.title, nominees), 0, 0);

    return canvas;
}

export function download(options) {
    const zip = new JSZip();

    // Do not continue if no file is provided
    if (!options.file) return;
    const data = parseCSV(options.file);
    // Do not continue if data is not parsed
    if (!data) return;

    let indexes = parseRange(options.rows || "");

    // Populate indexes if no range is provided
    if (indexes.length == 0) {
        indexes = parseRange(`0-${data.length - 1}`);
    }

    // Loop through indices
    for (let i = 0; i < indexes.length; i++) {
        const index = indexes[i];
        const story = data[index];

        // Format nominees
        let nominees = story.nominees;
        if (options.nameStyle === 1) {
            nominees = story.nominees.map(item => initialFirst(item));
        } else if (options.nameStyle === 2) {
            nominees = story.nominees.map(item => initialLast(item));
        }

        const image = falcos.generate(story.title, nominees).toDataURL().replace("data:image/png;base64,", "");
        // index-portion-title
        zip.file(sanitize(`${index}-${story.portion}-${story.title}`) + ".png", image, { base64: true });
    }

    zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, `falcos-${dateToISO(new Date())}.zip`);
    });
}

function parseCSV(raw) {
    try {
        // Split CSV into two-dimensional array
        let array = raw.split("\n");
        array = array.map(row => row.split(","));
        // Remove rows that do not have a story title
        array = array.filter(row => row[columnToIndex("D")]?.trim());
        // Remove the first row
        array.shift();
        // Isolate the story title and nominee names
        let formatted = array.map(row => {
            const nomineeOrder = "NOPQRSTUVWXHIJKLMF".split("").map(letter => columnToIndex(letter));
            const nominees = [];
            nomineeOrder.forEach(index => {
                if (row[index]) {
                    nominees.push(row[index].trim());
                }
            });
            return {
                title: row[columnToIndex("D")].trim(),
                nominees: nominees,
                portion: row[columnToIndex("C")].trim(),
            };
        });
        return formatted;
    } catch (err) {
        console.error(err);
    }
}