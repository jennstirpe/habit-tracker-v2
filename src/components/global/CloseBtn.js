
export default function CloseBtn({ closeFunction, ariaLabel }) {
  return (
    <button onClick={closeFunction} className="global-close-btn" aria-label={ariaLabel}>
        &#x2715;
    </button>
  )
}
