interface IButton {
  label: string;
  onClick: () => void;
}
const buttonStyle = {
  padding: '1rem 3rem',
  color: '#000',
  border: '#ccc',
  backgroundColor: '#f0f0f0',
  lineHeight: 1,
  // textTransform: 'capitalize'
}

export default function Button({label, onClick}: IButton) {


  return (
    <button type="button" style={buttonStyle} onClick={onClick}>{label}</button>
  )
}
