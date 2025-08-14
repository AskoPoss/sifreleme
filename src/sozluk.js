const cevirTablosu = {
  'a': ['@', '4', 'α'],
  'b': ['ß', '8'],
  'c': ['¢', 'ç'],
  'd': ['Ð', 'd'],
  'e': ['3', '€', 'ê'],
  'f': ['ƒ'],
  'g': ['6', '9'],
  'h': ['#', 'h'],
  'i': ['!', '1', 'î'],
  'j': ['¿'],
  'k': ['κ', 'x'],
  'l': ['1', '|'],
  'm': ['^^', '♍'],
  'n': ['ñ', 'И'],
  'o': ['0', 'ø', 'õ'],
  'p': ['þ', 'ρ'],
  'r': ['®', 'я'],
  's': ['$', '§'],
  't': ['+', '†'],
  'u': ['ü', 'µ'],
  'v': ['¥', '√'],
  'y': ['¥', 'ү'],
  'z': ['2', 'ž'],
  ' ': ['·']
};

const cozumTablosu = {};

// Tüm şifreli karakterleri çözüme ekle
for (let harf in cevirTablosu) {
  for (let sembol of cevirTablosu[harf]) {
    cozumTablosu[sembol] = harf;
  }
}

function rastgeleSec(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

function sifrele() {
  const giris = document.getElementById("input").value.toLowerCase();
  let sonuc = "";
  for (let karakter of giris) {
    if (cevirTablosu[karakter]) {
      sonuc += rastgeleSec(cevirTablosu[karakter]);
    } else {
      sonuc += karakter;
    }
  }
  document.getElementById("output").value = sonuc;
}

function coz() {
  let giris = document.getElementById("input").value;
  let sonuc = "";
  for (let i = 0; i < giris.length; i++) {
    let char = giris[i];
    let ikiKarakter = giris.slice(i, i+2);
    let ucKarakter = giris.slice(i, i+3);

    if (cozumTablosu[ucKarakter]) {
      sonuc += cozumTablosu[ucKarakter];
      i += 2;
    } else if (cozumTablosu[ikiKarakter]) {
      sonuc += cozumTablosu[ikiKarakter];
      i += 1;
    } else if (cozumTablosu[char]) {
      sonuc += cozumTablosu[char];
    } else {
      sonuc += char;
    }
  }
  document.getElementById("output").value = sonuc;
}

// Eğer URL'de .html varsa, onu sil ve görünümü düzelt
if (window.location.pathname.endsWith('.html')) {
  const newUrl = window.location.pathname.replace('.html', '');
  window.history.replaceState(null, '', newUrl);
}