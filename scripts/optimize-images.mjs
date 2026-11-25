
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

const DIR = path.resolve("public/images/menu");
const MAX_WIDTH = 1200;
const MAX_BYTES = 300 * 1024;

if (!fs.existsSync(DIR)) {
  throw new Error(`Dossier introuvable : ${DIR}`);
}

const files = fs.readdirSync(DIR);

for (const file of files) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;

  const input = path.join(DIR, file);
  const output = path.join(
    DIR,
    `${path.parse(file).name}.jpg`
  );

  const temp = `${output}.tmp-${randomUUID()}`;
  const backup = `${output}.bak-${randomUUID()}`;

  let backupCreated = false;

  try {
    const before = fs.statSync(input).size;

    let quality = 82;
    let buffer;

    do {
      buffer = await sharp(input)
        .rotate()
        .resize({
          width: MAX_WIDTH,
          withoutEnlargement: true,
        })
        .flatten({ background: "#ffffff" })
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();

      quality -= 8;
    } while (buffer.length > MAX_BYTES && quality > 40);

    // Écrire d'abord dans un fichier temporaire
    fs.writeFileSync(temp, buffer);

    // Sauvegarder l'ancien fichier s'il existe
    if (fs.existsSync(output)) {
      fs.renameSync(output, backup);
      backupCreated = true;
    }

    // Installer la nouvelle image
    fs.renameSync(temp, output);

    // Supprimer l'ancien format si nécessaire
    if (input !== output) {
      fs.unlinkSync(input);
    }

    // Supprimer la sauvegarde après réussite
    if (backupCreated) {
      fs.unlinkSync(backup);
      backupCreated = false;
    }

    console.log(
      `OK ${file} : ${Math.round(before / 1024)} Ko -> ${Math.round(buffer.length / 1024)} Ko`
    );

  } catch (error) {
    if (fs.existsSync(temp)) {
      fs.unlinkSync(temp);
    }

    // Restaurer l'ancien fichier si son remplacement a échoué
    if (backupCreated && !fs.existsSync(output)) {
      fs.renameSync(backup, output);
    }

    console.error(`ERREUR ${file} : ${error.message}`);
  }
}

console.log("\nOptimisation terminée.");
