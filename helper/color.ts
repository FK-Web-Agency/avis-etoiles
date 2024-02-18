export function colorIsLight(color: string) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 0 + 2), 16);
  const c_g = parseInt(hex.substring(2, 2 + 2), 16);
  const c_b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Vérifier si la couleur est au format hexadécimal
  const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(hex)) {
    return null;
  }

  // Supprimer le caractère "#" s'il est présent
  hex = hex.replace('#', '');

  // Extraire les valeurs de chaque composante (R, G, B)
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  // Retourner la valeur RGB sous forme de chaîne de caractères
  return { r, g, b };
}
