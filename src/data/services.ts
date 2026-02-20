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
    name: 'Allenamento Funzionale',
    slug: 'functional',
    category: 'functional',
    shortDescription: 'Allenamento funzionale per migliorare la qualità dei movimenti quotidiani.',
    duration: 50,
    price: 30,
    image: '/images/studio-functional-area.jpg',
    pricingModes: [
      {
        name: 'Small Group',
        description: '3 persone max · prezzo a persona',
        singlePrice: 30,
        packages: [
          { sessions: 12, totalPrice: 336, validity: '3 mesi' },
          { sessions: 24, totalPrice: 624, validity: '6 mesi', badge: 'Miglior Valore' },
          { sessions: 48, totalPrice: 1152, validity: '12 mesi' },
        ],
      },
    ],
  },
  {
    id: '3',
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
  functional: {
    fullDescription: `Il Functional Training, o allenamento funzionale, si basa su esercizi che mimano i movimenti naturali del corpo umano.
    L'obiettivo è migliorare la capacità di svolgere le attività quotidiane in modo più efficiente e sicuro.

    Utilizziamo attrezzi come kettlebell, TRX, palle mediche e il peso corporeo per creare workout dinamici che sviluppano forza, coordinazione, equilibrio e resistenza in modo integrato.`,
    benefits: [
      'Sviluppo di forza funzionale applicabile nella vita quotidiana',
      'Miglioramento della coordinazione e dell\'equilibrio',
      'Aumento della resistenza cardiovascolare',
      'Prevenzione degli infortuni',
      'Miglioramento delle performance sportive',
      'Accelerazione del metabolismo',
    ],
    targetAudience: 'Ideale per chi vuole un allenamento dinamico e completo, per atleti che vogliono migliorare le loro performance, e per chiunque desideri sentirsi più forte e agile nelle attività quotidiane.',
    methodology: [
      'Assessment iniziale delle capacità motorie',
      'Workout personalizzati in base agli obiettivi',
      'Varietà di esercizi per stimolare il corpo a 360 gradi',
      'Monitoraggio dei progressi e adattamento del programma',
    ],
    faq: [
      {
        question: 'È un allenamento intenso?',
        answer: 'L\'intensità viene sempre adattata al tuo livello. Inizieremo con un approccio graduale per poi aumentare progressivamente la difficoltà man mano che migliori.',
      },
      {
        question: 'Posso praticarlo se ho problemi alle articolazioni?',
        answer: 'Sì, gli esercizi possono essere modificati per adattarsi a qualsiasi condizione. È importante comunicarci eventuali problemi durante la valutazione iniziale.',
      },
      {
        question: 'Quali risultati posso aspettarmi?',
        answer: 'Con costanza, noterai miglioramenti nella forza, nell\'energia quotidiana e nella composizione corporea già dopo 4-6 settimane.',
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
        answer: 'Certamente! Molti dei nostri clienti integrano sessioni di Personal Training con lezioni di Pilates o Functional Training per un approccio più completo.',
      },
    ],
  },
}
