// Logica di calcolo dei compensi

// Definizione delle fasce di compenso
const FASCE = [
    { id: 1, min: 0, max: 16, pagaOraria: 5.00, provvigione: 4.00, bonus: 0.00 },
    { id: 2, min: 17, max: 26, pagaOraria: 6.00, provvigione: 5.00, bonus: 2.00 },
    { id: 3, min: 27, max: 34, pagaOraria: 7.50, provvigione: 7.00, bonus: 5.00 },
    { id: 4, min: 35, max: Infinity, pagaOraria: 7.50, provvigione: 7.00, bonus: 7.00 }
];

// Variabili per i turni
const TURNO_3_ORE = { nome: "3 ORE", inizio: '09:20', fine: '12:20' };
const TURNO_4_ORE = { nome: "4 ORE", inizio: '09:20', fine: '13:20' };

// Funzione per determinare la fascia in base ai contratti
function determinaFascia(contratti) {
    for (const fascia of FASCE) {
        if (contratti >= fascia.min && contratti <= fascia.max) {
            return fascia;
        }
    }
    return FASCE[0]; // Default alla prima fascia in caso di errore
}

// Funzione per formattare gli importi in Euro
function formatoEuro(importo) {
    return '€ ' + importo.toFixed(2).replace('.', ',');
}

// Gestione del form dei compensi
function gestisciFormCompensi() {
    const compensiForm = document.getElementById('compensiForm');
    if (!compensiForm) return;
    
    // Gestione visualizzazione campi ore in base ai turni selezionati
    const turno3OreCheck = document.getElementById('turno3OreCheck');
    const turno4OreCheck = document.getElementById('turno4OreCheck');
    const oreTurno3OreContainer = document.getElementById('oreTurno3OreContainer');
    const oreTurno4OreContainer = document.getElementById('oreTurno4OreContainer');
    
    // Funzione per validare la selezione dei turni
    function validaTurni() {
        // Controlla che almeno un turno sia selezionato
        if (!turno3OreCheck.checked && !turno4OreCheck.checked) {
            alert('Seleziona almeno un turno!');
            return false;
        }
        
        return true;
    }
    
    // Event listeners per i checkbox dei turni
    turno3OreCheck.addEventListener('change', function() {
        if (this.checked) {
            oreTurno3OreContainer.classList.remove('hidden');
            document.getElementById('oreTurno3Ore').setAttribute('required', '');
        } else {
            oreTurno3OreContainer.classList.add('hidden');
            document.getElementById('oreTurno3Ore').removeAttribute('required');
            document.getElementById('oreTurno3Ore').value = '';
        }
    });
    
    turno4OreCheck.addEventListener('change', function() {
        if (this.checked) {
            oreTurno4OreContainer.classList.remove('hidden');
            document.getElementById('oreTurno4Ore').setAttribute('required', '');
        } else {
            oreTurno4OreContainer.classList.add('hidden');
            document.getElementById('oreTurno4Ore').removeAttribute('required');
            document.getElementById('oreTurno4Ore').value = '';
        }
    });
    
    // Gestione invio del form
    compensiForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valida la selezione dei turni
        if (!validaTurni()) {
            return;
        }
        
        // Raccolta dati dal form
        const dati = {
            nomeOperatore: document.getElementById('nomeOperatore').value,
            meseLavorato: document.getElementById('meseLavorato').value,
            turno3Ore: document.getElementById('turno3OreCheck').checked,
            turno4Ore: document.getElementById('turno4OreCheck').checked,
            oreTurno3Ore: parseInt(document.getElementById('oreTurno3Ore').value) || 0,
            oreTurno4Ore: parseInt(document.getElementById('oreTurno4Ore').value) || 0,
            contrattiChiusi: parseInt(document.getElementById('contrattiChiusi').value) || 0,
            contrattiBonus: parseInt(document.getElementById('contrattiBonus').value) || 0
        };
        
        // Calcolo del compenso
        const risultato = calcolaCompenso(dati);
        
        // Visualizzazione del risultato
        visualizzaRisultato(dati, risultato);
    });
}

