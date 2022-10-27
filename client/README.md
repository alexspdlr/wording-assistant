# Refactoring Checklist (Client)

1. No relative imports using ../
2. Export via barrel ( via index.tsx) in foldered components
3. Import default from folder barrel ( via index.tsx) whenever possible
4. Only default export react components 
5. Components scope
   1. if component too big -> extract into bits
   2. if component is used more than once -> extract & make reusable 
6. Prop type is above component
7. Comment showing wich code belongs to wich component (if multiple components in one file) (Option + X -> Subheader , Shift + Option + X -> MainHeader)
   1. wrap styled components without props in -- styled components -- 
8. Don't name components in file like the filename, except for default exported component
9. Styled components
   1. no inline styles
   2. Styled components are above exported components
   3. Prop-using styles at the end
 
## Start Docker
1. cd into client 
2. run "docker build -t paraphrasing-app-server ." 
3. start docker desktop
4. click "run" on image called "paraphrasing-app-client"
5. open "optional settings"
6. enter desired local port, e.g. 3000
7. open app on localhost:3000