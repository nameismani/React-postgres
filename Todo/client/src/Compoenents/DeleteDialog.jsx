import React, { memo } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { IoWarning } from "react-icons/io5";

const DeleteDialog = ({ deleteDialog, handleDelete, setDeleteDialog, id }) => {
  return (
    <Dialog
      open={deleteDialog}
      // handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0, rotateX: 0 },
        unmount: { scale: 0.9, y: -100, rotateX: -120 },
      }}
    >
      {/* <DialogHeader>Its a simple dialog. {id}</DialogHeader> */}
      <DialogBody>
        <IoWarning className="text-9xl block mx-auto text-red-500" />
        <Typography variant="lead" className="text-center block">
          Are you sure you want to delete{" "}
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => setDeleteDialog(false)}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleDelete}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default memo(DeleteDialog);
