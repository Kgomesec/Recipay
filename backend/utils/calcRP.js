function calcRP(material, quantity) {
    let base = 0;

    switch (material) {
        case "plastico": base = 20; break;
        case "vidro": base = 25; break;
        case "metal": base = 40; break;
        case "papel": base = 15; break;
        default: base = 0;
    }

    const mult = {
        pequeno: 1,
        medio: 2.5,
        grande: 5
    };

    const m = mult[quantity] ?? 1;
    return Math.floor(base * m);
}

module.exports = calcRP;
