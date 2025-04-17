export function getInitials(name: string): string {
  // Return empty string for invalid inputs
  if (!name || typeof name !== "string") return "";

  // Split name by spaces, filter out empty strings, and trim
  const nameParts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0);

  // Handle single name or no valid parts
  if (nameParts.length === 0) return "";
  if (nameParts.length === 1) return nameParts[0][0]?.toUpperCase() || "";

  // Get first letter of first and last name (or first two parts for multiple names)
  const initials = nameParts
    .slice(0, 2) // Take first two parts
    .map((part) => part[0]?.toUpperCase() || "") // Get first letter, uppercase
    .join("");

  return initials;
}
