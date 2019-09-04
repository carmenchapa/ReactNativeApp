export function capitalizeFirst(item) {
  return item == null ? "" : item.charAt(0).toUpperCase() + item.slice(1);
}

// export function getFullName(user) {
//   return `${capitalizeFirst(user.first_name)} ${capitalizeFirst(
//     user.last_name
//   )}`;
// }

export function getPhotoTitle(item) {
  return item.description
    ? capitalizeFirst(item.description)
    : capitalizeFirst(item.alt_description);
}
