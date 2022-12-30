const WhiteCard = ({ children, style }: React.ComponentProps<any>) => {
  return (
    <div
      style={style}
      className="px-2 py-4 rounded-sm bg-white dark:bg-gray-800"
    >
      {children}
    </div>
  );
};

export default WhiteCard;
