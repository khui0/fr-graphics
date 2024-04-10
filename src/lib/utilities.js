export function dateToString(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function dateToISO(date) {
  let year = date.getFullYear();
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

export function downloadText(string, fileName) {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(string);
  link.click();
}

export function longShadow(ctx, depth, callback, shadow = true) {
  ctx.save();
  ctx.translate(depth, depth);
  for (let i = 1; i < depth; i++) {
    if (i == 1 && shadow) {
      ctx.shadowColor = "rgba(0, 0, 10, 0.5)";
      ctx.shadowBlur = depth * 1.4;
      ctx.shadowOffsetX = depth * 0.8;
      ctx.shadowOffsetY = depth * 0.8;
    } else {
      ctx.shadowColor = "transparent";
    }
    ctx.translate(-1, -1);
    callback();
  }
  ctx.restore();
}

export function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
}

export function createGrid(x1, y1, x2, y2, rows, cols, gap = 0, margin = 0) {
  const grid = [];
  const itemWidth = (x2 - x1 - margin * 2 - (cols - 1) * gap) / cols;
  const itemHeight = (y2 - y1 - margin * 2 - (rows - 1) * gap) / rows;
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x: (itemWidth + gap) * x + x1 + margin,
        y: (itemHeight + gap) * y + y1 + margin,
        w: itemWidth,
        h: itemHeight,
      });
    }
    grid.push(row);
  }
  return grid;
}

export function columnToIndex(column) {
  const letters = column.split("").reverse();
  let total = 0;
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const value = (letter.charCodeAt(0) - 65 + 1) * 26 ** i;
    total += value;
  }
  return total - 1;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function initialFirst(name) {
  const parts = name.split(" ");
  if (parts.length == 2) {
    return `${parts[0].substring(0, 1)}. ${parts[1]}`;
  } else {
    return name;
  }
}

export function initialLast(name) {
  const parts = name.split(" ");
  if (parts.length == 2) {
    return `${parts[0]} ${parts[1].substring(0, 1)}.`;
  } else {
    return name;
  }
}

export function parseRange(string) {
  const ranges = string
    .split(",")
    .map((item) => item.trim())
    .filter((item) => /^[0-9]+-[0-9]+$/m.test(item) || /^[0-9]+$/m.test(item));
  const indexes = [];
  ranges.forEach((range) => {
    range = range.split("-").map((num) => parseInt(num));
    if (range.length == 2) {
      for (let i = range[0]; i <= range[1]; i++) {
        if (!indexes.includes(i)) {
          indexes.push(i);
        }
      }
    } else {
      if (!indexes.includes(range[0])) {
        indexes.push(range[0]);
      }
    }
  });
  return indexes;
}

export function canonicalToArray(data, canonical) {
  return data.findIndex((story) => story.canonical === canonical);
}

export function arrayToCanonical(data, index) {
  return data[index].canonical;
}
