import React, { useEffect, useState } from "react";
import { IconButton, Input, Button } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

const UpdateDialog = ({
  updateDialog,
  setUpdateDialog,
  id,
  items,
  handleUpdateItem,
}) => {
  const [updateItem, setUpdateItem] = useState("");
  useEffect(() => {
    const itemToUpdate = items.find((item) => item.id == id);
    // console.log(itemToUpdate);
    if (itemToUpdate?.text) {
      setUpdateItem(itemToUpdate?.text);
    }
  }, [id]);
  return (
    <div
      className={` ${updateDialog ? "show-modal" : null} modal__container `}
      id="modal-container"
    >
      <div className="modal__content ">
        <div
          className="modal__close close-modal"
          title="Close"
          onClick={() => {
            setUpdateDialog(false);
          }}
        >
          <IoClose className="text-white" />
        </div>

        {/* <h2>afsdasdfads</h2> */}

        <Input
          variant="standard"
          label="update Item"
          placeholder="update Item.."
          className="pr-24"
          value={updateItem}
          onChange={(e) => setUpdateItem(e.target.value)}
          containerProps={{
            className: "min-w-0",
          }}
        />

        {/* <button className="modal__button modal__button-width">
          View status
        </button> */}

        {/* <button className="modal__button-link close-modal">Close</button>
         */}
        <Button
          className="mt-6 bg-deep-orange-400"
          fullWidth
          onClick={() => handleUpdateItem(updateItem)}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default UpdateDialog;
