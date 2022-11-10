import { TextContentSection } from 'src/types/textContent';

const introductionSection: TextContentSection = {
  title: 'Introduction',
  id: 'introduction',
  body: [
    {
      type: 'Markdown',

      value: `

      WICHTIG: Warum habe ich mich für Sotrage in URL entschieden -> sharable & persistent state on reload;

  Die DeepL API bietet programmatischen Zugriff auf die maschinelle Übersetzungstechnologie von DeepL und ermöglicht es, qualitativ hochwertige Übersetzungen direkt in Ihre Websites und Anwendungen einzubinden.

Einige Beispiele:

- **Website-Übersetzung:** Lokalisieren Sie Websites und erschließen Sie mit Ihren Produkten und Services neue Märkte, selbst in Branchen mit vielen dynamischen Inhalten, wie E-Commerce und Nachrichtenmedien.
- **Interne Kommunikation:** Integrieren Sie die Übersetzungstechnologie von DeepL in Unternehmenssysteme wie Confluence, SharePoint und Zendesk. Ermöglichen Sie es Ihren globalen Teams dadurch, ganz einfach und mit [höchster Datensicherheit](https://www.deepl.com/de/pro-data-security/) zu kommunizieren .
- **Mehrsprachige Produkte:** Übersetzen Sie Chat-Konversationen in Echtzeit, um Sprachbarrieren zu überwinden. Lokalisieren Sie Kommentare und Produktbewertungen mit nur einem Mausklick. Heben Sie sich mit den herausragenden DeepL-Übersetzungen von der Konkurrenz ab.
`,
    },

    {
      type: 'ReactNode',

      value: <div>design patterns & principles</div>,
    },
  ],
};

export default introductionSection;
