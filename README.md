# CS ITBA Webpage

## Instalar

Para instalar, clonar el repositorio y hacer un:
```bash
npm install
```
o
```bash
yarn
```

## Correr

Para correr el proyecto con hot reload correr:
```bash
npm run start
```

Para buildear el proyecto correr:
```bash
npm run build
```

## Deploy

El repositorio tiene una pipeline de deployment automatizado. La branch `main` es la branch que siempre va a estar en producción. Cada vez que se hace un push o merge a `main`, se hace un deploy automático.

### Pull Requests

Cada Pull Request (PR) que se haga va a generar un link a una preview de la página. Simplemente con crear la PR se lanza la creación de un link de preview.

Una vez que los checks de Github se completan, se genera el link y se va a publicar un comentario en el historial de la PR con el link a la preview.

## Deploy Manual

**ESTO NO ES NECESARIO, PERO SE AGREGA POR LAS DUDAS. NUNCA HACER ASÍ**

Para hacer un deploy manualmente, hay que correr:
```bash
firebase deploy --only hosting:csitba --project webpage-36e40
```

## Librerías

Usamos:
1. [React](https://reactjs.org/docs/create-a-new-react-app.html)
2. [Framer Motion](https://www.framer.com/api/motion/)
3. [Tailwind CSS](https://tailwindcss.com/docs)