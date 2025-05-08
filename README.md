# ARMA CONTACT - Applicazione Calcolo Compensi

Questa applicazione web consente di calcolare i compensi degli operatori telefonici di ARMA CONTACT in base al piano compensi con decorrenza 1/03/2025.

## Caratteristiche

- Accesso protetto da username e password
- Calcolo automatico dei compensi in base alle fasce di contratti raggiunti
- Gestione dei turni di lavoro (3 ore o 4 ore)
- Calcolo provvigioni e bonus target in base alle fasce di contratti
- Stampa del report dettagliato dei compensi
- Interfaccia responsive (adattabile a dispositivi mobili e desktop)

## Credenziali di accesso

L'applicazione è attualmente configurata con le seguenti credenziali di accesso:

- **Amministratore**: 
  - Username: admin
  - Password: admin123

- **Utente standard**: 
  - Username: user
  - Password: user123

## Struttura dei file

- `index.html` - Pagina di login
- `dashboard.html` - Pagina principale con form per il calcolo compensi
- `auth.js` - Gestione dell'autenticazione
- `compensi.js` - Logica di calcolo dei compensi
- `styles.css` - Stili personalizzati
- `logo.png` - Logo dell'azienda

## Piano Compensi

L'applicazione implementa il piano compensi ARMA CONTACT con decorrenza 1/03/2025, che prevede:

### Turni lavorativi
- **TURNO DI 3 ORE**: 9:20-12:20
- **TURNO DI 4 ORE**: 9:20-13:20

### Fasce di compenso

- **FASCIA 1**: Fino a 16 contratti chiusi - Paga oraria: €5,00 - Provvigione: €4,00
- **FASCIA 2**: Tra 17 e 26 contratti chiusi - Paga oraria: €6,00 - Provvigione: €5,00 - Bonus target: €2,00
- **FASCIA 3**: Tra 27 e 34 contratti chiusi - Paga oraria: €7,50 - Provvigione: €7,00 - Bonus target: €5,00
- **FASCIA 4**: Oltre 34 contratti chiusi - Paga oraria: €7,50 - Provvigione: €7,00 - Bonus target: €7,00

### Extra bonus

- **Extra bonus 50 contratti**: Una tantum €300,00

### Note

- Il bonus target si applica solo ai contratti specificati come "Contratti con Bonus Target"
- Pagamento: Entro il giorno 10/15 del mese successivo a quello lavorato

## Come utilizzare l'applicazione

1. Aprire il file `index.html` in un browser web
2. Inserire le credenziali di accesso
3. Compilare il form con i dati dell'operatore:
   - Nome operatore
   - Mese lavorato
   - Turni lavorati (3 ore, 4 ore o entrambi)
   - Ore lavorate per ciascun turno
   - Contratti chiusi
   - Contratti con Bonus Target
4. Fare clic sul pulsante "Calcola Compenso"
5. Visualizzare il risultato del calcolo
6. Utilizzare il pulsante "Stampa" per stampare il report o salvarlo come PDF

## Deploy online

Per pubblicare l'applicazione online, ci sono diverse opzioni disponibili:

### 1. GitHub Pages (Soluzione gratuita)

1. Creare un repository su GitHub
2. Caricare tutti i file dell'applicazione
3. Abilitare GitHub Pages dalle impostazioni del repository
4. L'applicazione sarà accessibile all'indirizzo `https://<username>.github.io/<repo-name>/`

### 2. Netlify (Soluzione gratuita con funzionalità avanzate)

1. Registrarsi su Netlify (https://www.netlify.com/)
2. Trascinare e rilasciare la cartella del progetto nella dashboard di Netlify
3. L'applicazione sarà accessibile a un URL generato automaticamente
4. Opzionalmente, configurare un dominio personalizzato

### 3. Vercel (Soluzione gratuita con funzionalità avanzate)

1. Registrarsi su Vercel (https://vercel.com/)
2. Collegare il repository GitHub o caricare direttamente i file
3. Vercel distribuirà automaticamente l'applicazione

## Considerazioni sulla sicurezza

L'applicazione attualmente utilizza un sistema di autenticazione client-side, che è adatto solo per demo o ambienti con requisiti di sicurezza minimi. Per un ambiente di produzione, si consiglia di:

1. Implementare un backend per la gestione dell'autenticazione
2. Archiviare i dati degli utenti in modo sicuro su un database
3. Utilizzare HTTPS per proteggere i dati in transito
4. Implementare un sistema di gestione delle sessioni

## Migliorie future

L'applicazione potrebbe essere ulteriormente migliorata con:

1. Implementazione di un database per salvare lo storico dei calcoli
2. Aggiunta di un pannello di amministrazione per gestire gli utenti
3. Funzionalità di esportazione dei dati in Excel
4. Report statistici per analizzare le performance degli operatori
5. Integrazione con sistemi di gestione aziendale esistenti

## Requisiti tecnici

L'applicazione utilizza:

- HTML5
- CSS3 con Tailwind CSS
- JavaScript
- jsPDF e html2canvas per la generazione dei PDF

Non è necessario un server web per utilizzare l'applicazione in locale, ma è consigliato utilizzare un browser moderno e aggiornato.

## Licenza

Questa applicazione è proprietaria e destinata all'uso esclusivo da parte di ARMA CONTACT.
