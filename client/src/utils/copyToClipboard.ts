const copyToClipboard = (value: string) => {
  navigator.clipboard
    .writeText(value || '')
    .then(() => {
      alert(`"${value}" was copied to clipboard.`);
    })
    .catch((err) => {
      alert(`Error copying text to clipboard: ${err}`);
    });
};

export default copyToClipboard;
