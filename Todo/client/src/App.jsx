import { useState } from "react";
import { Input, List, Card } from "@material-tailwind/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Carousel, Typography } from "@material-tailwind/react";
import "./App.css";
import { Button } from "@material-tailwind/react";
import DeleteDialog from "./Compoenents/DeleteDialog";
import ListItems from "./Compoenents/ListItems";
// $(".popout .btn").click(function () {
//   $(this).toggleClass("active");
//   $(this).closest(".popout").find(".panel").toggleClass("active");
// });
// $(document).click(function () {
//   $(".popout .panel").removeClass("active");
//   $(".popout .btn").removeClass("active");
// });
// $(".popout .panel").click(function (event) {
//   event.stopPropagation();
// });
// $(".popout .btn").click(function (event) {
//   event.stopPropagation();
// });
function App() {
  const [items, setItems] = useState([
    { id: 1, checked: true, text: "Buy groceries" },
    { id: 2, checked: false, text: "Pay bills" },
  ]);
  const [search, setSearch] = useState("");
  const [addItem, setAddItem] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [popOut, setPopOut] = useState(false);

  const filteredItem = items.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteOpen = (id) => {
    setDeleteDialog(true);
    setSelectedId(id);
  };

  const handleUpdateOpen = (id) => {
    setUpdateDialog(true);
    setSelectedId(id);
  };

  const handleDelete = () => {
    let filtered = items.filter((item) => item.id !== selectedId);
    setItems(filtered);
    setDeleteDialog(false);
  };

  const handleCheck = (id) => {
    let item = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(item);
  };
  const handleAddItem = () => {
    if (!addItem) return;

    let id = items.length ? items[items.length - 1].id + 1 : 1;
    let newItem = { id, text: addItem, checked: false };
    setItems([...items, newItem]);
    setAddItem("");
  };

  const handleUpdateItem = (updatedItem) => {
    let item = items.map((item) =>
      item.id === selectedId ? { ...item, text: updatedItem } : item
    );
    setItems(item);
    setUpdateDialog(false);
  };

  return (
    <>
      <div className="container mx-auto min-h-screen">
        <div className="max-w-[24rem] mx-auto mb-5">
          <Input
            variant="standard"
            label="search Item"
            placeholder="search Item.."
            className="pr-24 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerProps={{
              className: "min-w-0",
            }}
          />
        </div>
        <div className="relative flex w-full max-w-[24rem] mx-auto">
          <Input
            variant="standard"
            label="Add Item"
            placeholder="Add Item.."
            className="pr-24"
            value={addItem}
            onChange={(e) => setAddItem(e.target.value)}
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="sm"
            color={addItem ? "gray" : "blue-gray"}
            disabled={!addItem}
            onClick={handleAddItem}
            className="!absolute right-1 top-1 rounded"
          >
            submit
          </Button>
        </div>
        <Card className="w-10/12 mx-auto mt-4 shadow-inner drop-shadow-md ">
          <List>
            {filteredItem.length ? (
              filteredItem.map((item) => (
                <ListItems
                  deleteDialog={deleteDialog}
                  handleDelete={handleDelete}
                  setDeleteDialog={setDeleteDialog}
                  handleDeleteOpen={handleDeleteOpen}
                  item={item}
                  items={items}
                  selectedId={selectedId}
                  handleCheck={handleCheck}
                  updateDialog={updateDialog}
                  setUpdateDialog={setUpdateDialog}
                  key={item.id}
                  handleUpdateOpen={handleUpdateOpen}
                  handleUpdateItem={handleUpdateItem}
                />
              ))
            ) : (
              <p>item is empty</p>
            )}
          </List>
        </Card>

        <div className="w-10/12 mt-8 mx-auto h-[40%]">
          {" "}
          <Carousel
            transition={{ duration: 2, type: "tween" }}
            className="rounded-xl"
            autoplay={true}
            loop={true}
          >
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover bg-cover bg-center px-24"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
      </div>
      <div className="popout">
        <div
          className={`btn ${popOut ? "active" : null}`}
          onClick={() => {
            setPopOut((prev) => !prev);
          }}
        >
          Feedback
        </div>
        <div className={`panel ${popOut ? "active" : null}`}>
          <button>asdf</button>
          <div className="panel-header">
            Literature adds to reality, it does not simply describe it. It
            enriches the necessary competencies that daily life requires and
            provides; and in this respect, it irrigates the deserts that our
            lives have already become.
          </div>
          <div className="panel-body">C.S. Lewis</div>
        </div>
      </div>
    </>
  );
}

export default App;
