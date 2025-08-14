// Karakter sınırı
const MAX_CHARS = 250;

// Gelişmiş şifreleme tablosu (Türkçe + İngilizce, büyük/küçük harfler)
const cevirTablosu = {
    'a': ['@4', '∆1', 'λ3'],   'A': ['∆A', 'Λ7', '₳9'],
    'b': ['ƶ9', 'ʐ3', 'ȥ6'],   'B': ['฿5', 'Ƀ2', 'β0'],
    'c': ['Đ8', 'ↁ1', 'Ԁ9'],   'C': ['₡3', 'Ͼ6', '⊃1'],
    'ç': ['¢ç', 'Ȼ7', 'Ҫ2'],   'Ç': ['Ҫ$', 'ϾÇ', 'Ȼ%'],
    'd': ['Ð4', '∂6', 'Ԁ2'],   'D': ['¢7', 'ς9', '⊂8'],
    'e': ['€5', 'ξ3', 'Σ8'],   'E': ['Σ7', 'Ɇ1', 'ξ4'],
    'f': ['₣9', 'ғ6', 'ʄ3'],   'F': ['₣0', 'Ғ4', 'ʄ1'],
    'g': ['₲5', 'ğ&', 'Ǥ7'],   'G': ['₲0', 'Ǥ4', 'Ğ8'],
    'ğ': ['η2', 'п4', 'ภ9'],   'Ğ': ['Ğ$', 'Ǵ7', 'Ǥ%'],
    'h': ['Ҟ5', 'Ҡ1', 'Ҝ8'],   'H': ['W1', 'Ħ3', 'Ḩ8'],
    'ı': ['¡2', 'ɨ4', 'ɩ7'],   'I': ['Ì3', 'Į5', 'Ⅰ8'],
    'i': ['į8', 'ι6', 'ȉ0'],   'İ': ['Ї7', 'ḯ4', 'ɪ1'],
    'j': ['ʝ9', 'Ɉ5', 'ĵ2'],   'J': ['Ɉ7', 'Ĵ1', 'ʆ0'],
    'k': ['κ6', 'Ҝ3', 'ќ9'],   'K': ['ħ4', '♓7', 'ḩ5'],
    'l': ['ł8', 'ʟ4', 'Ŀ2'],   'L': ['Ł0', 'Ⱡ7', 'ʟ9'],
    'm': ['Ө8', '◯0', '۝3'],  'M': ['§8', 'ƨ4', 'ʂ6'],
    'n': ['ǥ3', 'Ǥğ', 'ĝ1'],   'N': ['₦1', 'П5', 'И8'],
    'o': ['ø6', '¤2', 'ʘ4'],   'O': ['₥3', 'ʍ6', 'ₘ1'],
    'ö': ['øö', '¤ö', 'ö§'],   'Ö': ['ӨÖ', 'Ö¤', 'Ö%'],
    'p': ['ρ5', '₱3', 'þ7'],   'P': ['¥4', 'ү2', 'Ұ7'],
    'r': ['я2', 'ѓ6', 'ʀ4'],   'R': ['†3', '☦9', 'ŧ6'], 
    's': ['₥0', 'Ϻ7', '₮8'],   'S': ['$7', 'Ş9', 'ϟ1'],
    'ş': ['ş$', 'şϟ', 'ş%'],   'Ş': ['Şϟ', 'Ş$', 'Ş&'],
    't': ['Я0', '₨7', 'Ҏ9'],   'T': ['☥5', '₮1', 'Ŧ8'],
    'u': ['µ7', 'ʉ3', 'υ0'],   'U': ['Ʉ4', 'Ц1', 'ひ9'],
    'ü': ['üµ', 'üɄ', 'ü&'],   'Ü': ['ÜɄ', 'Üµ', 'Ü$'],
    'v': ['√5', 'ν1', 'ѵ8'],   'V': ['Ѵ3', '√0', 'ט6'],
    'y': ['₱0', '₽1', 'Ҏ8'],   'Y': ['¥0', 'Ұ8', 'ү5'],
    'z': ['ß8', '₿3', 'β7'],   'Z': ['Ƶ1', 'ʑ7', 'Ȥ4'],
    'q': ['9*', ')n', 'xA'],   'Q': ['*9', 'n)', 'Ax'],
    'x': ['9D', 'gD', 'Aw'],   'x': ['Dg', 'D9', 'Wa'],

    // Sayılar tamamen harf+sembol kombinasyonu
    '0': ['O$', 'Q%', 'Ø&'],
    '1': ['I*', 'L#', 'Ɩ@'],
    '2': ['Z&', 'Ƶ$', 'Ȝ%'],
    '3': ['E^', 'ξ@', 'ℯ!'],
    '4': ['A%', 'Δ#', 'Λ!'],
    '5': ['S$', '§#', 'ϛ!'],
    '6': ['G^', 'Ǥ%', 'б#'],
    '7': ['T$', 'Γ@', 'Ŧ!'],
    '8': ['B%', 'β$', 'ȣ!'],
    '9': ['P@', 'ρ$', '९&'],

    // Boşlukları daha görünmez şekilde karıştır
    ' ': [' ', ' ', ' '] // farklı Unicode boşluk karakterleri
};


// Çözme tablosu
const cozumTablosu = {};
for (let harf in cevirTablosu) {
    for (let sembol of cevirTablosu[harf]) {
        cozumTablosu[sembol] = harf;
    }
}

// Rastgele seçim
function rastgeleSec(liste) {
    return liste[Math.floor(Math.random() * liste.length)];
}

// Şifreleme
function sifrele() {
    const giris = document.getElementById("input").value;
    if (giris.length > MAX_CHARS) {
        alert(`⚠️ En fazla ${MAX_CHARS} karakter girebilirsin!`);
        return;
    }

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

// Çözme
function coz() {
    const giris = document.getElementById("input").value;
    if (giris.length > MAX_CHARS * 3) {
        alert(`⚠️ Şifre çok uzun! Maksimum çözme uzunluğu: ${MAX_CHARS * 3} karakter`);
        return;
    }

    let sonuc = "";
    for (let i = 0; i < giris.length;) {
        let iki = giris.slice(i, i + 2);
        if (cozumTablosu[iki]) {
            sonuc += cozumTablosu[iki];
            i += 2;
        } else {
            sonuc += giris[i];
            i++;
        }
    }
    document.getElementById("output").value = sonuc;
}