// Funzione per il calcolo del compenso
function calcolaCompenso(dati) {
    const risultato = {
        fascia1: null, // Fascia per il turno 3 ore
        fascia2: null, // Fascia per il turno 4 ore
        compensoOrario3Ore: 0,
        compensoOrario4Ore: 0,
        totaleProvvigioni3Ore: 0,
        totaleProvvigioni4Ore: 0,
        totaleBonus3Ore: 0,
        totaleBonus4Ore: 0,
        extraBonus3Ore: 0,
        extraBonus4Ore: 0,
        subtotale3Ore: 0,
        subtotale4Ore: 0,
        totaleCompenso: 0
    };
    
    // Calcolo del totale contratti validi per la fascia
    const totaleContratti = dati.contrattiChiusi;
    
    // Determinazione della fascia in base ai contratti
    const fascia = determinaFascia(totaleContratti);
    
    // Calcolo per turno 3 ore
    if (dati.turno3Ore) {
        risultato.fascia1 = fascia;
        risultato.compensoOrario3Ore = dati.oreTurno3Ore * fascia.pagaOraria;
        risultato.totaleProvvigioni3Ore = dati.contrattiChiusi * fascia.provvigione;
        risultato.totaleBonus3Ore = dati.contrattiBonus * fascia.bonus;
        
        // Extra bonus 50+ contratti (se applicabile)
        if (dati.contrattiChiusi >= 50) {
            risultato.extraBonus3Ore = 300.00;
        }
        
        // Subtotale 3 ore
        risultato.subtotale3Ore = 
            risultato.compensoOrario3Ore + 
            risultato.totaleProvvigioni3Ore + 
            risultato.totaleBonus3Ore + 
            risultato.extraBonus3Ore;
    }
    
    // Calcolo per turno 4 ore
    if (dati.turno4Ore) {
        risultato.fascia2 = fascia;
        risultato.compensoOrario4Ore = dati.oreTurno4Ore * fascia.pagaOraria;
        risultato.totaleProvvigioni4Ore = dati.contrattiChiusi * fascia.provvigione;
        risultato.totaleBonus4Ore = dati.contrattiBonus * fascia.bonus;
        
        // Extra bonus 50+ contratti (se applicabile)
        if (dati.contrattiChiusi >= 50) {
            risultato.extraBonus4Ore = 300.00;
        }
        
        // Subtotale 4 ore
        risultato.subtotale4Ore = 
            risultato.compensoOrario4Ore + 
            risultato.totaleProvvigioni4Ore + 
            risultato.totaleBonus4Ore + 
            risultato.extraBonus4Ore;
    }
    
    // Calcolo del totale compenso
    risultato.totaleCompenso = 
        risultato.subtotale3Ore + 
        risultato.subtotale4Ore;
    
    return risultato;
}

