import { useTheme } from '@emotion/react';
import { useState } from 'react';
import ProcessHeader from 'src/assets/ProcessHeader.png';
import Content from 'src/components/general/text-content';
import Section from 'src/components/appbody-section';
import InitialDesign from 'src/assets/InitialDesign.png';

const ProcessPage = () => {
  const [headerImageLoading, setHeaderImageLoading] = useState(true);
  const theme = useTheme();
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
            backgroundColor: theme.palette.background.dark,
          }}
        >
          Loading...
        </div>
      )}

      <Section backgroundColor={theme.palette.background.dark} maxWidth={800}>
        <div style={{ marginBottom: 80 }}>
          <div
            style={{
              paddingTop: '40px',
            }}
          >
            <Content
              type='section'
              title='Development Process'
              bodyItems={[
                {
                  type: 'Markdown',
                  value: `
The following is an illustration of the entire development process of this application - from the problem to the finished product. This document examines challenges that had to be overcome along the way and is intended to provide insight into my thought process and decision-making. If you are more interested in the architecture and technical specifications of the application, check out the [Technical Documentation](documentation), which covers both in detail. However, if you can spare a few minutes, it might be interesting to continue reading. I have done my best to write as concisely as possible, yet as thoroughly as necessary.

Before going into more detail on application-related challenges, I would like to briefly outline the two intentions I have pursued with this project. My goals were to *(A) solve a problem for myself* and *(B) present my abilities & motivation to reinforce claims that I make in my application.* Alright then, let's get started!
                  `,
                },
              ]}
            />
          </div>

          <Content
            type='subsection'
            title='Solving a problem'
            bodyItems={[
              {
                type: 'Markdown',
                value: `
The [DeepL career page](https://jobs.deepl.com/) states that the company has set out to achieve its vision of "overcoming language barriers". The problem I have tackled presents a language barrier as well and has already consumed a lot of my time and energy:

*Capturing my thoughts in concise and precisely written text.*

What may sound straightforward at first is a skill that I don't think many people (including me) are naturally very good at. Small nuances in the wording of a sentence can greatly change its meaning or the ease with which it is consumed by the reader. Choosing these nuances correctly is therefore not a trivial problem. When I am personally faced with the task of capturing my thoughts in text form, I usually approach the situation with a simple multi-step process:

1. Establish a structure
2. Capture thoughts in bullet points
3. Form sentences from those bullet points
4. Rephrase sentences until they are clear and concise

This way I can use all of my brain power to focus on one aspect at a time instead of trying to do everything at once:

1. Focus on structure
2. Focus on content
3. Focus on flow
4. Focus on the reader's ability to consume the content as intended

Of course, everyone has their own approach to writing, but every writer makes decisions about how to deal with these four aspects, whether implicitly or explicitly. And, while steps 1 - 3 are difficult to substitute, the effort of completing step 4 can be greatly reduced by using the capabilities of DeepL’s translator like so:

*Translate your text to any arbitrary target language → Click the "Swap source and target languages" button → Select all text that is now displayed as the translation result and replace it with your original input text*

DeepL now recognises the context of the text passage and you are offered alternative formulations by clicking on a word. In fact, not much more nor less happens on the server side of this application.

This functionality has been so useful to me in the past, that around two years ago I sent a message via the DeepL contact form explaining how I was "misusing" the product. Perhaps I had hoped (a little naively) that at some point a dedicated rephrasing tool would be released or that it would be possible to "dumb-translate" from and to the same language. I was very annoyed that a solution to my text formulation problem was offered for foreign languages, but not for texts written in one's native language. I felt that “choosing-between-alternative-phrasing-beams-to-improve-the-sentence” should not only be a feature but rather a stand-alone product. As you can see, I later decided to try and tackle the issue myself, albeit with some delay.`,
              },
            ]}
          />

          <Content
            type='subsection'
            title='Designing a solution'
            bodyItems={[
              {
                type: 'Markdown',
                value: `Before I started to dive into design tools to create visually pleasing mockups, I took a look at some existing rephrasing tools on the market. I found that most of them were not very suitable for formulating high-quality text. The main disadvantage of their designs was that they, in one way or another, limited the range of actions that the user could perform. In contrast, offering alternative wordings in a popover that doesn't restrict the ability to use the text field underneath works flawlessly. Therefore, I decided to simply copy that part of the DeepL design.

Next, I had to determine how to let users specify which part of their input text they want to rephrase. Naturally, a translator modifies/translates the **entire** input text. This, however, is not a sensible design for a rephrasing tool, as most of the time, only single expressions or sentences of the input text are supposed to be changed.

The first version of my solution to this involved letting users switch between a "text editing mode" and a "text selection mode”. All they had to do was to press a toggle button. If the "text editing mode" was active, users could edit their text as they desired, just like in any standard text input field. Once the user switched to "text selection mode", a [tokeniser](https://winkjs.org/wink-nlp/) broke the text down into its sentences. Users could then click anywhere within the sentence to indicate that they intend to rephrase it.

While testing a very basic, initial implementation of that design I realised that it was very unintuitive and focused on functionality rather than the user. I had created an interface that was a 1-to-1 resemblance of what was happening behind the curtains of the UI. In addition, the toggle button constantly required the user to move the cursor towards it, click it, and then move the cursor back to the text field. This amount of effort may be acceptable if the movement is executed once, but it started to feel annoying and distracting over time. And as if that were not yet enough reasons to discard that design, I kept forgetting which mode I was in - “text editing mode” or “text selection mode”. My flow was constantly interrupted when I wanted to manually modify a sentence, but could not do so since I forgot to switch back to “text editing mode”.
`,
              },
            ]}
          />

          <img
            style={{
              width: '100%',
              margin: '-20px 0px -75px 0px',
            }}
            src={InitialDesign}
            alt='InitialDesign'
          />

          <Content
            type='subsection'
            bodyItems={[
              {
                type: 'Markdown',
                value: `
After taking a step back to rethink my approach, I realised what the obvious solution to my problem was. I was so simple and ubiquitous that I was annoyed I hadn't realised it sooner. The same action that is commonly used to describe which piece of text a user wants to delete or copy could be used to choose text to rephrase:

S*electing text with the cursor.*

This action satisfies all the requirements I had for the design. It 

&nbsp;&nbsp;&nbsp;• is intuitive.<br/>
&nbsp;&nbsp;&nbsp;• leaves the user in full control of text editing.<br/>
&nbsp;&nbsp;&nbsp;• is a behavioral pattern that every user of digital devices knows and has perfectly internalised.

In hindsight, it's almost comical that such a simple solution appears to be most suitable, and yet I didn't recognise it right away.`,
              },
            ]}
          />

          <Content
            type='subsection'
            title='Building the (web-)app'
            bodyItems={[
              {
                type: 'Markdown',
                value: `*Note: In this section, I will only address the most important software-related challenges & decisions. More details, as well as the as-is state of the application, are covered in the [Technical Documentation](documentation). I apologise in advance to readers with no technical background if some technical terms in the following section may be unclear. I hope that the essence of the statements made is understandable nevertheless.*

To begin with, I had to decide which tools I wanted to use. In general, I made an effort to use as few dependencies as possible to minimise the reliance on external parties. That way, I could limit the number of problems that could arise outside of my scope of control. If I still resorted to using external libraries, I made sure to only use solid, widely used & established ones.

### The Frontend

To create the frontend I decided to go with a combination of [React](https://reactjs.org/) & [Typescript](https://www.typescriptlang.org/). I had already worked with both extensively on multiple projects before. I especially didn't want to miss Typescript's capabilities to catch errors at compile time, as I think this simplifies the development of scalable applications significantly. In addition, past job postings have indicated that this seemed to be the frontend stack that DeepL is looking for.

The need for a (clientside) state management solution became apparent in the course of the project, as I frequently had to distribute component state across the application. Establishing a single source of truth simplified development immensely and helped to separate the Data Model, View, and Controller ([MVC with redux](https://rangle.io/blog/how-react-and-redux-brought-back-mvc-and-everyone-loved-it/)). The obvious pick to implement this would have probably been [Redux](https://react-redux.js.org/). However, I had already worked on a larger project in the past using Redux as a state management solution and knew how much boilerplate code was involved in setting it up. Since my requirements for a client-side state management system were modest, I decided to look for a lightweight alternative. Eventually, I ended up using [Zustand](https://zustand-demo.pmnd.rs/) and have, apart from a somewhat complicated setup in regards to Typescript, been very pleased with this choice.

Finally, I had to decide how I would implement the styling of the application in a consistent way. In past projects, I mostly used component libraries like [MaterialUI](https://mui.com/) and [Bootstrap](https://react-bootstrap.github.io/) or simply embedded predefined CSS classes. Past DeepL job postings, however, described one of the responsibilities of the candidate as "Creating new components for our frontend together with the team". As I assumed that DeepL does not rely on third-party component libraries, I decided to avoid them in my project as well. To seamlessly interact with styles using Javascript, I decided to work with [Emotion](https://emotion.sh/docs/introduction), a powerful CSS-in-JS library also run by Material UI under the hood. It made using an app-wide theme and custom properties to conditionally style components easy. I personally also appreciate having the styling of the component placed in the same location as the rest of it. This gives react components a certain resemblance to [Vue](https://vuejs.org/) components. Whether one finds this good or bad is probably a matter of personal preference.

### The Backend

First, I had to think about how my application would interact with DeepL. The simplest solution would have been to use the [Node.js client API](https://github.com/DeepLcom/deepl-node), which would have allowed me to develop this application with minimal effort on the server side. Unfortunately, the DeepL API does not offer the possibility to select alternative wordings in the way that the website interface does.

Therefore, the only possibility I had was to "remote control" the original DeepL website. I decided to set up an [Express](https://expressjs.com/de/) server, as it requires little boilerplate code and allowed me to build the backend in Typescript as well. Additionally, I chose to use [Puppeteer](https://pptr.dev/) - a web automation tool that is typically used for web scraping but allows for automating almost any action that can be performed manually within a browser. This choice entails some drawbacks, which I have to accept due to a lack of alternatives. For example, the backend is not scalable in terms of performance, as Puppeteer needs to launch a separate instance of a (headless) browser for each connected client. This is, of course, incredibly resource-intensive. Furthermore, it is impossible to anticipate changes to the controlled website. If DeepL modified the IDs of their DOM elements, the current puppeteer configuration would no longer be able to use the page as intended and the server would crash. Another situation that leads to errors is when DeepL receives too many requests from users and asks them to switch to the [Pro version](https://www.deepl.com/pro?cta=header-pro) because the current server load is too high.

While these issues are admittedly annoying, they can be tolerated given the fact that the Wording Assistant in its current version is mainly used for demonstration purposes.

### Client-Server Communication

At last, I had to decide on a way to allow the client to communicate with the server. My choice fell on communication via [Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API?retiredLocale=de), which I facilitated using [Socket.io](https://socket.io/). Opening and maintaining a bidirectional connection made sense in this case because a session (i.e. a browser controlled by Puppeteer) should persist exactly as long as the client is connected. Throughout this time period, the socket must exclusively answer requests from that associated client. When an instruction is emitted by the user, Puppeteer will carry out the desired action and respond with an event containing the result.`,
              },
            ]}
          />

          <Content
            type='subsection'
            title='Finishing the project'
            bodyItems={[
              {
                type: 'Markdown',
                value: `Triggered by the publication of the [frontend developer job advertisement](https://jobs.deepl.com/o/frontend-developer-fmd-ger-uk-nl-pl-3) I decided to finalise the project as quickly as possible. I had originally planned to submit a speculative application once I finished to project, but I didn't want to miss this opportunity. In order to handle the submission of the project in time I had to kick many remaining items off my to-do list. This included:

&nbsp;&nbsp;&nbsp;• Writing end-to-end test with [Cypress.io](https://www.cypress.io/)<br/>
&nbsp;&nbsp;&nbsp;• Creating a [Storybook](https://storybook.js.org/) to showcase the reusable react components I have built in the course of the project<br/>
&nbsp;&nbsp;&nbsp;• Language recognition & support for more languages than English<br/>
&nbsp;&nbsp;&nbsp;• Cross-browser compatibility (especially [Firefox](https://www.mozilla.org/de/firefox/new/))<br/>
&nbsp;&nbsp;&nbsp;• Full responsiveness<br/>
&nbsp;&nbsp;&nbsp;• Improved design for touch devices

Besides further improvements to the current application, it would certainly be useful to test whether other product variations would solve the problem described at the beginning even better. Occasionally I find myself trying to click on a word in an email to rephrase what I have written. By doing so, I think I subconsciously wish I didn't have to bring the problem to the product every time it occurs. It would probably be more convenient to offer the solution wherever the user's problem may arise. I have tried to make an educated guess on what such a solution might look like:

*An application native to the user's desktop device that "attaches" the rephrasing capabilities of the wording assistant to the cursor. When selecting text anywhere on the device, the user would be presented with a popover offering to rephrase the selected text bit in a dialog or a dedicated overlay.*

This product would significantly reduce the distance between the user's problem and its solution. In the same way, as the [DeepL Chrome Extension](https://www.deepl.com/en/chrome-extension) currently offers translations via recognition of text input fields within the browser, rephrasing capabilities could be enabled device-wide via text selection. In the end, however, this consideration is only an idea of what an improved iteration could look like. To assess the potential of this or any alternative ideas with any degree of certainty, the involvement of representatives of the potential target audience would be indispensable.

Thank you very much if you took the time to read to the end. If you have any open questions or want to provide feedback, please do not hesitate to contact me at [a.spindeler@web.de](mailto:a.spindeler@web.de) or on [LinkedIn](https://www.linkedin.com/in/alexander-spindeler-254178206/).`,
              },
            ]}
          />
        </div>
      </Section>
    </div>
  );
};

export default ProcessPage;
