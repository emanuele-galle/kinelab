import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termini e Condizioni | KineLab',
  description: 'Termini e condizioni di utilizzo dei servizi KineLab',
}

export default function TerminiPage() {
  return (
    <div className="min-h-screen bg-[--color-bg]">
      {/* Hero Section */}
      <section className="bg-[--color-bg-dark] text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Termini e Condizioni
            </h1>
            <p className="text-white/70 text-lg">
              Ultimo aggiornamento: 25 Gennaio 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <h2>1. Accettazione dei Termini</h2>
            <p>
              Utilizzando i servizi di KineLab SSD, accetti di essere vincolato dai presenti termini e condizioni.
              Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.
            </p>

            <h2>2. Servizi Offerti</h2>
            <p>
              KineLab offre servizi di:
            </p>
            <ul>
              <li>Pilates (individuale e di gruppo)</li>
              <li>Functional Training</li>
              <li>Personal Training</li>
            </ul>
            <p>
              I servizi sono forniti presso la nostra sede in Via Pascoli 15, 20129 Milano.
            </p>

            <h2>3. Prenotazioni e Cancellazioni</h2>
            <h3>3.1 Prenotazioni</h3>
            <p>
              Le prenotazioni possono essere effettuate tramite:
            </p>
            <ul>
              <li>Telefono: +39 02 8233 7048</li>
              <li>Email: kinelabmilano@gmail.com</li>
              <li>Modulo di prenotazione online</li>
            </ul>

            <h3>3.2 Cancellazioni</h3>
            <p>
              Per cancellare una prenotazione:
            </p>
            <ul>
              <li>Almeno 24 ore prima della sessione: rimborso completo o riprenotazione</li>
              <li>Meno di 24 ore: la sessione verrà considerata utilizzata</li>
              <li>Assenza senza preavviso: la sessione verrà considerata utilizzata</li>
            </ul>

            <h2>4. Pacchetti e Abbonamenti</h2>
            <p>
              I pacchetti di sessioni hanno una validità di 3 mesi dalla data di acquisto.
              Non sono rimborsabili ma possono essere trasferiti ad un&apos;altra persona previo accordo con la direzione.
            </p>

            <h2>5. Certificato Medico</h2>
            <p>
              È richiesto un certificato medico di idoneità all&apos;attività fisica non agonistica per tutti i clienti.
              Il certificato deve essere valido e aggiornato secondo le normative vigenti.
            </p>

            <h2>6. Norme di Comportamento</h2>
            <p>
              I clienti sono tenuti a:
            </p>
            <ul>
              <li>Rispettare gli orari delle sessioni prenotate</li>
              <li>Indossare abbigliamento sportivo appropriato</li>
              <li>Portare un asciugamano personale</li>
              <li>Rispettare le attrezzature e la struttura</li>
              <li>Rispettare gli istruttori e gli altri clienti</li>
            </ul>

            <h2>7. Limitazione di Responsabilità</h2>
            <p>
              KineLab non è responsabile per:
            </p>
            <ul>
              <li>Infortuni derivanti da negligenza del cliente o mancata comunicazione di condizioni mediche</li>
              <li>Perdita o furto di oggetti personali</li>
              <li>Interruzioni del servizio dovute a cause di forza maggiore</li>
            </ul>

            <h2>8. Privacy e Dati Personali</h2>
            <p>
              Il trattamento dei dati personali è regolato dalla nostra{' '}
              <Link href="/privacy" className="text-[--color-primary] hover:underline">
                Privacy Policy
              </Link>
              {' '}in conformità al GDPR.
            </p>

            <h2>9. Modifiche ai Termini</h2>
            <p>
              KineLab si riserva il diritto di modificare questi termini in qualsiasi momento.
              Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
            </p>

            <h2>10. Legge Applicabile</h2>
            <p>
              Questi termini sono regolati dalla legge italiana.
              Per qualsiasi controversia è competente il foro di Milano.
            </p>

            <h2>11. Contatti</h2>
            <p>
              Per domande sui termini e condizioni, contattaci:
            </p>
            <ul>
              <li>Email: kinelabmilano@gmail.com</li>
              <li>Telefono: +39 02 8233 7048</li>
              <li>Indirizzo: Via Pascoli 15, 20129 Milano</li>
            </ul>

            
            <div className="mt-16 pt-8 border-t border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Sviluppo e Gestione Tecnica del Sito</h2>
              <p className="text-white/70">Questo sito web è stato realizzato e viene gestito da:</p>
              <div className="mt-4 p-6 rounded-xl bg-white/5 border border-white/10">
                <p className="font-bold text-white text-lg">FODI S.r.l.</p>
                <ul className="mt-2 space-y-1 text-white/70">
                  <li>Sede legale: Via Fontana del Campo SNC, 87040 Castrolibero (CS)</li>
                  <li>P.IVA / C.F.: 03856160793</li>
                  <li>Email: <a href="mailto:info@fodisrl.it" className="text-emerald-400 hover:underline">info@fodisrl.it</a></li>
                  <li>Telefono: +39 351 944 3088</li>
                  <li>Sito web: <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">www.fodisrl.it</a></li>
                </ul>
                <p className="mt-3 text-white/60 text-sm">Per segnalazioni tecniche relative al funzionamento del sito, contattare direttamente FODI S.r.l.</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[--color-bg-accent] rounded-lg">
              <p className="text-sm text-[--color-text-muted] mb-0">
                <strong>KineLab SSD</strong><br />
                P.IVA: 14460620967<br />
                Via Pascoli 15, 20129 Milano
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[--color-bg-accent]">
        <div className="container text-center">
          <h2 className="mb-4">Hai domande sui termini?</h2>
          <p className="text-[--color-text-muted] mb-8">
            Il nostro team è a tua disposizione per qualsiasi chiarimento
          </p>
          <Link href="/prenota" className="btn btn-primary">
            Contattaci
          </Link>
        </div>
      </section>
    </div>
  )
}
