const Container = ({ children, className = null }) => {
  const combinedStyles = `mx-auto max-w-7xl lg:px-8 px-4 md:px-5 ${className}`;

  return <div className={combinedStyles}>{children}</div>;
};

export default Container;
