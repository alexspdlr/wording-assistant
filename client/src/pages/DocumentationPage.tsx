import styled from '@emotion/styled';
import { createRef, ReactNode, useEffect, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from 'src/assets/ArrowDownIcon.svg';
import { introductionSection } from 'src/content/documentation/Introduction';
import { testSection } from 'src/content/documentation/Test';
import { ContentSection, ContentSubSection } from 'src/types/content';
import compareBreakpoint from 'src/utils/compareBreakpoint';
import useBreakpoint from 'src/utils/hooks/useBreakpoint';
import useWindowWidth from 'src/utils/hooks/useWindowWidth';

const SideMenu = styled('div')(
  () => ` 
    width: 300px; 
    border-right: 1px solid #F1F1F1;
    `
);

const TopMenuContainer = styled('div')(
  () => ` 
    width: calc(100% - 39px); 
    border-bottom: 1px solid #F1F1F1;
    border-top: 1px solid #F1F1F1;
    padding: 10px 20px;
    color: #0f2b46;
    background-color: #ffffff;
    font-weight: 700; 
    display: flex; 
    align-items: stretch; 
    cursor: pointer; 
    line-height: 24px; 
    z-index: 1;
    position: fixed;
    top: 60px; 
    `
);

const TopMenuOverlay = styled('div')(
  () => ` 
  top: 106px; 
  left: 0; 
  height: 100%;
  width: 100%; 
  position: fixed; 
    background-color: rgba(255,255,255,0.96);
    `
);

interface TopMenuProps {
  activePage: string;
  children?: ReactNode;
}

const TopMenu = (props: TopMenuProps) => {
  const { activePage, children } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <TopMenuContainer onClick={() => setMenuOpen(!menuOpen)}>
        {activePage}
        {menuOpen ? (
          <ArrowDownIcon
            style={{
              cursor: 'pointer',
              transform: 'rotate(180deg)',
            }}
          />
        ) : (
          <ArrowDownIcon />
        )}
        {menuOpen && <TopMenuOverlay>{children}</TopMenuOverlay>}
      </TopMenuContainer>
    </>
  );
};
interface MenuTitleProps {
  isActive: boolean;
  isSmallLayout: boolean;
}
const MenuTitle = styled('div')(
  (props: MenuTitleProps) => ` 
    color: ${props.isActive ? '#f46f52' : '#006494'};
    padding: ${props.isSmallLayout ? '11px 0 0 ' : '5px 0'};
    font-size: ${props.isSmallLayout ? '16' : '19'}px;
    line-height: ${props.isSmallLayout ? '25' : '28'}px; 
    font-weight: ${props.isSmallLayout ? '400' : '500'};
    cursor: pointer;
    &:hover {
      color: ${props.isActive ? '#f46f52' : '#0F2B46'};
    }
    
    `
);

interface MenuSubtitleProps {
  isSmallLayout: boolean;
  isActive: boolean;
}
const MenuSubtitle = styled('div')(
  (props: MenuSubtitleProps) => ` 
  color: ${props.isActive ? '#f46f52' : '#006494'};
    padding: ${props.isSmallLayout ? '0px 20px' : '5px 20px'}; 
    font-size: 16px;
    font-weight: 500;
    line-height: 24px; 
    font-size: ${props.isSmallLayout ? '14' : '16'}px;
    line-height: ${props.isSmallLayout ? '22' : '24'}px; 
    font-weight: ${props.isSmallLayout ? '400' : '500'};
    cursor: pointer;
    &:hover {
      color: ${props.isActive ? '#f46f52' : '#0F2B46'};
    } 
    `
);

interface MenuSectionProps {
  title: string;
  isFirstSection: boolean;
  isLastSection: boolean;
  isActive: boolean;
  isSmallLayout: boolean;
  subSections: ContentSubSection[] | undefined;
  setActiveSection: () => void;
  setActiveSubSection: (subSection: ContentSubSection) => void;
  activeSubSectionId: string | undefined;
}
const MenuSection = (props: MenuSectionProps) => {
  const {
    title,
    isFirstSection,
    isLastSection,
    isActive,
    isSmallLayout,
    activeSubSectionId,
    setActiveSection,
    setActiveSubSection,
    subSections,
  } = props;

  return (
    <div
      style={{
        margin: isSmallLayout ? '0' : '0 40px 0 20px',
        marginTop: isSmallLayout && isFirstSection ? '5px' : '0',
        padding: isSmallLayout ? '0px 20px' : '20px 0',
        borderBottom:
          isLastSection || isSmallLayout ? 'none' : '1px solid #f1f1f1',
      }}
    >
      <MenuTitle
        isActive={isActive && !activeSubSectionId}
        isSmallLayout={isSmallLayout}
        onClick={setActiveSection}
      >
        {title}
      </MenuTitle>

      {subSections?.map((subSection, index) => (
        <MenuSubtitle
          key={subSection.id}
          isSmallLayout={isSmallLayout}
          isActive={activeSubSectionId === subSection.id}
          onClick={() => setActiveSubSection(subSection)}
        >
          {subSection.title}
        </MenuSubtitle>
      ))}
    </div>
  );
};

