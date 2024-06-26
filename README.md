# 🔴 Challenge Pokemon

[Español](README.md) <img src="https://flagicons.lipis.dev/flags/4x3/ar.svg" width="20"/> / [Inglés](README_EN.md) <img src="https://flagicons.lipis.dev/flags/4x3/us.svg" width="20"/>

## 📖 Sobre el proyecto

Este proyecto es un **juego de batalla entre pokémones** donde los jugadores pueden seleccionar sus pokémones y enfrentarse en una batalla estratégica. Utiliza un algoritmo específico para determinar el ganador basado en las estadísticas de los pokémones.

## 🧠 Algoritmo de batalla

- El pokemon con la velocidad más alta hace el primer ataque. Si son iguales, el pokemon con el ataque más alto va primero.
- Para calcular el daño, resta la defensa del ataque (ataque - defensa). La diferencia es el daño. Si el ataque es igual o menor que la defensa, el daño es 1.
- El daño se resta del HP.
- Los pokemon pelearán por turnos. Todos los turnos serán calculados en el mismo request, por lo que el endpoint debe retornar la data del ganador en la misma llamada.
- El ganador es el que reduzca el HP del enemigo a cero.
- Se implementó el sistema de tipos, pero no interactúa en el algoritmo de batalla, solo es visual.

## 💻 Tecnologías usadas

Backend:
- **Framework:** NestJs
- **ORM:** Typeorm
- **Base de datos:** Sqlite
- **Gestor de paquetes:** Yarn

Frontend:
- **Librería:** React
- **Componentes UI:** MaterialUI
- **Gestor de paquetes:** Yarn

## 🚀 ¿Cómo deployarlo?

### Clonar el repositorio

1. Clona el repositorio desde GitHub: `git clone https://github.com/DarioAlbor/ChallengePokemon.git`
2. Navega al directorio del proyecto: `cd ChallengePokemon`

### Configurar y arrancar el servidor

1. Navega al directorio del servidor: `cd server`
2. Instala las dependencias: `yarn`
3. Genera la base de datos de pokémones `pokemon.db` (si deseas una nueva, elimina la actual): `yarn run seed`
4. Inicia el servidor: `yarn start`

### Configurar y arrancar el cliente

1. Navega al directorio del cliente: `cd client`
2. Instala las dependencias: `yarn`
3. Navega al directorio `../utils/apiroutes.js` y modifica `const baseurl = 'http://localhost:3000/pokemon';`
4. Inicia el cliente: `yarn start`

¡Disfruta!

## ✨ Deployado utilizando

Frontend: [Vercel](https://vercel.com)
Backend: [Render](https://render.com)

## 📬 Contacto

Puedes contactarme mediante mi [portafolio](https://darioalbor.dev.ar).

También puedes contribuir al proyecto sumando nuevas ideas o líneas de código. ¡Toda ayuda es bienvenida!

## 📸 Imágenes

| ![Inicio del juego](./imagesgit/index.png) | ![Selección de pokémon](./imagesgit/choosepokemon.png) |
|:------------------------------------------:|:----------------------------------------------------:|
| Inicio del juego                           | Selección de pokémon                                 |

| ![Batalla](./imagesgit/battle.png)        | ![Victoria](./imagesgit/victory.png)                 |
|:------------------------------------------:|:----------------------------------------------------:|
| Batalla                                    | Victoria                                            |
