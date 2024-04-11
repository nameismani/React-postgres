import React, { memo } from "react";
import {
  ListItem,
  ListItemSuffix,
  IconButton,
  Checkbox,
  ListItemPrefix,
} from "@material-tailwind/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeleteDialog from "./DeleteDialog";
import UpdateDialog from "./UpdateDialog";

const ListItems = ({
  deleteDialog,
  handleDelete,
  setDeleteDialog,
  handleDeleteOpen,
  handleCheck,
  item,
  items,
  selectedId,
  updateDialog,
  setUpdateDialog,
  handleUpdateOpen,
  handleUpdateItem,
}) => {
  return (
    <div key={item.id}>
      <ListItem ripple={false} className="py-1 pr-1 pl-4">
        <ListItemPrefix>
          <Checkbox
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
        </ListItemPrefix>
        {item.text}
        <ListItemSuffix>
          <div>
            <IconButton variant="text" color="blue-gray">
              <MdModeEdit
                className="text-xl font-extrabold text-blue-600"
                onClick={() => handleUpdateOpen(item.id)}
              />
            </IconButton>
            <IconButton variant="text" color="blue-gray" ripple={false}>
              <MdDelete
                className="text-xl text-red-600"
                onClick={() => handleDeleteOpen(item.id)}
              />
            </IconButton>
          </div>
        </ListItemSuffix>
      </ListItem>
      <DeleteDialog
        deleteDialog={deleteDialog}
        handleDelete={handleDelete}
        setDeleteDialog={setDeleteDialog}
        id={selectedId}
      />
      <UpdateDialog
        updateDialog={updateDialog}
        setUpdateDialog={setUpdateDialog}
        id={selectedId}
        items={items}
        handleUpdateItem={handleUpdateItem}
      />
    </div>
  );
};

export default memo(ListItems);