interface ActiveSectionState {
  activeSection: ContentSection | null;
  activeSubSection: ContentSubSection | null;
}

/* TRY AUTO SCROLL */
const DocumentationPage = () => {
  const activeBreakpoint = useBreakpoint();
  const windowWidth = useWindowWidth();
  const isSmallLayout = compareBreakpoint(activeBreakpoint, '<', 'S');
  const sections = [introductionSection, testSection];
  const [activeSectionState, setActiveSectionState] =
    useState<ActiveSectionState>({
      activeSection: sections[0],
      activeSubSection: null,
    });

  const [subSectionRefs, setSubSectionRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);

  useEffect(() => {
    const refArray = activeSectionState.activeSection?.subSections?.map(() =>
      createRef<HTMLDivElement>()
    );
    setSubSectionRefs(refArray || []);
  }, [activeSectionState.activeSection]);

  useEffect(() => {
    const activeSubsectionIndex =
      activeSectionState.activeSection?.subSections?.findIndex(
        (el) => el.id === activeSectionState.activeSubSection?.id
      );

    if (activeSubsectionIndex && subSectionRefs) {
      const taregtRef = subSectionRefs[activeSubsectionIndex];

      if (activeSubsectionIndex >= 0 && taregtRef?.current) {
        taregtRef.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }, [activeSectionState, subSectionRefs]);

  const MenuItems = () => (
    <>
      {sections.map((section, index) => (
        <MenuSection
          key={section.id}
          title={section.title}
          isFirstSection={index === 0}
          subSections={section.subSections}
          isLastSection={index === sections.length - 1}
          isSmallLayout={isSmallLayout}
          isActive={
            activeSectionState.activeSection
              ? activeSectionState.activeSection.id === section.id
              : false
          }
          setActiveSection={() =>
            setActiveSectionState({
              activeSection: section,
              activeSubSection: null,
            })
          }
          setActiveSubSection={(subSection: ContentSubSection) => {
            setActiveSectionState({
              activeSection: section,
              activeSubSection: subSection,
            });
          }}
          activeSubSectionId={activeSectionState.activeSubSection?.id}
        />
      ))}
    </>
  );

  return (
    <div
      style={{
        width: '100%',
        borderTop: '1px solid #F1F1F1',
        borderBottom: '1px solid #F1F1F1',
        display: 'flex',
        flexDirection: isSmallLayout ? 'column' : 'row',
        minHeight: 'calc(100vh - 250px)',
      }}
    >
      {isSmallLayout ? (
        <TopMenu
          activePage={
            sections.find(
              (section) => section.id === activeSectionState.activeSection?.id
            )?.title || sections[0].title
          }
        >
          <MenuItems />
        </TopMenu>
      ) : (
        <SideMenu>
          <MenuItems />
        </SideMenu>
      )}
      <div
        style={{
          width: isSmallLayout ? '100%' : 'calc(100% - 300px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            padding: isSmallLayout ? 20 : 30,
            maxWidth: 1140,
            marginLeft:
              windowWidth > 1816 ? 'calc((100vw - 1816px) / 2)' : '0px',
          }}
        >
          <h1>{activeSectionState.activeSection?.title}</h1>
          <p>{activeSectionState.activeSection?.contentMD}</p>

          {activeSectionState.activeSection?.subSections &&
            activeSectionState.activeSection.subSections.map(
              (subSection, index) => (
                <div
                  key={index}
                  ref={subSectionRefs[index]}
                  style={{
                    paddingTop: 60,
                    marginTop: -60,
                  }}
                >
                  <h3>{subSection.title}</h3>
                  <p>{subSection?.contentMD}</p>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
