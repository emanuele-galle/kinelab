import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Informativa sui cookie di KineLab Milano',
}

export default function CookiePage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="mb-8">Cookie Policy</h1>

        <div className="prose prose-lg">
          <p className="text-[--color-text-muted] mb-8">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section className="mb-8">
            <h2>1. Cosa sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti web salvano sul tuo
              dispositivo durante la navigazione. Vengono utilizzati per migliorare
              l&apos;esperienza di navigazione e per fornire funzionalita specifiche.
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Cookie Utilizzati</h2>
            <p>Il nostro sito utilizza le seguenti tipologie di cookie:</p>

            <h3>Cookie Tecnici (Necessari)</h3>
            <p>
              Questi cookie sono essenziali per il funzionamento del sito e non
              possono essere disattivati. Includono:
            </p>
            <ul>
              <li>Cookie di sessione per la navigazione</li>
              <li>Cookie per ricordare le preferenze di prenotazione</li>
            </ul>

            <h3>Cookie Analitici</h3>
            <p>
              Utilizziamo questi cookie per raccogliere informazioni anonime su
              come i visitatori utilizzano il sito, per migliorare i nostri servizi.
            </p>
          </section>

          <section className="mb-8">
            <h2>3. Cookie di Terze Parti</h2>
            <p>Il nostro sito puo includere contenuti di terze parti che potrebbero
              impostare i propri cookie:</p>
            <ul>
              <li>
                <strong>OpenStreetMap:</strong> per la visualizzazione della mappa
              </li>
              <li>
                <strong>WhatsApp:</strong> per il pulsante di contatto
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Gestione dei Cookie</h2>
            <p>
              Puoi gestire le preferenze sui cookie attraverso le impostazioni del
              tuo browser. Ecco come disabilitare i cookie nei principali browser:
            </p>
            <ul>
              <li>
                <strong>Chrome:</strong> Impostazioni &gt; Privacy e sicurezza &gt; Cookie
              </li>
              <li>
                <strong>Firefox:</strong> Impostazioni &gt; Privacy &gt; Cookie
              </li>
              <li>
                <strong>Safari:</strong> Preferenze &gt; Privacy &gt; Cookie
              </li>
              <li>
                <strong>Edge:</strong> Impostazioni &gt; Cookie e autorizzazioni sito
              </li>
            </ul>
            <p>
              Nota: disabilitare i cookie potrebbe influire sul funzionamento di
              alcune funzionalita del sito.
            </p>
          </section>

          <section className="mb-8">
            <h2>5. Durata dei Cookie</h2>
            <p>I cookie possono essere:</p>
            <ul>
              <li>
                <strong>Cookie di sessione:</strong> vengono eliminati alla chiusura
                del browser
              </li>
              <li>
                <strong>Cookie persistenti:</strong> rimangono sul dispositivo per
                un periodo definito o fino alla cancellazione manuale
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>6. Aggiornamenti</h2>
            <p>
              Questa Cookie Policy puo essere aggiornata periodicamente. Ti
              invitiamo a consultare questa pagina regolarmente per eventuali
              modifiche.
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa ai cookie, contattaci:
              <br />
              Email: kinelabmilano@gmail.com
              <br />
              Telefono: +39 02 8233 7048
            </p>
          </section>
          <section className="mb-8">
            <h2>8. Sviluppo e Gestione Tecnica del Sito</h2>
            <p>Questo sito web è stato realizzato e viene gestito da:</p>
            <p>
              <strong>FODI S.r.l. – Startup Innovativa</strong>
              <br />
              Via Santicelli 18/A, 88068 Soverato (CZ)
              <br />
              P.IVA: 03856160793
              <br />
              Email: <a href="mailto:info@fodisrl.it">info@fodisrl.it</a>
              <br />
              Tel: +39 0963 576433
              <br />
              Web: <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer">www.fodisrl.it</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
