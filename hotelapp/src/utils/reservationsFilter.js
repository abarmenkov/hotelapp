export const reservationsFilter = (item, searchQuery) => {
  return (
    searchQuery === "" ||
    item.MainGuest?.LastName.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    ) ||
    item.RoomNo?.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    ) ||
    item.GenericNo?.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    ) ||
    item.Room?.Name.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    ) ||
    item.Guest?.LastName.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    )
  );
};
