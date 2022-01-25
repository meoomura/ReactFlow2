const Typography = ({
  children,
  size,
  primary,
  style,
  title,
  bold,
  onClick,
}) => {

  const divStyle = {
    fontSize: size ? `${size}px` : '12px',
    color: primary ? 'black' : '#666666',
    fontWeight: bold ? 'bold' : undefined,
    ...style,
  };

  return (
    <div style={divStyle} title={title} onClick={onClick}>
      { children }
    </div>
  );
};

export default Typography;
