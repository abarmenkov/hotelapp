export const reservationsFilter = (item, searchQuery) => {
  return (
    searchQuery === "" ||
    item.MainGuest?.LastName.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    ) ||
    item.RoomTypeCode?.toUpperCase().includes(
      searchQuery.toUpperCase().trim().replace(/\s/g, "")
    )
  );
};
