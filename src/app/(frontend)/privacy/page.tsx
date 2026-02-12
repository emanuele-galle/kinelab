import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy di KineLab Milano',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container max-w-3xl">
        <h1 className="mb-8">Privacy Policy</h1>

        <div className="prose prose-lg">
          <p className="text-[--color-text-muted] mb-8">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>

          <section className="mb-8">
            <h2>1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali e KINELAB SSD, con sede
              in Via Pascoli 15, 20129 Milano.
            </p>
            <p>
              Email: kinelabmilano@gmail.com
              <br />
              Telefono: +39 02 8233 7048
              <br />
              P.IVA: 14460620967
            </p>
          </section>

          <section className="mb-8">
            <h2>2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti dati personali:</p>
            <ul>
              <li>Nome e cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Dati relativi alle prenotazioni</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Finalita del Trattamento</h2>
            <p>I dati personali sono trattati per:</p>
            <ul>
              <li>Gestire le prenotazioni e i contatti</li>
              <li>Fornire i servizi richiesti</li>
              <li>Inviare comunicazioni relative ai nostri servizi</li>
              <li>Adempiere agli obblighi di legge</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Base Giuridica</h2>
            <p>
              Il trattamento dei dati e basato sul consenso dell&apos;interessato e
              sull&apos;esecuzione di un contratto.
            </p>
          </section>

          <section className="mb-8">
            <h2>5. Conservazione dei Dati</h2>
            <p>
              I dati personali sono conservati per il tempo necessario a
              raggiungere le finalita per cui sono stati raccolti e comunque non
              oltre i termini previsti dalla legge.
            </p>
          </section>

          <section className="mb-8">
            <h2>6. Diritti dell&apos;Interessato</h2>
            <p>Hai il diritto di:</p>
            <ul>
              <li>Accedere ai tuoi dati personali</li>
              <li>Rettificare i dati inesatti</li>
              <li>Cancellare i dati</li>
              <li>Limitare il trattamento</li>
              <li>Opporti al trattamento</li>
              <li>Portabilita dei dati</li>
            </ul>
            <p>
              Per esercitare questi diritti, contattaci a kinelabmilano@gmail.com
            </p>
          </section>

          <section className="mb-8">
            <h2>7. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa alla privacy, contattaci:
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
