// Conversiones entre el formulario del admin y el formato de las noticias en Firestore

// "¡Año nuevo en Quantum Jam!" → "ano-nuevo-en-quantum-jam"
export function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // tildes, diéresis y la virgulilla de la ñ
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Markdown básico → body: un bloque por párrafo (separados por una línea en blanco) y "## " → { h2 }.
// Negrita, cursiva, links y listas quedan tal cual dentro del string.
export function textToBody(text) {
  return text
    .split(/\n\s*\n|\n(?=## )/) // como en markdown, un "## " corta el párrafo aunque no haya línea en blanco
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      if (!block.startsWith("## ")) return [block];
      // "## Título" con texto en la línea de abajo: ese texto sigue como un bloque aparte
      const [heading, ...rest] = block.split("\n");
      return [{ h2: heading.slice(3).trim() }, ...textToBody(rest.join("\n"))];
    });
}

// body → markdown básico: lo inverso de textToBody
export function bodyToText(body = []) {
  return body.map((block) => (typeof block === "string" ? block : `## ${block.h2}`)).join("\n\n");
}

// **negrita**, *cursiva* y [texto](url). Como en markdown, la marca no puede tener un espacio justo adentro,
// así "5 * 3 * 2" queda como texto. Sin lookbehind: en Safari < 16.4 es un error de sintaxis.
const INLINE = /\*\*(\S(?:[\s\S]*?\S)?)\*\*|\*([^\s*](?:[^*]*?[^\s*])?)\*|\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g;

// Texto de un párrafo → strings y nodos { type: "strong" | "em" | "a", children, href }
export function parseInline(text) {
  const nodes = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const [whole, strong, em, label, href] = match;
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (strong !== undefined) nodes.push({ type: "strong", children: parseInline(strong) });
    else if (em !== undefined) nodes.push({ type: "em", children: parseInline(em) });
    else nodes.push({ type: "a", href, children: parseInline(label) });
    last = match.index + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Un bloque del cuerpo → párrafos y listas: las líneas seguidas que empiezan con "- " son una lista
export function parseBlock(text) {
  const parts = [];
  for (const line of text.split("\n")) {
    const last = parts[parts.length - 1];
    const isItem = line.startsWith("- ");
    if (isItem && last?.type === "ul") last.items.push(line.slice(2));
    else if (isItem) parts.push({ type: "ul", items: [line.slice(2)] });
    else if (last?.type === "p") last.lines.push(line);
    else parts.push({ type: "p", lines: [line] });
  }
  return parts.map((part) =>
    part.type === "ul"
      ? { type: "ul", items: part.items.map(parseInline) }
      : { type: "p", children: parseInline(part.lines.join("\n")) }
  );
}
