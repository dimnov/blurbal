export function formatMemberSince(dateString: Date) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function formatPublishDate(dateString: Date) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
