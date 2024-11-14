const handleKeyboard = ({ repeat, metaKey, ctrlKey, key }) => {
    if (repeat) return;

    if (metaKey && key != 'Meta') console.log(`[Cmd+${key}] was pressed`);
    if (ctrlKey && key != 'Control') console.log(`[Ctrl+${key}] was pressed`);   
  }
  
document.addEventListener('keydown', handleKeyboard);
