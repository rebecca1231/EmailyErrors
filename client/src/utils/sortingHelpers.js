export const compareTitle = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  export const compareDate = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const dateA = a.dateSent.toUpperCase();
    const dateB = b.dateSent.toUpperCase();

    let comparison = 0;
    if (dateA > dateB) {
      comparison = 1;
    } else if (dateA < dateB) {
      comparison = -1;
    }
    return comparison * -1;
  }