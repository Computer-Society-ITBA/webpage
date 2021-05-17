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

## Cómo Contribuir

Este proyecto tiene automatic deployments, por lo que la branch que siempre va a estar publicada es `main`. Hay una branch más, `develop`, que es una branch que va a tener una preview de lo que se esté preparando para ser mergeado a `main`.

Para poder contribuir (con una **FEATURE**):
1. Branchear de `develop` con una branch llamada `feature_<nombre-de-feature>`, donde `nombre-de-feature` es el nombre de la feature que se está desarrollando.
2. Una vez lista la feature, crear una **Pull Request** desde `feature_<nombre-de-feature>` hasta `develop` para generar la preview en `develop`. La **Pull Request** tiene que llamarse `Feature: <nombre-de-feature>`.
3. Una vez generada la preview en `develop` (y confirmando que funciona), mergear a `develop` el cambio y borrar la branch vieja.
4. Crear una **Pull Request** desde `develop` hasta `main`, que se llame `Release: <nombre-de-feature>` o `Release: <nombre-conjunto-de-features>`
5. Una vez generada la preview de `main` (y confirmando que funciona), mergearla a `main`.

Para poder contribuir (con una **FIX**):
1. Branchear de `develop` con una branch llamada `fix_<nombre-de-fix>`, donde `nombre-de-fix` es el nombre del fix que van a arreglar.
2. Una vez listo el fix, crear una **Pull Request** desde `fix_<nombre-de-fix>` hasta `develop` para generar la preview en `develop`. La **Pull Request** tiene que llamarse `Fix: <nombre-de-fix>`.
3. Una vez generada la preview en `develop` (y confirmando que funciona), mergear a `develop` el cambio y borrar la branch vieja.
4. Crear una **Pull Request** desde `develop` hasta `main`, que se llame `Fix: <nombre-de-fix>` o `Fix: <nombre-conjunto-de-fixes>`
5. Una vez generada la preview de `main` (y confirmando que funciona), mergearla a `main`.

## Librerías

Usamos:
1. [React](https://reactjs.org/docs/create-a-new-react-app.html)
2. [Framer Motion](https://www.framer.com/api/motion/)
3. [Tailwind CSS](https://tailwindcss.com/docs)