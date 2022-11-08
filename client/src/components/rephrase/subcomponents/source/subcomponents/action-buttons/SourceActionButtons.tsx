import styled from '@emotion/styled';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactComponent as CopyIcon } from 'src/assets/CopyIcon.svg';
import { ReactComponent as ShareIcon } from 'src/assets/ShareIcon.svg';
import { ReactComponent as SoundIcon } from 'src/assets/SoundIcon.svg';
import IconButton from 'src/components/general/icon-button';
import Tooltip from 'src/components/general/tooltip';
import copyToClipboard from 'src/utils/copyToClipboard';
import useClickAway from 'src/utils/hooks/useClickAway';
import SourceSharePopover from './SourceSharePopover';

const Fragment = styled('div')(
  () => `
    display: flex; 
    gap: 10px; 
        `
);

const Layout = styled('div')(
  () => `
    position: absolute;
    z-index: 3; 
    bottom: 12px;
    right: 22px;
    display: flex; 
    justify-content: space-between;  
    width: calc(100% - 44px); 
        `
);

interface SourceActionButtonsProps {}

const SourceActionButtons = (props: SourceActionButtonsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get('source-value');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [copyButtonTooltip, setCopyButtonTooltip] =
    useState('Copy to Clipboard');

  const msg = new SpeechSynthesisUtterance();
  msg.addEventListener('end', () => setIsSpeaking(false));

  const toggleRead = () => {
    if ('speechSynthesis' in window && value) {
      msg.text = value;

      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        setIsSpeaking(true);
        window.speechSynthesis.speak(msg);
      }
    }
  };

  useEffect(() => {
    if (copiedToClipboard === true) {
      setTimeout(() => {
        setCopiedToClipboard(false);
        setTimeout(() => {
          setCopyButtonTooltip('Copy to Clipboard');
        }, 500);
      }, 1500);
    }
  }, [copiedToClipboard]);

  const popoverTargetRef = useRef<HTMLDivElement>(null);

  const [showSharePopover, setShowSharePopover] = useState<boolean>(false);

  const onClickAway = () => {
    setShowSharePopover(false);
  };

  useClickAway(popoverTargetRef, onClickAway);

  return (
    <>
      <Layout>
        <Fragment>
          <Tooltip content='Listen' direction='top'>
            <IconButton
              active={isSpeaking}
              onClick={toggleRead}
              icon={<SoundIcon />}
              variant='permanent'
            />
          </Tooltip>
        </Fragment>
        <Fragment>
          <Tooltip
            content={copyButtonTooltip}
            direction='top'
            permanent={copiedToClipboard}
          >
            <IconButton
              onClick={() => {
                copyToClipboard(value || '');
                setCopiedToClipboard(true);
                setCopyButtonTooltip(`✔ Text copied to Clipboard`);
              }}
              icon={<CopyIcon />}
              variant='permanent'
            />
          </Tooltip>
          <Tooltip
            content='Share text'
            direction='top'
            hidden={showSharePopover}
          >
            <div ref={popoverTargetRef} style={{ position: 'relative' }}>
              <IconButton
                active={showSharePopover}
                onClick={() => {
                  setShowSharePopover(!showSharePopover);
                }}
                icon={<ShareIcon />}
                variant='permanent'
              />
              {
                <SourceSharePopover
                  ref={popoverTargetRef}
                  setShowSourceSharePopover={setShowSharePopover}
                  showSourceSharePopover={showSharePopover}
                />
              }
            </div>
          </Tooltip>
        </Fragment>
      </Layout>
    </>
  );
};

export default SourceActionButtons;
