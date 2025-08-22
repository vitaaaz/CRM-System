import './Tab.scss'

const Tab = (props) => {
  const {
    className,
    title,
    onClick,
    type = 'button',
    isActive = false,
  } = props
  return (
    <button
      className={`${className} ${isActive ? "isActive" : ""}`}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};

export default Tab;