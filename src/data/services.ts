import type { Service, ServiceDetails } from './types'

export const services: Service[] = [
  {
    id: '1',
    name: 'Pilates',
    slug: 'pilates',
    category: 'pilates',
    shortDescription: 'Migliora postura, flessibilita e forza del core attraverso movimenti controllati e consapevoli.',
    duration: 55,
    price: 50,
    image: '/images/reformer-gruppo-1.jpg',
  },
  {
    id: '2',
    name: 'Functional Training',
    slug: 'functional',
    category: 'functional',
    shortDescription: 'Allenamento funzionale per migliorare la qualita dei movimenti quotidiani.',
    duration: 50,
    price: 45,
    image: '/images/studio-functional-area.jpg',
  },
  {
    id: '3',
    name: 'Personal Training',
    slug: 'personal',
    category: 'personal',
    shortDescription: 'Sessioni individuali personalizzate per raggiungere i tuoi obiettivi specifici.',
    duration: 60,
    price: 70,
    image: '/images/personal-training-1.jpg',
  },
]

export const serviceDetails: Record<string, ServiceDetails> = {
  pilates: {
    fullDescription: `Il Pilates e un sistema di allenamento sviluppato all'inizio del XX secolo da Joseph Pilates.
    Questo metodo si concentra sulla connessione tra mente e corpo, utilizzando movimenti controllati e precisi per sviluppare la forza del core, migliorare la postura e aumentare la flessibilita.

    Presso KineLab, offriamo sia lezioni di Pilates Mat (a corpo libero) che sessioni con attrezzi professionali come il Reformer. Ogni lezione e progettata per adattarsi al tuo livello, che tu sia un principiante o un praticante avanzato.`,
    benefits: [
      'Miglioramento della postura e allineamento corporeo',
      'Rinforzo dei muscoli profondi del core',
      'Aumento della flessibilita e mobilita articolare',
      'Riduzione del mal di schiena e tensioni muscolari',
      'Miglioramento della consapevolezza corporea',
      'Riduzione dello stress e aumento del benessere mentale',
    ],
    targetAudience: 'Il Pilates e adatto a tutti, indipendentemente dall\'eta o dal livello di forma fisica. E particolarmente indicato per chi cerca un allenamento a basso impatto ma efficace, per chi vuole migliorare la postura o recuperare da infortuni.',
    methodology: [
      'Valutazione posturale iniziale',
      'Programma personalizzato in base ai tuoi obiettivi',
      'Progressione graduale della difficolta',
      'Correzioni continue per massimizzare i risultati',
    ],
    faq: [
      {
        question: 'Devo avere esperienza per iniziare?',
        answer: 'Assolutamente no! Le nostre lezioni sono strutturate per accogliere tutti i livelli, dai principianti assoluti ai praticanti avanzati.',
      },
      {
        question: 'Qual e la differenza tra Mat e Reformer?',
        answer: 'Il Pilates Mat si svolge a corpo libero sul tappetino, mentre il Reformer utilizza un attrezzo specifico con molle e resistenze che permettono esercizi piu variegati e assistiti.',
      },
      {
        question: 'Ogni quanto dovrei praticare?',
        answer: 'Per risultati ottimali consigliamo 2-3 sessioni settimanali. Tuttavia, anche una sola lezione a settimana puo portare benefici significativi.',
      },
    ],
  },
  functional: {
    fullDescription: `Il Functional Training, o allenamento funzionale, si basa su esercizi che mimano i movimenti naturali del corpo umano.
    L'obiettivo e migliorare la capacita di svolgere le attivita quotidiane in modo piu efficiente e sicuro.

    Utilizziamo attrezzi come kettlebell, TRX, palle mediche e il peso corporeo per creare workout dinamici che sviluppano forza, coordinazione, equilibrio e resistenza in modo integrato.`,
    benefits: [
      'Sviluppo di forza funzionale applicabile nella vita quotidiana',
      'Miglioramento della coordinazione e dell\'equilibrio',
      'Aumento della resistenza cardiovascolare',
      'Prevenzione degli infortuni',
      'Miglioramento delle performance sportive',
      'Accelerazione del metabolismo',
    ],
    targetAudience: 'Ideale per chi vuole un allenamento dinamico e completo, per atleti che vogliono migliorare le loro performance, e per chiunque desideri sentirsi piu forte e agile nelle attivita quotidiane.',
    methodology: [
      'Assessment iniziale delle capacita motorie',
      'Workout personalizzati in base agli obiettivi',
      'Varieta di esercizi per stimolare il corpo a 360 gradi',
      'Monitoraggio dei progressi e adattamento del programma',
    ],
    faq: [
      {
        question: 'E un allenamento intenso?',
        answer: 'L\'intensita viene sempre adattata al tuo livello. Inizieremo con un approccio graduale per poi aumentare progressivamente la difficolta man mano che migliori.',
      },
      {
        question: 'Posso praticarlo se ho problemi alle articolazioni?',
        answer: 'Si, gli esercizi possono essere modificati per adattarsi a qualsiasi condizione. E importante comunicarci eventuali problemi durante la valutazione iniziale.',
      },
      {
        question: 'Quali risultati posso aspettarmi?',
        answer: 'Con costanza, noterai miglioramenti nella forza, nell\'energia quotidiana e nella composizione corporea gia dopo 4-6 settimane.',
      },
    ],
  },
  personal: {
    fullDescription: `Il Personal Training rappresenta il massimo della personalizzazione nel fitness.
    Un trainer certificato lavora esclusivamente con te, creando un percorso su misura basato sui tuoi obiettivi, condizioni fisiche, preferenze e disponibilita.

    Che tu voglia perdere peso, aumentare la massa muscolare, prepararti per un evento sportivo o semplicemente migliorare il tuo benessere generale, il Personal Training ti offre la strada piu diretta verso il successo.`,
    benefits: [
      'Programma completamente personalizzato',
      'Attenzione dedicata al 100%',
      'Correzione immediata della tecnica',
      'Flessibilita negli orari',
      'Motivazione costante',
      'Risultati piu rapidi e duraturi',
    ],
    targetAudience: 'Perfetto per chi ha obiettivi specifici da raggiungere, poco tempo a disposizione, necessita di un approccio personalizzato per condizioni particolari, o semplicemente preferisce l\'attenzione esclusiva di un professionista.',
    methodology: [
      'Colloquio approfondito per comprendere obiettivi e storia',
      'Valutazione fisica completa (postura, mobilita, forza)',
      'Creazione di un programma personalizzato',
      'Sessioni individuali con feedback continuo',
      'Revisione periodica e aggiustamento del programma',
    ],
    faq: [
      {
        question: 'Quanto costa una sessione di Personal Training?',
        answer: 'Le sessioni partono da 70 euro. Offriamo anche pacchetti che permettono un risparmio significativo. Contattaci per un preventivo personalizzato.',
      },
      {
        question: 'Quanto dura una sessione?',
        answer: 'Le sessioni standard durano 60 minuti, ma possiamo adattare la durata alle tue esigenze.',
      },
      {
        question: 'Posso combinare il Personal Training con altre discipline?',
        answer: 'Certamente! Molti dei nostri clienti integrano sessioni di Personal Training con lezioni di Pilates o Functional Training per un approccio piu completo.',
      },
    ],
  },
}
