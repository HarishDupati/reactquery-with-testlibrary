export default function AccordionExample() {


  const handleBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    const expanded = (e.target as HTMLElement).getAttribute('aria-expanded') === 'true';
    console.log('expanded: ', expanded);
    const panel = document.querySelector('#panel1')
    console.log('panel: ', panel);

    (e.target as HTMLElement).setAttribute('aria-expanded', (!expanded).toString())
    panel?.setAttribute('aria-hidden', (!expanded).toString())
    
  }

  return (
    <div>
      <div id="main-content">This is main content </div>
      <button id="accordion1" aria-expanded="false" className="acc-button" onClick={handleBtnClick}>open/close accordion</button>
      <div id="panel1" aria-hidden="false" className="panel-container" aria-describedby="desc1"> <p id="desc1">This section contains additional information about the topic.</p>
    <p>You can put any content here, such as text, images, or forms.</p></div>

    <a href="main-content">skip to main content</a>
    </div>
  )
}
