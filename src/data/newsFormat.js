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
