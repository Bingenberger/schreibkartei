import type { Card } from '../types'

// Neue Karten hinzufügen:
// 1. PNG konvertieren: magick "Name.png" -quality 82 "public/webp/Name.webp"
// 2. MD nach public/md/ kopieren
// 3. Eintrag hier ergänzen

const base = import.meta.env.BASE_URL
const img = (file: string) => `${base}webp/${file}`
const thumb = (file: string) => `${base}thumbs/${file}`
const md = (id: string) => `${base}md/${id}.md`

export const cards: Card[] = [
  { id: 'H01', title: 'Fußballplatz', image: img('H01 - Fußballplatz - bearbeitet.webp'), thumbnail: thumb('H01 - Fußballplatz - bearbeitet.webp'), markdown: md('H01') },
  { id: 'H02', title: 'Reitplatz', image: img('H02 - Reitplatz - bearbeitet.webp'), thumbnail: thumb('H02 - Reitplatz - bearbeitet.webp'), markdown: md('H02') },
  { id: 'H03', title: 'Verließ', image: img('H03 - Verließ - bearbeitet.webp'), thumbnail: thumb('H03 - Verließ - bearbeitet.webp'), markdown: md('H03') },
  { id: 'H04', title: 'Rosengarten', image: img('H04 - Rosengarten - bearbeitet.webp'), thumbnail: thumb('H04 - Rosengarten - bearbeitet.webp'), markdown: md('H04') },
  { id: 'H05', title: 'Schulhof', image: img('H05 - Schulhof - bearbeitet.webp'), thumbnail: thumb('H05 - Schulhof - bearbeitet.webp'), markdown: md('H05') },
  { id: 'H06', title: 'Hexenküche', image: img('H06 - Hexenküche - bearbeitet.webp'), thumbnail: thumb('H06 - Hexenküche - bearbeitet.webp'), markdown: md('H06') },
  { id: 'H07', title: 'Raumstation', image: img('H07 - Raumstation - bearbeitet.webp'), thumbnail: thumb('H07 - Raumstation - bearbeitet.webp'), markdown: md('H07') },
  { id: 'H08', title: 'Uhrenfabrik', image: img('H08 - Uhrenfabrik - bearbeitet.webp'), thumbnail: thumb('H08 - Uhrenfabrik - bearbeitet.webp'), markdown: md('H08') },
  { id: 'H09', title: 'Höhle Schmied', image: img('H09 - Höhle Schmied - bearbeitet.webp'), thumbnail: thumb('H09 - Höhle Schmied - bearbeitet.webp'), markdown: md('H09') },
  { id: 'H10', title: 'Korallenriff', image: img('H10 - Korallenriff - bearbeitet.webp'), thumbnail: thumb('H10 - Korallenriff - bearbeitet.webp'), markdown: md('H10') },
  { id: 'H11', title: 'Gewächshaus', image: img('H11 - Gewächshaus - bearbeitet.webp'), thumbnail: thumb('H11 - Gewächshaus - bearbeitet.webp'), markdown: md('H11') },
  { id: 'H12', title: 'Bonbonland', image: img('H12 - Bonbonland - bearbeitet.webp'), thumbnail: thumb('H12 - Bonbonland - bearbeitet.webp'), markdown: md('H12') },
  { id: 'H13', title: 'Wolkenwerkstatt', image: img('H13 - Wolkenwerkstatt - bearbeitet.webp'), thumbnail: thumb('H13 - Wolkenwerkstatt - bearbeitet.webp'), markdown: md('H13') },
  { id: 'H14', title: 'Seekino', image: img('H14 - Seekino - bearbeitet.webp'), thumbnail: thumb('H14 - Seekino - bearbeitet.webp'), markdown: md('H14') },
  { id: 'H15', title: 'Postkürbis', image: img('H15 - Postkürbis - bearbeitet.webp'), thumbnail: thumb('H15 - Postkürbis - bearbeitet.webp'), markdown: md('H15') },
  { id: 'H16', title: 'Baumhaus im Urwald', image: img('H16 - Baumhaus im Urwald - bearbeitet.webp'), thumbnail: thumb('H16 - Baumhaus im Urwald - bearbeitet.webp'), markdown: md('H16') },
  { id: 'H17', title: 'Bauwagen am Strand', image: img('H17 - Bauwagen am Strand - bearbeitet.webp'), thumbnail: thumb('H17 - Bauwagen am Strand - bearbeitet.webp'), markdown: md('H17') },
  { id: 'H18', title: 'Tropfsteinhöhle', image: img('H18 - Tropfsteinhöhle - bearbeitet.webp'), thumbnail: thumb('H18 - Tropfsteinhöhle - bearbeitet.webp'), markdown: md('H18') },
  { id: 'H19', title: 'Baumhaus', image: img('H19 - Baumhaus - bearbeitet.webp'), thumbnail: thumb('H19 - Baumhaus - bearbeitet.webp'), markdown: md('H19') },
  { id: 'H20', title: 'Gewächshaus', image: img('H20 - Gewächshaus - bearbeitet.webp'), thumbnail: thumb('H20 - Gewächshaus - bearbeitet.webp'), markdown: md('H20') },
  { id: 'H21', title: 'Fliegender Jahrmarkt', image: img('H21 - fliegender Jahrmarkt - bearbeitet.webp'), thumbnail: thumb('H21 - fliegender Jahrmarkt - bearbeitet.webp'), markdown: md('H21') },
  { id: 'H22', title: 'Süßigkeitenfabrik', image: img('H22 - Süßigkeitenfabrik - bearbeitet.webp'), thumbnail: thumb('H22 - Süßigkeitenfabrik - bearbeitet.webp'), markdown: md('H22') },
  { id: 'H23', title: 'Laterneninseln', image: img('H23 - Laterneninseln - bearbeitet.webp'), thumbnail: thumb('H23 - Laterneninseln - bearbeitet.webp'), markdown: md('H23') },
  { id: 'H24', title: 'Postschiffhafen', image: img('H24 - Postschiffhafen - bearbeitet.webp'), thumbnail: thumb('H24 - Postschiffhafen - bearbeitet.webp'), markdown: md('H24') },
  { id: 'H25', title: 'Vogelnest', image: img('H25 - Vogelnest - bearbeitet.webp'), thumbnail: thumb('H25 - Vogelnest - bearbeitet.webp'), markdown: md('H25') },
  { id: 'H26', title: 'Gefrorene Musik', image: img('H26 - gefrorene Musik - bearbeitet.webp'), thumbnail: thumb('H26 - gefrorene Musik - bearbeitet.webp'), markdown: md('H26') },
  { id: 'H27', title: 'Gewächshaus mit Seifenblasen', image: img('H27 - Gewächshaus mit Seifenblasen - bearbeitet.webp'), thumbnail: thumb('H27 - Gewächshaus mit Seifenblasen - bearbeitet.webp'), markdown: md('H27') },
  { id: 'H28', title: 'Schattengallerie', image: img('H28 - Schattengallerie - bearbeitet.webp'), thumbnail: thumb('H28 - Schattengallerie - bearbeitet.webp'), markdown: md('H28') },
  { id: 'H29', title: 'Planetarium', image: img('H29 - Planetarium - bearbeitet.webp'), thumbnail: thumb('H29 - Planetarium - bearbeitet.webp'), markdown: md('H29') },
  { id: 'H30', title: 'Tortenküche', image: img('H30 - Tortenküche - bearbeitet.webp'), thumbnail: thumb('H30 - Tortenküche - bearbeitet.webp'), markdown: md('H30') },
  { id: 'H31', title: 'Klassenzimmer', image: img('H31 - Klassenzimmer - bearbeitet.webp'), thumbnail: thumb('H31 - Klassenzimmer - bearbeitet.webp'), markdown: md('H31') },
  { id: 'H32', title: 'Drachenschmiede', image: img('H32 - Drachenschmiede - bearbeitet.webp'), thumbnail: thumb('H32 - Drachenschmiede - bearbeitet.webp'), markdown: md('H32') },
  { id: 'H33', title: 'Schneiderei', image: img('H33 - Schneiderei - bearbeitet.webp'), thumbnail: thumb('H33 - Schneiderei - bearbeitet.webp'), markdown: md('H33') },
  { id: 'H34', title: 'Unterwassergeschäft', image: img('H34 - Unterwassergeschäft - bearbeitet.webp'), thumbnail: thumb('H34 - Unterwassergeschäft - bearbeitet.webp'), markdown: md('H34') },
  { id: 'H35', title: 'Fliegende Schiffchen', image: img('H35 - fliegende Schiffchen - bearbeitet.webp'), thumbnail: thumb('H35 - fliegende Schiffchen - bearbeitet.webp'), markdown: md('H35') },
  { id: 'H36', title: 'Lichtung', image: img('H36 - Lichtung - bearbeitet.webp'), thumbnail: thumb('H36 - Lichtung - bearbeitet.webp'), markdown: md('H36') },
  { id: 'H37', title: 'Hinterhof', image: img('H37 - Hinterhof - bearbeitet.webp'), thumbnail: thumb('H37 - Hinterhof - bearbeitet.webp'), markdown: md('H37') },
  { id: 'H38', title: 'Burg', image: img('H38 - Burg - bearbeitet.webp'), thumbnail: thumb('H38 - Burg - bearbeitet.webp'), markdown: md('H38') },
  { id: 'H39', title: 'Bauplatz', image: img('H39 - Bauplatz - bearbeitet.webp'), thumbnail: thumb('H39 - Bauplatz - bearbeitet.webp'), markdown: md('H39') },
  { id: 'H40', title: 'Taschenlampenlager', image: img('H40 - Taschenlampenlager - bearbeitet.webp'), thumbnail: thumb('H40 - Taschenlampenlager - bearbeitet.webp'), markdown: md('H40') },
  { id: 'H41', title: 'Traumgefängnis', image: img('H41 - Traumgefängnis - bearbeitet.webp'), thumbnail: thumb('H41 - Traumgefängnis - bearbeitet.webp'), markdown: md('H41') },
  { id: 'H42', title: 'Flaschenpostamt', image: img('H42 - Flaschenpostamt - bearbeitet.webp'), thumbnail: thumb('H42 - Flaschenpostamt - bearbeitet.webp'), markdown: md('H42') },
]
