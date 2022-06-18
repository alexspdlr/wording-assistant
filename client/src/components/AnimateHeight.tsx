import React, { ReactNode } from 'react';
interface AnimateHeightProps {
  children: ReactNode;
}

const AnimateHeight = ({ children }: AnimateHeightProps) => {
  const ref = React.useRef<HTMLDivElement>(null!);

  // useLayoutEffect runs before browser paint and allows for all this magic
  React.useLayoutEffect(() => {
    const element = ref.current;

    // get height of the wrapper before everything happens
    const { height: oldHeight, width: oldWidth } =
      element.getBoundingClientRect();

    // change the height to auto to make browser calculate
    // get new calculated height
    // change it back to old before the browser realises what you did (i.e. before it re-paints)
    element.style.height = 'auto';
    element.style.width = 'auto';
    const { height: newHeight, width: newWidth } =
      element.getBoundingClientRect();
    element.style.height = `${oldHeight}px`;
    element.style.width = `${oldWidth}px`;

    // wait for next paint
    // change height to the new value and watch the browser purr
    requestAnimationFrame(() => {
      element.style.height = `${newHeight}px`;
      element.style.width = `${newWidth}px`;
    });
  }, [children, ref]);

  return (
    <div
      ref={ref}
      style={{
        transition: 'all 0.25s',
      }}
    >
      {children}
    </div>
  );
};

export default AnimateHeight;
