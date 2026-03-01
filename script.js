let listePeseesTemporaire = []; 
let totalGeneralRecette = 0;

function ajouterUnePesee() {
    var inputPoids = document.getElementById('poidsPesee');
    var valeur = parseFloat(inputPoids.value);
    
    if (valeur > 0) {
        listePeseesTemporaire.push(valeur);
        
        var cumulBrut = 0;
        for (var i = 0; i < listePeseesTemporaire.length; i++) {
            cumulBrut += listePeseesTemporaire[i];
        }
        
        // On affiche le cumul et la liste des poids saisis (pour la transparence)
        document.getElementById('infoPesee').innerHTML = 
            '<b>Cumul : ' + cumulBrut.toFixed(2) + ' kg</b><br>' +
            '<small>Détail : ' + listePeseesTemporaire.join(' + ') + '</small>';
        
        inputPoids.value = '';
        inputPoids.focus();
    } else {
        alert('Entre un poids valide');
    }
}

function finaliserRecolte() {
    var culture = document.getElementById('culture').value;
    var nbSacs = parseInt(document.getElementById('nbSacs').value) || 0;
    var prixKilo = {'Cacao': 1500, 'Café': 900, 'Anacarde': 300, 'Hévéa': 350};

    var totalBrut = 0;
    for (var j = 0; j < listePeseesTemporaire.length; j++) {
        totalBrut += listePeseesTemporaire[j];
    }

    if (listePeseesTemporaire.length > 0 && totalBrut > nbSacs) {
        var poidsNet = totalBrut - nbSacs;
        var gainVente = poidsNet * prixKilo[culture];
        
        // Sauvegarde du détail des pesées avant de vider la liste
        var detailPesages = listePeseesTemporaire.join('kg + ') + 'kg';

        totalGeneralRecette += gainVente;
        document.getElementById('total-revenu').innerText = totalGeneralRecette.toLocaleString() + ' FCFA';

        var historique = document.getElementById('liste-recoltes');
        var li = document.createElement('li');
        li.style.padding = "10px";
        li.style.borderLeft = "5px solid #2e7d32";
        li.style.marginBottom = "10px";
        li.style.background = "#f9f9f9";

        // AFFICHAGE TRANSPARENT (Détail pesées + Tare sac)
        li.innerHTML = 
            '<b>📦 ' + culture.toUpperCase() + '</b><br>' +
            '<small>Pesages : ' + detailPesages + ' = <b>' + totalBrut.toFixed(2) + 'kg brut</b></small><br>' +
            '<span style="color:red;">Sac (Tare) : -' + nbSacs + ' kg</span><br>' +
            '<b>Poids Net : ' + poidsNet.toFixed(2) + ' kg</b><br>' +
            '<span style="color:green; font-size:1.1rem;">Gain : ' + gainVente.toLocaleString() + ' FCFA</span>';
        
        historique.prepend(li);

        // Remise à zéro
        listePeseesTemporaire = [];
        document.getElementById('nbSacs').value = '';
        document.getElementById('infoPesee').innerText = 'Total cumulé : 0 kg (0 pesées)';
    } else {
        alert('Vérifie tes pesées et le nombre de sacs');
    }
}