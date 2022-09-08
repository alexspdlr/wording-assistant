import { ContentSection } from 'src/types/content';

const stateManagementSection: ContentSection = {
  title: 'State Management',
  id: 'state_management',
  body: [
    {
      type: 'Markdown',

      value: `
- using redux
- try to follow MVC Pattern with one way data flow & immutable state
- model -> redux store 
- view -> react components 
- controller -> reducer

- middleware -> communicates with node server & dispatches resulkts to the store 
- much bolierplate & overkill for this application -> but goal is to show that I can design scalable software 
`,
    },

    {
      type: 'ReactNode',

      value: <div>design patterns & principles</div>,
    },
  ],
};

export default stateManagementSection;
