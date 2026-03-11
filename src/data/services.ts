import type { Service, ServiceDetails } from './types'

export const services: Service[] = [
  {
    id: '1',
    name: 'Pilates Reformer',
    slug: 'pilates',
    category: 'pilates',
    shortDescription: 'Migliora postura, flessibilità e forza del core attraverso movimenti controllati e consapevoli.',
    duration: 55,
    price: 45,
    image: '/images/reformer-gruppo-1.jpg',
    pricingModes: [
      {
        name: 'One to One',
        singlePrice: 80,
        packages: [
          { sessions: 4, totalPrice: 280, validity: '30 giorni' },
          { sessions: 12, totalPrice: 720, validity: '3 mesi', badge: 'Consigliato' },
          { sessions: 24, totalPrice: 1320, validity: '6 mesi' },
        ],
      },
      {
        name: 'Coppia',
        description: 'prezzo a persona',
        singlePrice: 55,
        packages: [
          { sessions: 4, totalPrice: 200, validity: '30 giorni' },
          { sessions: 12, totalPrice: 540, validity: '3 mesi', badge: 'Consigliato' },
          { sessions: 24, totalPrice: 960, validity: '6 mesi' },
        ],
      },
      {
        name: 'Small Group',
        description: '3 persone · prezzo a persona',
        singlePrice: 45,
        packages: [
          { sessions: 4, totalPrice: 160, validity: '30 giorni' },
          { sessions: 12, totalPrice: 420, validity: '3 mesi', badge: 'Consigliato' },
          { sessions: 24, totalPrice: 720, validity: '6 mesi' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Personal Training',
    slug: 'personal',
    category: 'personal',
    shortDescription: 'Sessioni individuali personalizzate per raggiungere i tuoi obiettivi specifici.',
    duration: 60,
    price: 40,
    image: '/images/personal-training-1.jpg',
    pricingModes: [
      {
        name: 'Individuale',
        singlePrice: 55,
        packages: [
          { sessions: 12, totalPrice: 630, validity: '3 mesi' },
          { sessions: 24, totalPrice: 1200, validity: '6 mesi', badge: 'Miglior Valore' },
          { sessions: 48, totalPrice: 2160, validity: '12 mesi' },
        ],
      },
      {
        name: 'Coppia',
        description: 'prezzo a persona',
        singlePrice: 40,
        packages: [
          { sessions: 12, totalPrice: 456, validity: '3 mesi' },
          { sessions: 24, totalPrice: 864, validity: '6 mesi', badge: 'Miglior Valore' },
          { sessions: 48, totalPrice: 1632, validity: '12 mesi' },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Kinè Method',
    slug: 'kine-method',
    category: 'method',
    shortDescription: 'KINÈ METHOD è il metodo proprietario di KinèLab che integra forza in sala funzionale e controllo sul Reformer. Un percorso strutturato che unisce performance fisica, qualità del movimento e progressione tecnica.',
    duration: 55,
    price: 30,
    image: '/images/studio-functional-area.jpg',
    programs: [
      {
        name: 'KINÈ HYBRID GROUP',
        description: 'Allenamento funzionale in small group (2/3 persone) e lavoro su Reformer. Percorso condiviso, sempre guidato dal trainer, con forte attenzione tecnica e progressione strutturata.',
        format: 'Small Group (2/3 persone) + Reformer',
        plans: [
          { duration: '3 mesi', monthlyPrice: 270, perSession: 34, badge: 'Consigliato' },
          { duration: '6 mesi', monthlyPrice: 255, perSession: 32 },
          { duration: '12 mesi', monthlyPrice: 240, perSession: 30, badge: 'Miglior Valore' },
        ],
      },
      {
        name: 'KINÈ HYBRID PRO',
        description: 'Personal Training individuale in sala funzionale e Reformer. Percorso completamente personalizzato, livello più esclusivo, programmazione mirata sugli obiettivi.',
        format: 'Individuale + Reformer One to One',
        plans: [
          { duration: '3 mesi', monthlyPrice: 340, perSession: 43 },
          { duration: '6 mesi', monthlyPrice: 325, perSession: 41, badge: 'Miglior Valore' },
          { duration: '12 mesi', monthlyPrice: 300, perSession: 38 },
        ],
      },
    ],
  },
]

export const serviceDetails: Record<string, ServiceDetails> = {
  pilates: {
    fullDescription: `Il Pilates è un sistema di allenamento sviluppato all'inizio del XX secolo da Joseph Pilates.
    Questo metodo si concentra sulla connessione tra mente e corpo, utilizzando movimenti controllati e precisi per sviluppare la forza del core, migliorare la postura e aumentare la flessibilità.

    Presso KinèLab, offriamo sia lezioni di Pilates Mat (a corpo libero) che sessioni con attrezzi professionali come il Reformer. Ogni lezione è progettata per adattarsi al tuo livello, che tu sia un principiante o un praticante avanzato.`,
    benefits: [
      'Miglioramento della postura e allineamento corporeo',
      'Rinforzo dei muscoli profondi del core',
      'Aumento della flessibilità e mobilità articolare',
      'Riduzione del mal di schiena e tensioni muscolari',
      'Miglioramento della consapevolezza corporea',
      'Riduzione dello stress e aumento del benessere mentale',
    ],
    targetAudience: 'Il Pilates è adatto a tutti, indipendentemente dall\'età o dal livello di forma fisica. È particolarmente indicato per chi cerca un allenamento a basso impatto ma efficace, per chi vuole migliorare la postura o recuperare da infortuni.',
    methodology: [
      'Valutazione posturale iniziale',
      'Programma personalizzato in base ai tuoi obiettivi',
      'Progressione graduale della difficoltà',
      'Correzioni continue per massimizzare i risultati',
    ],
    faq: [
      {
        question: 'Devo avere esperienza per iniziare?',
        answer: 'Assolutamente no! Le nostre lezioni sono strutturate per accogliere tutti i livelli, dai principianti assoluti ai praticanti avanzati.',
      },
      {
        question: 'Qual è la differenza tra Mat e Reformer?',
        answer: 'Il Pilates Mat si svolge a corpo libero sul tappetino, mentre il Reformer utilizza un attrezzo specifico con molle e resistenze che permettono esercizi più variegati e assistiti.',
      },
      {
        question: 'Ogni quanto dovrei praticare?',
        answer: 'Per risultati ottimali consigliamo 2-3 sessioni settimanali. Tuttavia, anche una sola lezione a settimana può portare benefici significativi.',
      },
    ],
  },
  personal: {
    fullDescription: `Il Personal Training rappresenta il massimo della personalizzazione nel fitness.
    Un trainer certificato lavora esclusivamente con te, creando un percorso su misura basato sui tuoi obiettivi, condizioni fisiche, preferenze e disponibilità.

    Che tu voglia perdere peso, aumentare la massa muscolare, prepararti per un evento sportivo o semplicemente migliorare il tuo benessere generale, il Personal Training ti offre la strada più diretta verso il successo.`,
    benefits: [
      'Programma completamente personalizzato',
      'Attenzione dedicata al 100%',
      'Correzione immediata della tecnica',
      'Flessibilità negli orari',
      'Motivazione costante',
      'Risultati più rapidi e duraturi',
    ],
    targetAudience: 'Perfetto per chi ha obiettivi specifici da raggiungere, poco tempo a disposizione, necessità di un approccio personalizzato per condizioni particolari, o semplicemente preferisce l\'attenzione esclusiva di un professionista.',
    methodology: [
      'Colloquio approfondito per comprendere obiettivi e storia',
      'Valutazione fisica completa (postura, mobilità, forza)',
      'Creazione di un programma personalizzato',
      'Sessioni individuali con feedback continuo',
      'Revisione periodica e aggiustamento del programma',
    ],
    faq: [
      {
        question: 'Quanto costa una sessione di Personal Training?',
        answer: 'Le sessioni individuali partono da 55 euro, in coppia da 40 euro a persona. Offriamo pacchetti da 12, 24 e 48 lezioni con sconti progressivi. Contattaci per un preventivo personalizzato.',
      },
      {
        question: 'Quanto dura una sessione?',
        answer: 'Le sessioni standard durano 60 minuti, ma possiamo adattare la durata alle tue esigenze.',
      },
      {
        question: 'Posso combinare il Personal Training con altre discipline?',
        answer: 'Certamente! Il nostro Kinè Method integra proprio Personal Training e Pilates Reformer in un unico percorso strutturato.',
      },
    ],
  },
  method: {
    fullDescription: `KINÈ METHOD è il metodo proprietario di KinèLab che integra forza in sala funzionale e controllo e tecnica sul Reformer.

    Non si tratta di un semplice abbonamento combinato, ma di un percorso strutturato che unisce performance fisica, qualità del movimento e progressione tecnica.

    All'interno del KINÈ METHOD si sviluppa il percorso KINÈ HYBRID: 2 allenamenti a settimana, 8 sedute mensili, con pagamento mensile anticipato e vincolo minimo in base alla durata scelta. Due programmi — KINÈ HYBRID GROUP e KINÈ HYBRID PRO — per adattarsi al tuo livello e ai tuoi obiettivi.`,
    benefits: [
      'Unione di forza e controllo in un unico percorso',
      'Sviluppo muscolare equilibrato e funzionale',
      'Miglioramento della mobilità e della postura',
      'Prevenzione degli infortuni grazie al lavoro integrato',
      'Percorso strutturato con progressione misurabile',
      'Maggiore motivazione grazie alla varietà degli stimoli',
    ],
    targetAudience: 'Ideale per chi vuole un percorso completo e strutturato, per chi cerca varietà nell\'allenamento senza rinunciare alla qualità, e per chi desidera risultati visibili combinando forza e controllo in un unico metodo.',
    methodology: [
      'Assessment iniziale: forza, mobilità, postura',
      'Scelta del programma: HYBRID GROUP o HYBRID PRO',
      'Pianificazione settimanale: sessioni funzionale + Reformer',
      'Monitoraggio mensile dei progressi',
      'Adattamento continuo del programma in base ai risultati',
    ],
    faq: [
      {
        question: 'Cos\'è il KINÈ METHOD?',
        answer: 'È il metodo proprietario di KinèLab che integra forza in sala funzionale e controllo sul Reformer. Non è un semplice abbonamento combinato, ma un percorso strutturato orientato alla performance intelligente.',
      },
      {
        question: 'Qual è la differenza tra KINÈ HYBRID GROUP e KINÈ HYBRID PRO?',
        answer: 'La differenza riguarda il grado di personalizzazione e il rapporto trainer/cliente. GROUP prevede sessioni in small group (2/3 persone) con forte attenzione tecnica. PRO offre allenamento individuale (1:1) con programmazione completamente mirata sui tuoi obiettivi.',
      },
      {
        question: 'Come funziona il pagamento?',
        answer: 'Il pagamento è mensile e anticipato. Scegli il vincolo minimo (3, 6 o 12 mesi): più lungo il piano, maggiore il risparmio per sessione. HYBRID GROUP da €240 a €270/mese, HYBRID PRO da €300 a €340/mese.',
      },
      {
        question: 'Quante sessioni sono incluse al mese?',
        answer: 'Il percorso KINÈ HYBRID prevede 2 allenamenti a settimana, per un totale di 8 sedute mensili distribuite tra sala funzionale e Reformer.',
      },
    ],
  },
}
