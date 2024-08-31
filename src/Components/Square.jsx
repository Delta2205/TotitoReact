export const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const handlClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handlClick}>
      {children}
    </div>
  );
};
