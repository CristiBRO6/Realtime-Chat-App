export function getUserInitials(name) {
  const nameParts = name.split(" ");
  return `${nameParts[0] ? nameParts[0][0].toUpperCase() : ""}${nameParts[1] ? nameParts[1][0].toUpperCase() : ""}`;
}