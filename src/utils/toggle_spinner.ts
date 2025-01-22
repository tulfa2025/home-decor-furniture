

const toggleSpinner = (e) => {
  // Get  cursor style
  if (!document) return;

  // Listen to mousemove events to update cursor position
  const moveCursor = (moveEvent) => {
    cursor.style.left = moveEvent.pageX - 25 + "px";
    cursor.style.top = moveEvent.pageY - 25 + "px";
  };

  const cursorState = document.body.style.cursor;

  const cursor = document.getElementById("cursor");


  if (cursorState !== "none") {
    
    if(!e)return
    
    document.body.style.cursor = "none";

    cursor.style.display = "block";

    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";

    // Attach mousemove listener to update cursor position
    document.addEventListener("mousemove", moveCursor);

  } else {

    document.removeEventListener("mousemove", moveCursor);
    document.body.style.cursor = "unset";
    cursor.style.display = "none";
  }
};

export default toggleSpinner;
