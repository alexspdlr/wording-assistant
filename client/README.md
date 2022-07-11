# Refactoring Checklist (Client)

1. No relative imports using ../
2. Only default export react components 
3. Components scope
   1. if component too big -> extract into bits
   2. if component is used more than once -> extract & make reusable 
4. Prop type is above component
5. Comment showing wich code belongs to wich component (Option + X -> Subheader , Shift + Option + X -> MainHeader)
6. Don't name components in file like the filename, except for default exported component
7. Styled components
   1. no inline styles
   2. Styled components are above exported components
   3. Prop-using styles at the end