// Funzione per visualizzare il risultato
function visualizzaRisultato(dati, risultato) {
    // Gestione sezioni del risultato
    const risultatoContainer = document.getElementById('risultatoContainer');
    const risultatoCalcolo = document.getElementById('risultatoCalcolo');
    const risultatoOreTurno3OreRow = document.getElementById('risultatoOreTurno3OreRow');
    const risultatoOreTurno4OreRow = document.getElementById('risultatoOreTurno4OreRow');
    const dettaglioCompensi3Ore = document.getElementById('dettaglioCompensi3Ore');
    const dettaglioCompensi4Ore = document.getElementById('dettaglioCompensi4Ore');
    const risultatoExtraBonusRow3Ore = document.getElementById('risultatoExtraBonusRow3Ore');
    const risultatoExtraBonusRow4Ore = document.getElementById('risultatoExtraBonusRow4Ore');
    
    // Mostra il container del risultato
    risultatoContainer.classList.remove('hidden');
    
    // Nascondi il form
    document.getElementById('compensiForm').parentElement.classList.add('hidden');
    
    // Compila i dati del risultato
    
    // Data e mese lavorato
    const oggi = new Date();
    document.getElementById('risultatoData').textContent = oggi.toLocaleDateString('it-IT');
    
    // Formatta il mese lavorato (da YYYY-MM a testo)
    const [anno, mese] = dati.meseLavorato.split('-');
    const nomeMese = new Date(anno, parseInt(mese) - 1, 1).toLocaleString('it-IT', { month: 'long' });
    document.getElementById('risultatoMeseLavorato').textContent = `Mese lavorato: ${nomeMese} ${anno}`;
    
    // Dati operatore
    document.getElementById('risultatoNome').textContent = dati.nomeOperatore;
    
    // Riepilogo attività
    // Mostra/nascondi righe ore turni in base ai turni selezionati
    if (dati.turno3Ore) {
        risultatoOreTurno3OreRow.classList.remove('hidden');
        document.getElementById('risultatoOreTurno3Ore').textContent = dati.oreTurno3Ore;
    } else {
        risultatoOreTurno3OreRow.classList.add('hidden');
    }
    
    if (dati.turno4Ore) {
        risultatoOreTurno4OreRow.classList.remove('hidden');
        document.getElementById('risultatoOreTurno4Ore').textContent = dati.oreTurno4Ore;
    } else {
        risultatoOreTurno4OreRow.classList.add('hidden');
    }
    
    document.getElementById('risultatoContrattiChiusi').textContent = dati.contrattiChiusi;
    document.getElementById('risultatoContrattiBonus').textContent = dati.contrattiBonus;
    
    // Fascia raggiunta
    document.getElementById('risultatoFascia').textContent = `FASCIA ${risultato.fascia1 ? risultato.fascia1.id : (risultato.fascia2 ? risultato.fascia2.id : 1)}`;
    document.getElementById('risultatoFascia').className = `px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-primary`;
    
    // Dettaglio compensi - Gestione sezioni 3 ore e 4 ore
    if (dati.turno3Ore) {
        // Mostra dettaglio 3 ore
        dettaglioCompensi3Ore.classList.remove('hidden');
        
        // Compila dettaglio 3 ore
        document.getElementById('risultatoTariffaOraria3Ore').textContent = formatoEuro(risultato.fascia1.pagaOraria);
        document.getElementById('risultatoOre3Ore').textContent = dati.oreTurno3Ore;
        document.getElementById('risultatoCompensoOrario3Ore').textContent = formatoEuro(risultato.compensoOrario3Ore);
        
        document.getElementById('risultatoTariffaProvvigione3Ore').textContent = formatoEuro(risultato.fascia1.provvigione);
        document.getElementById('risultatoContrattiProvvigione3Ore').textContent = dati.contrattiChiusi;
        document.getElementById('risultatoTotaleProvvigioni3Ore').textContent = formatoEuro(risultato.totaleProvvigioni3Ore);
        
        document.getElementById('risultatoTariffaBonus3Ore').textContent = formatoEuro(risultato.fascia1.bonus);
        document.getElementById('risultatoContrattiBonus3Ore').textContent = dati.contrattiBonus;
        document.getElementById('risultatoTotaleBonus3Ore').textContent = formatoEuro(risultato.totaleBonus3Ore);
        
        // Extra bonus 3 ore
        if (risultato.extraBonus3Ore > 0) {
            risultatoExtraBonusRow3Ore.classList.remove('hidden');
            document.getElementById('risultatoExtraBonus3Ore').textContent = formatoEuro(risultato.extraBonus3Ore);
        } else {
            risultatoExtraBonusRow3Ore.classList.add('hidden');
        }
        
        // Subtotale 3 ore
        document.getElementById('risultatoSubtotale3Ore').textContent = formatoEuro(risultato.subtotale3Ore);
    } else {
        // Nascondi dettaglio 3 ore
        dettaglioCompensi3Ore.classList.add('hidden');
    }
    
    if (dati.turno4Ore) {
        // Mostra dettaglio 4 ore
        dettaglioCompensi4Ore.classList.remove('hidden');
        
        // Compila dettaglio 4 ore
        document.getElementById('risultatoTariffaOraria4Ore').textContent = formatoEuro(risultato.fascia2.pagaOraria);
        document.getElementById('risultatoOre4Ore').textContent = dati.oreTurno4Ore;
        document.getElementById('risultatoCompensoOrario4Ore').textContent = formatoEuro(risultato.compensoOrario4Ore);
        
        document.getElementById('risultatoTariffaProvvigione4Ore').textContent = formatoEuro(risultato.fascia2.provvigione);
        document.getElementById('risultatoContrattiProvvigione4Ore').textContent = dati.contrattiChiusi;
        document.getElementById('risultatoTotaleProvvigioni4Ore').textContent = formatoEuro(risultato.totaleProvvigioni4Ore);
        
        document.getElementById('risultatoTariffaBonus4Ore').textContent = formatoEuro(risultato.fascia2.bonus);
        document.getElementById('risultatoContrattiBonus4Ore').textContent = dati.contrattiBonus;
        document.getElementById('risultatoTotaleBonus4Ore').textContent = formatoEuro(risultato.totaleBonus4Ore);
        
        // Extra bonus 4 ore
        if (risultato.extraBonus4Ore > 0) {
            risultatoExtraBonusRow4Ore.classList.remove('hidden');
            document.getElementById('risultatoExtraBonus4Ore').textContent = formatoEuro(risultato.extraBonus4Ore);
        } else {
            risultatoExtraBonusRow4Ore.classList.add('hidden');
        }
        
        // Subtotale 4 ore
        document.getElementById('risultatoSubtotale4Ore').textContent = formatoEuro(risultato.subtotale4Ore);
    } else {
        // Nascondi dettaglio 4 ore
        dettaglioCompensi4Ore.classList.add('hidden');
    }
    
    // Totale compenso
    document.getElementById('risultatoTotaleCompenso').textContent = formatoEuro(risultato.totaleCompenso);
}

