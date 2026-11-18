# Repository showcase media

The README screenshots and trailer document the app's redesign on desktop and mobile.

- Original app: `a96468a`, including its original backgrounds.
- Redesigned app: `c9a520ec87d329b58b7e7f4c24f62d8fdf197e59`, the merged forecast workspace release.
- Film: 97.5 seconds, 1920×1080, 60 fps, stereo audio, with embedded chapters.
- Weather, autocomplete results, recent places, and the advisory are demonstration data. Interfaces and interactions were recorded from the actual app in isolated Chrome sessions.
- Page and hourly scrolling are choreographed with easing. Background artwork comes from the repository. The instrumental score was synthesized specifically for the film without third-party music samples.

`trailer-poster.webp`, `forecast.webp`, and `mobile.webp` are compressed stills used in the README. The browser-playable film, poster, and player are in `public/showcase/`; Vite copies them to `dist/showcase/` when building. The player uses `preload="none"`, and the main weather app does not reference or preload the trailer.

The web video is compressed from the original master while retaining its 1080p resolution, 60 fps frame rate, audio, and chapters.
