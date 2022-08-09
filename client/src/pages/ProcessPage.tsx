import { useState } from 'react';
import ProcessHeader from 'src/assets/ProcessHeader.png';
import Content from 'src/components/general/content';
import Section from 'src/components/section';

const ProcessPage = () => {
  const [headerImageLoading, setHeaderImageLoading] = useState(true);

  return (
    <div style={{ minHeight: 'calc(100vh - 360px)' }}>
      <img
        src={ProcessHeader}
        onLoad={() => setHeaderImageLoading(false)}
        style={{
          width: '100%',
          marginBottom: '-3px',
          display: headerImageLoading ? 'none' : 'block',
        }}
        alt='ProcessHeader'
      />
      {headerImageLoading && (
        <div
          style={{
            width: '100%',
            paddingTop: '20%',
            backgroundColor: '#f7f7f7',
          }}
        >
          Loading...
        </div>
      )}

      <Section backgroundColor='#f7f7f7' maxWidth={920}>
        <div style={{ marginBottom: 80 }}>
          <div
            style={{
              padding: '40px 0 20px 0',
              borderBottom: '1px solid rgb(221, 221, 221)',
            }}
          >
            <Content
              type='section'
              title='Development Process'
              bodyItems={[
                {
                  type: 'Markdown',
                  value: `Wir bei DeepL stellen KI-Produkte von morgen bereits heute jedem zur Verfügung. Hier im DeepL Blog halten wir Sie über unsere Ideen und Innovationen auf dem Laufenden.

Weitere Informationen zu DeepL und unserer Historie finden Sie auf unserer [Presseseite](https://www.deepl.com/de/press-release).
                `,
                },
              ]}
            />
          </div>

          <div
            style={{
              paddingBottom: '20px',
            }}
          >
            <Content
              type='subsection'
              title='The initial idea'
              bodyItems={[
                {
                  type: 'Markdown',
                  value: `Ein **DeepL Pro-Abonnement** eignet sich perfekt für Einzelnutzer, die unbegrenzt Text übersetzen und ihre Übersetzungen individuell anpassen möchten. Somit profitieren insbesondere freiberufliche Übersetzer von diesem Abonnement. 

Wenn Sie unser Übersetzungstool in Ihrem gesamten Team nutzen möchten, ist **DeepL Pro** für Teams die Lösung, nach der Sie suchen. Mit einem Teamabonnement können Sie mit Geschäftspartnern auf der ganzen Welt noch einfacher kommunizieren und dabei immer den richtigen Ton treffen, ohne sich Gedanken über Ihre Markenkonsistenz machen zu müssen. Teams mit mindestens 35 Teammitgliedern können außerdem Single Sign-On (SSO) nutzen, um Unternehmensdaten optimal zu schützen. Für Softwareentwickler und Unternehmen, die ihre eigenen Produkte mit DeepL erstellen möchten, bietet die [DeepL API](https://www.deepl.com/de/pro-api?cta=header-pro-api/) die Möglichkeit, hochwertige Übersetzungen direkt in ihre Websites, Apps und vieles mehr zu integrieren. 

Nach der EU, dem Vereinigten Königreich, Kanada, den USA, Japan, der Schweiz und Liechtenstein ist nun also auch Mexiko Teil der Liste von Ländern, in denen **DeepL Pro** erhältlich ist. Werfen Sie einen Blick auf unsere DeepL Pro-Seite und entdecken Sie noch heute das Paket, das am besten zu Ihnen oder Ihrem Team passt!


DeepL befolgt die Web Content Accessibility Guidelines (WCAG) der Web Accessibility Initiative, um die Barrierefreiheit seiner Seiten zu verbessern. Einige der wichtigsten Richtlinien, die wir befolgen, sind: 

- Bereitstellung von Textalternativen für Bilder 

- Berücksichtigung von Bildschirmgröße und Schriftgröße 

- Aktivierung von Website-Funktionen über die Tastatur 

- Strukturierung von Inhalten für eine einfache Navigation 

- Einhaltung der Konsistenz auf allen Seiten der Website 

Ein wichtiger Schritt auf unserem Weg zu einem vollständig barrierefreien digitalen Produkt ist die Optimierung des Web-Übersetzers für den Gebrauch mit der Tastatur, ohne dass eine Maus erforderlich ist. Die Nutzer können mithilfe der Tabulatortaste durch die Links in der Navigation gehen und per Tastendruck übersetzen. 

Wir konzentrieren uns auch stark auf die visuelle Barrierefreiheit und berücksichtigen dabei besonders die Verwendung von Screenreadern. Screenreader wie NVDA und VoiceOver lesen Wörter auf Seiten vor, um den Nutzern dabei zu helfen, Texte zu verstehen und sich auf der Website zurechtzufinden. 

Zu guter Letzt achten wir auch besonders auf die Texte in Produktbeschreibungen, Blogbeiträgen und der Navigation auf unserer Website. Wir legen Wert auf eine klare und prägnante Sprache mit einfachem Satzbau. Unser Styleguide enthält Regeln wie:  

1. Begrenzte Verwendung von Kursivschrift  

2. Leicht zu lesende Überschriften  

3. Begrenzte Verwendung von Zeichen wie Et-Zeichen, die Screenreadern oft Schwierigkeiten bereiten 

Die jüngsten Änderungen auf unserer Website gehen auf eine enge Partnerschaft mit Fable zurück, dessen Testplattform uns Problembereiche aufzeigte, an denen wir inzwischen gearbeitet haben. `,
                },
              ]}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProcessPage;
