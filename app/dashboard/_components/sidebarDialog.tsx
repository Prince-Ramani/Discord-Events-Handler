const SidebarDialog = () => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-6 bg-white shadow-lg rounded-lg z-50">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end space-x-4">
            <DialogClose asChild onClick={() => setIsOpen(false)}>
              <button className="px-4 py-2 bg-gray-300 text-black rounded-md">
                Cancel
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SidebarDialog;
