# Schreibanlass-Kartei

Digitale Schreibanlass-Kartei für die Schreibzeit nach Beate Leßmann.

## Installation & Start

```bash
npm install
npm run dev
```

Die App öffnet sich unter http://localhost:5173

## Neue Karten hinzufügen

1. **Bilddatei ablegen** in `public/cards/`
   - Format: PNG oder JPG empfohlen
   - Beispiel: `public/cards/H20 - Meeresküste.png`

2. **Markdown-Datei anlegen** in `public/cards/`
   - Beispiel: `public/cards/H20.md`
   - Vorlage:

```markdown
# Titel der Karte

## Schreibimpulse

### Geschichte
Schreibimpuls-Text ...

### Erlebnisbericht
Schreibimpuls-Text ...

### Sachtext
Schreibimpuls-Text ...

---

## Wortspeicher

### Nomen (Namenwörter)
- der Begriff
- das Wort

### Verben (Tunwörter)
- machen
- gehen

### Adjektive (Wiewörter)
- schön
- groß
```

3. **Eintrag in `src/data/cards.ts`** ergänzen:

```typescript
{
  id: 'H20',
  title: 'Die ruhige Meeresküste',
  image: '/cards/H20 - Meeresküste.png',
  markdown: '/cards/H20.md',
},
```

Das war's – nach `npm run dev` erscheint die neue Karte sofort in der Galerie.

## Build für Produktion

```bash
npm run build
```

Der fertige Build liegt in `dist/` und kann auf jeden Webserver kopiert werden.

## Deployment auf GitHub Pages

1. **Repository auf GitHub anlegen** und Code pushen

2. **`vite.config.ts` anpassen** – `base` auf den Repository-Namen setzen:
   ```typescript
   base: '/schreibanlass-kartei/',  // ← deinen Repo-Namen eintragen
   ```

3. **GitHub Pages aktivieren:**
   - Repository → Settings → Pages
   - Source: GitHub Actions

4. **Automatisch deployen:** Der Workflow in `.github/workflows/deploy.yml` deployed bei jedem Push auf `main` automatisch.

## Projektstruktur

```
public/cards/       ← Bilder und Markdown-Dateien
src/
  data/cards.ts     ← Kartenliste (hier neue Karten eintragen)
  components/
    Gallery.tsx     ← Galerieansicht mit Suche
    CardViewer.tsx  ← Vollbild-Kartenmodus mit Navigation
    FlipCard.tsx    ← Flip-Animation (Vorder-/Rückseite)
    MarkdownContent.tsx  ← Markdown-Renderer mit Wort-Chips
```

## Bedienung

| Aktion | Touch | Desktop |
|--------|-------|---------|
| Karte öffnen | Antippen | Klick |
| Karte umdrehen | Antippen | Klick |
| Nächste Karte | Wischen links | → Pfeiltaste |
| Vorherige Karte | Wischen rechts | ← Pfeiltaste |
| Zurück zur Galerie | Galerie-Button | Esc |
| Vollbild | Vollbild-Button | Vollbild-Button |
