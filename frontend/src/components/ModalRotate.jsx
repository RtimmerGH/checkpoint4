function ModalRotate() {
  return (
    <div className=" hidden ml:flex items-center justify-center w-screen h-screen fixed z-50 top-0 left-0 bg-red-500 bg-opacity-80  ">
      <img
        src="image/turnphone.png"
        alt="Rotating Mobile Phone From Vertical To Horizontal Position"
        className="m-2 h-[90%] -rotate-90"
      />
    </div>
  );
}

export default ModalRotate;
