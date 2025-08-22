import './IconButton.scss'

const IconButton = (props) => {
  const {
    className,
    icon,
    onClick,
    type = 'button',
  } = props

  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
    >
      {icon}
    </button>
  );
};

export default IconButton;