// Gestione pulsante di stampa
function gestisciStampa() {
    const printBtn = document.getElementById('printBtn');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// Gestione pulsante indietro
function gestisciIndietro() {
    const backBtn = document.getElementById('backBtn');
    if (!backBtn) return;
    
    backBtn.addEventListener('click', function() {
        // Mostra il form
        document.getElementById('compensiForm').parentElement.classList.remove('hidden');
        
        // Nascondi il risultato
        document.getElementById('risultatoContainer').classList.add('hidden');
    });
}

// Funzione per gestire il pulsante nuovo calcolo
function gestisciNuovoCalcolo() {
    const newCalcBtn = document.getElementById('newCalcBtn');
    if (!newCalcBtn) return;
    
    newCalcBtn.addEventListener('click', function() {
        // Reset del form
        document.getElementById('compensiForm').reset();
        
        // Nascondi i contenitori delle ore
        document.getElementById('oreTurno3OreContainer').classList.add('hidden');
        document.getElementById('oreTurno4OreContainer').classList.add('hidden');
        
        // Rimuovi gli attributi required
        document.getElementById('oreTurno3Ore').removeAttribute('required');
        document.getElementById('oreTurno4Ore').removeAttribute('required');
        
        // Mostra il form
        document.getElementById('compensiForm').parentElement.classList.remove('hidden');
        
        // Nascondi il risultato
        document.getElementById('risultatoContainer').classList.add('hidden');
    });
}

// Inizializzazione delle funzioni
document.addEventListener('DOMContentLoaded', function() {
    gestisciFormCompensi();
    gestisciStampa();
    gestisciIndietro();
    gestisciNuovoCalcolo();
});
