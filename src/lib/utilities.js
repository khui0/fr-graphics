export function dateToString(date) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

export function dateToISO(date) {
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function thisFriday() {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - today.getDay() + 5));
}

export function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export function setSVGStyle(svg, styles) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "image/svg+xml");
    Object.assign(doc.querySelector("svg").style, styles);

    const xml = new XMLSerializer().serializeToString(doc);
    return "data:image/svg+xml;base64," + btoa(xml);
}

export function download(canvas, fileName) {
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL();
    link.click();
}