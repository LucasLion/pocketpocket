#!/bin/bash

cd /home/noil/code/vue/pocketpocket/public

# Créer les dossiers
mkdir -p png jpg

# Déplacer les PNG dans le dossier png
mv *.PNG png/ 2>/dev/null

# Convertir en JPG (qualité 85%)
for file in png/*.PNG; do
  filename=$(basename "$file" .PNG)
  convert "$file" -quality 85 "jpg/${filename}.jpg"
  echo "Converti: $filename"
done

echo "Terminé !"
